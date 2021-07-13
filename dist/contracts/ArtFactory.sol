// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Tokens.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// TODO: 
// TODO: fix tests where artist is buyer
// TODO: tests for rejects order if filled or cancelled
// TODO: tests for purchase if from artist or not
// TODO: test for events for settings both constructor and updates
// TODO: test withdraw events
// TODO: remove non used features, functions, etc.

contract ArtFactory is Ownable {

  using SafeMath for uint256;

  Tokens public tokens;
  
  uint256 public contractFeePercentage; // percentage out of 100
  address public contractFeeAccount;
  uint256 public artistFeePercentage; // percentage out of 100
  address public artistFeeAccount;
  uint256 public baseArtPrice; // in wei
  uint256 public parentMultiplierPercentage; // percentage out of 100
  uint256 public minParents;
  uint256 public maxParents;
  uint256 public minLegacies;
  uint256 public maxLegacies;
  uint256 public artworkCount;
  uint256 public orderCount;

  mapping(uint256 => Art) public artworks;
  mapping(uint256 => _Order) public orders;
  mapping(uint256 => uint256) public prices;
  mapping(address => uint256) public balances;
  mapping(uint256 => bool) public acceptedOrders;
  mapping(uint256 => bool) public cancelledOrders;
  mapping(uint256 => bool) public filledOrders;

  struct Art {
    uint256 id;
    address owner;
    uint256 gen;
    string tokenURI;
    string name;
    uint256[] parents;
    uint256[] siblings;
    uint256 timestamp;
  }

  struct _Order {
    uint256 id;
    address buyer;
    uint256 price;
    uint256[] parentIDS;
    uint256 numLegacies;
    uint256 gen;
    uint256 timestamp;
  }

  event NewArt(uint256 id, uint256 orderID, address indexed owner, uint256 gen, string tokenURI, string name, uint256[] parents, uint256[] siblings, uint256 timestamp);
  event Order(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen, uint256 timestamp);
  event Accept(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen, uint256 timestamp);
  event Cancel(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen, uint256 timestamp);
  event ArtForSale(uint256 id, uint256 price, address indexed owner, uint256 gen, string tokenURI, string name, uint256[] parents, uint256[] siblings, uint256 timestamp);
  event SaleCancel(uint256 id, address indexed owner, uint256 gen, string tokenURI, string name, uint256[] parents, uint256[] siblings, uint256 timestamp);
  event Purchase(uint256 id, uint256 price, address indexed buyer, uint256 gen, string tokenURI, string name, uint256[] parents, uint256[] siblings, uint256 timestamp);
  event ContractFeeAccount(address newAddress);
  event ArtistFeeAccount(address newAddress);
  event ContractFeePercentage(uint256 newAmount);
  event ArtistFeePercentage(uint256 newAmount);
  event BaseArtPrice(uint256 newAmount);
  event ParentMultiplierPercentage(uint256 newAmount);
  event MinParents(uint256 newAmount);
  event MaxParents(uint256 newAmount);
  event MinLegacies(uint256 newAmount);
  event MaxLegacies(uint256 newAmount);
  event Withdraw(address indexed user, uint256 amount, uint256 balance);


  constructor(
    address _artistFeeAccount,
    uint256 _artistFeePercentage,
    uint256 _baseArtPrice,
    uint256 _parentMultiplierPercentage,
    uint256 _minParents,
    uint256 _maxParents,
    uint256 _minLegacies,
    uint256 _maxLegacies
    ){
    
    artworkCount = 0;
    orderCount = 0;
    contractFeePercentage = 1;
    contractFeeAccount = msg.sender;

    artistFeeAccount = _artistFeeAccount;
    artistFeePercentage = _artistFeePercentage;
    baseArtPrice = _baseArtPrice;
    parentMultiplierPercentage = _parentMultiplierPercentage;
    minParents = _minParents;
    maxParents = _maxParents;
    minLegacies = _minLegacies;
    maxLegacies = _maxLegacies;

    emit ContractFeeAccount(msg.sender);
    emit ArtistFeeAccount(_artistFeeAccount);
    emit ContractFeePercentage(contractFeePercentage);
    emit ArtistFeePercentage(_artistFeePercentage);
    emit BaseArtPrice(_baseArtPrice);
    emit ParentMultiplierPercentage(_parentMultiplierPercentage);
    emit MinParents(_minParents);
    emit MaxParents(_maxParents);
    emit MinLegacies(_minLegacies);
    emit MaxLegacies(_maxLegacies);
  }

  modifier onlyArtist() {
    require(msg.sender == artistFeeAccount);
    _;
  }

  function changeContractFeeAccount(address _contractFeeAccount) public onlyOwner {
    contractFeeAccount = _contractFeeAccount;
    emit ContractFeeAccount(_contractFeeAccount);
  }

  function changeArtistFeeAccount(address _artistFeeAccount) public onlyArtist {
    artistFeeAccount = _artistFeeAccount;
    emit ArtistFeeAccount(_artistFeeAccount);
  }

  function changeArtistFeePercentage(uint256 _artistFeePercentage) public onlyArtist {
    require(_artistFeePercentage > 0 && _artistFeePercentage < 100);
    artistFeePercentage = _artistFeePercentage;
    emit ArtistFeePercentage(_artistFeePercentage);
  }

  function changeBaseArtPrice(uint256 _baseArtPrice) public onlyArtist {
    baseArtPrice = _baseArtPrice;
    emit BaseArtPrice(_baseArtPrice);
  }

  function changeParentMultiplierPercentage(uint256 _parentMultiplierPercentage) public onlyArtist {
    require(_parentMultiplierPercentage > 0 && _parentMultiplierPercentage < 100);
    parentMultiplierPercentage = _parentMultiplierPercentage;
    emit ParentMultiplierPercentage(_parentMultiplierPercentage);
  }

  function changeMinParents(uint256 _minParents) public onlyArtist {
    require(_minParents > 0 && _minParents <= maxParents);
    minParents = _minParents;
    emit MinParents(_minParents);
  }

  function changeMaxParents(uint256 _maxParents) public onlyArtist {
    require(_maxParents >= minParents);
    maxParents = _maxParents;
    emit MaxParents(_maxParents);
  }

  function changeMinLegacies(uint256 _minLegacies) public onlyArtist {
    require(_minLegacies > 0 && _minLegacies <= maxLegacies);
    minLegacies = _minLegacies;
    emit MinLegacies(_minLegacies);
  }

  function changeMaxLegacies(uint256 _maxLegacies) public onlyArtist {
    require(_maxLegacies >= minLegacies);
    maxLegacies = _maxLegacies;
    emit MaxLegacies(_maxLegacies);
  }

  function createArtGen0(address _tokensAddress, string memory _tokenURI, string memory _name) public onlyArtist {
    uint256 _id = artworkCount;
    uint256[] memory arr;

    artworks[_id] = Art(_id, msg.sender, 0, _tokenURI, _name, arr, arr, block.timestamp);
    artworkCount = artworkCount.add(1);
    prices[_id] = baseArtPrice;

    require(Tokens(_tokensAddress).createToken(msg.sender, _id, _tokenURI));
    
    emit NewArt(_id, 999999,msg.sender, 0, _tokenURI, _name, arr, arr, block.timestamp);
  }

  function createArtFromOrder(address _tokensAddress, uint256 _orderID, string memory _tokenURI, string memory _name, uint256 _gen, uint256[] memory _parents, uint256[] memory _siblings, address _buyer) public onlyArtist {
    _Order storage _order = orders[_orderID];
    require(_order.id == _orderID);
    require(acceptedOrders[_orderID] == true);
    
    uint256 _id = artworkCount;
    artworks[_id] = Art(_id, _buyer, _gen, _tokenURI, _name, _parents, _siblings, block.timestamp);
    
    filledOrders[_orderID] = true;
    artworkCount = artworkCount.add(1);

    uint256 _price = _order.price;
    balances[artistFeeAccount] = balances[artistFeeAccount].add(_price);
    balances[address(this)] = balances[address(this)].sub(_price);

    require(Tokens(_tokensAddress).createToken(_buyer, _id, _tokenURI));
    
    emit NewArt(_id, _orderID, _buyer, _gen, _tokenURI, _name, _parents, _siblings, block.timestamp);
  }

  function purchase(address _tokenAddress, uint256 _id) public payable {
    Art storage _art = artworks[_id];
    require(_art.id == _id);
    require(msg.sender != _art.owner);
    uint256 _price = prices[_id];
    require(_price > 0);

    uint256 totalPrice;
    uint256 artistCut;
    uint256 contractCut = _price.mul(contractFeePercentage).div(100);
    
    if(_art.owner == artistFeeAccount){
      totalPrice = _price.add(contractCut);

      balances[_art.owner] = balances[_art.owner].add(_price);
      balances[contractFeeAccount] = balances[contractFeeAccount].add(contractCut);
    } else {
      artistCut = _price.mul(artistFeePercentage).div(100);
      totalPrice = _price.add(artistCut).add(contractCut);

      balances[_art.owner] = balances[_art.owner].add(_price);
      balances[artistFeeAccount] = balances[artistFeeAccount].add(artistCut);
      balances[contractFeeAccount] = balances[contractFeeAccount].add(contractCut);
    }
    require(msg.value == totalPrice);

    prices[_id] = 0;

    require(Tokens(_tokenAddress).transferToken(_art.owner, msg.sender, _id));

    _art.owner = msg.sender;
    
    emit Purchase(_id, _price, _art.owner, _art.gen, _art.tokenURI, _art.name, _art.parents, _art.siblings, block.timestamp);
  }

  function createOrder(uint256[] memory _parentIDS, uint256 _numLegacies) public payable {
    uint256 _numParents = _parentIDS.length;
    require(_numParents >= minParents && _numParents <= maxParents);
    require(_numLegacies >= minLegacies && _numLegacies <= maxLegacies);
    
    uint256 _id = orderCount;
    
    uint256 _gen = 1;
    for(uint256 i=0;i<_numParents;i++) {
      require(artworks[_parentIDS[i]].owner == msg.sender);
      if (artworks[_parentIDS[i]].gen > _gen) {
        _gen = artworks[_parentIDS[i]].gen;
      }
    }

    uint256 _price = baseArtPrice + (baseArtPrice.mul(_numLegacies).mul(parentMultiplierPercentage).mul(_numParents).div(100));  // TODO: CHECK THIS
    require(_price > 0);
    uint256 _contractFee = _price.mul(contractFeePercentage).div(100);
    require(msg.value == _price.add(_contractFee));
    orders[_id] = _Order(_id, msg.sender, _price, _parentIDS, _numLegacies, _gen, block.timestamp);
    
    balances[address(this)] = balances[address(this)].add(_price);
    balances[contractFeeAccount] = balances[contractFeeAccount].add(_contractFee);
    orderCount = orderCount.add(1);
    
    emit Order(_id, msg.sender, _price, _parentIDS, _numLegacies, _gen, block.timestamp);
  }

  function acceptOrder(uint256 _id) public onlyArtist {
    _Order storage _order = orders[_id];
    require(_order.id == _id);
    require(cancelledOrders[_id] == false && filledOrders[_id] == false);
    acceptedOrders[_id] = true;
    
    emit Accept(_id, _order.buyer, _order.price, _order.parentIDS, _order.numLegacies, _order.gen, block.timestamp);
  }

  function cancelOrder(uint256 _id) public {
    _Order storage _order = orders[_id];
    require(_order.id == _id);
    require(msg.sender == _order.buyer);
    
    cancelledOrders[_id] = true;
    balances[msg.sender] = balances[msg.sender].add(_order.price); // TODO: need to test
    balances[address(this)] = balances[address(this)].sub(_order.price); // TODO: need to test
    
    emit Cancel(_id, msg.sender, _order.price, _order.parentIDS, _order.numLegacies, _order.gen, block.timestamp);
  }

  function withdrawBalance() public {
    address payable _account = payable(msg.sender);
    uint256 _currentBalance = balances[_account];
    require(_currentBalance > 0 );
    
    balances[_account] = 0;
    _account.transfer(_currentBalance);
    
    emit Withdraw(msg.sender, _currentBalance, 0);
  }
}