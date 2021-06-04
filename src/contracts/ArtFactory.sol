// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Tokens.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// todo
// cancelled orders balance transfers
// art needs timestamps
// orders need timestamps
// withdraw

contract ArtFactory is Ownable, ERC721URIStorage {

  using SafeMath for uint256;
  
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
    bool legacyCreated;
    uint256[] parents;
    uint256[] siblings;
  }

  struct _Order {
    uint256 id;
    address buyer;
    uint256 price;
    uint256[] parentIDS;
    uint256 numLegacies;
    uint256 gen;
  }

  event ArtGen0(uint256 id, address indexed owner, uint256 gen, string tokenURI, string name, bool legacyCreated, uint256[] parents, uint256[] siblings);
  event ArtFromOrder(uint256 id, uint256 orderID, address indexed owner, uint256 gen, string tokenURI, string name, bool legacyCreated, uint256[] parents, uint256[] siblings);
  event Order(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);
  event Accept(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);
  event Cancel(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);
  event ArtForSale(uint256 id, uint256 price, address indexed owner, uint256 gen, string tokenURI, string name, bool legacyCreated, uint256[] parents, uint256[] siblings);
  event SaleCancel(uint256 id, address indexed owner, uint256 gen, string tokenURI, string name, bool legacyCreated, uint256[] parents, uint256[] siblings);
  event Purchase(uint256 id, uint256 price, address indexed buyer, uint256 gen, string tokenURI, string name, bool legacyCreated, uint256[] parents, uint256[] siblings);

  constructor(
    address _artistFeeAccount,
    uint256 _artistFeePercentage,
    uint256 _baseArtPrice,
    uint256 _parentMultiplierPercentage,
    uint256 _minParents,
    uint256 _maxParents,
    uint256 _minLegacies,
    uint256 _maxLegacies
    ) ERC721("Art", "ART") {
    
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
  }

  modifier onlyArtist() {
    require(msg.sender == artistFeeAccount);
    _;
  }

  function changeContractFeeAccount(address _contractFeeAccount) public onlyOwner {
    contractFeeAccount = _contractFeeAccount;
  }

  function changeArtistFeeAccount(address _artistFeeAccount) public onlyArtist {
    artistFeeAccount = _artistFeeAccount;
  }

  function changeArtistFeePercentage(uint256 _artistFeePercentage) public onlyArtist {
    require(_artistFeePercentage > 0 && _artistFeePercentage < 100);
    artistFeePercentage = _artistFeePercentage;
  }

  function changeBaseArtPrice(uint256 _baseArtPrice) public onlyArtist {
    baseArtPrice = _baseArtPrice;
  }

  function changeParentMultiplierPercentage(uint256 _parentMultiplierPercentage) public onlyArtist {
    require(_parentMultiplierPercentage > 0 && _parentMultiplierPercentage < 100);
    parentMultiplierPercentage = _parentMultiplierPercentage;
  }

  function changeMinParents(uint256 _minParents) public onlyArtist {
    require(_minParents > 0 && _minParents <= maxParents);
    minParents = _minParents;
  }

  function changeMaxParents(uint256 _maxParents) public onlyArtist {
    require(_maxParents >= minParents);
    maxParents = _maxParents;
  }

  function changeMinLegacies(uint256 _minLegacies) public onlyArtist {
    require(_minLegacies > 0 && _minLegacies <= maxLegacies);
    minLegacies = _minLegacies;
  }

  function changeMaxLegacies(uint256 _maxLegacies) public onlyArtist {
    require(_maxLegacies >= minLegacies);
    maxLegacies = _maxLegacies;
  }

  function createArtGen0(string memory _tokenURI, string memory _name) public onlyArtist {
    uint256 _id = artworkCount;
    uint256[] memory arr;
    artworks[_id] = Art(_id, msg.sender, 0, _tokenURI, _name, false, arr, arr);
    
    _safeMint(msg.sender, _id);
    _setTokenURI(_id, _tokenURI);
    
    artworkCount = artworkCount.add(1);
    prices[_id] = baseArtPrice;
    
    emit ArtGen0(_id, msg.sender, 0, _tokenURI, _name, false, arr, arr);
  }

  function createArtFromOrder(uint256 _orderID, string memory _tokenURI, string memory _name, uint256 _gen, uint256[] memory _parents, uint256[] memory _siblings, address _buyer) public onlyArtist {
    _Order storage _order = orders[_orderID];
    require(_order.id == _orderID);
    
    uint256 _id = artworkCount;
    artworks[_id] = Art(_id, _buyer, _gen, _tokenURI, _name, false, _parents, _siblings);
    
    _safeMint(_buyer, _id);
    _setTokenURI(_id, _tokenURI);

    filledOrders[_orderID] = true;
    artworkCount = artworkCount.add(1);
    for(uint i=0;i<_parents.length;i++) {
      if(artworks[_parents[i]].legacyCreated == false) {
        artworks[_parents[i]].legacyCreated = true;
      }
    }
    
    emit ArtFromOrder(_id, _orderID, msg.sender, _gen, _tokenURI, _name, false, _parents, _siblings);
  }

  function putUpForSale(uint256 _id, uint256 _price) public {
    Art storage _art = artworks[_id];
    require(_art.id == _id);
    require(msg.sender == _art.owner);

    prices[_id] = _price;
    
    emit ArtForSale(_id, _price, _art.owner, _art.gen, _art.tokenURI, _art.name, _art.legacyCreated, _art.parents, _art.siblings);
  }

  function cancelSale(uint256 _id) public {
    Art storage _art = artworks[_id];
    require(_art.id == _id);
    require(msg.sender == _art.owner);

    prices[_id] = 0;
    
    emit SaleCancel(_id, _art.owner, _art.gen, _art.tokenURI, _art.name, _art.legacyCreated, _art.parents, _art.siblings);
  }

  function purchase(uint256 _id) public payable {
    Art storage _art = artworks[_id];
    require(_art.id == _id);
    require(msg.sender != _art.owner);
    uint256 _price = prices[_id];
    require(_price > 0);

    uint256 artistCut = _price.mul(artistFeePercentage).div(100);
    uint256 contractCut = _price.mul(contractFeePercentage).div(100);
    uint256 totalPrice = _price.add(artistCut).add(contractCut);
    require(msg.value == totalPrice);

    balances[_art.owner] = balances[_art.owner].add(_price);
    balances[artistFeeAccount] = balances[artistFeeAccount].add(artistCut);
    balances[contractFeeAccount] = balances[contractFeeAccount].add(contractCut);

    // transfer NFT (_safeTransfer) - is approval required?
    // setApprovalForAll(address(this), true);
    // safeTransferFrom(_art.owner, msg.sender, _id);
    //_transferAfterApproved(_id, msg.sender);
    
    
    _art.owner = msg.sender;

    prices[_id] = 0;

    emit Purchase(_id, _price, _art.owner, _art.gen, _art.tokenURI, _art.name, _art.legacyCreated, _art.parents, _art.siblings);
  }

  // function _transferAfterApproved(uint256 _id, address _buyer) private {
  //   Art storage _art = artworks[_id];
  //   safeTransferFrom(_art.owner, _buyer, _id);
  // }

  function createOrder(uint256[] memory _parentIDS, uint256 _numLegacies) public payable {
    uint256 _numParents = _parentIDS.length;
    uint256 _id = orderCount;
    uint256 _gen = 1;
    
    require(_numParents >= minParents && _numParents <= maxParents);
    require(_numLegacies >= minLegacies && _numLegacies <= maxLegacies);
    
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
    orders[_id] = _Order(_id, msg.sender, _price, _parentIDS, _numLegacies, _gen);
    
    balances[artistFeeAccount] = balances[artistFeeAccount].add(_price);
    balances[contractFeeAccount] = balances[contractFeeAccount].add(_contractFee);
    orderCount = orderCount.add(1);
    
    emit Order(_id, msg.sender, _price, _parentIDS, _numLegacies, _gen);
  }

  function acceptOrder(uint256 _id) public onlyArtist {
    _Order storage _order = orders[_id];
    require(_order.id == _id);
    acceptedOrders[_id] = true;
    
    emit Accept(_id, msg.sender, _order.price, _order.parentIDS, _order.numLegacies, _order.gen);
  }

  function cancelOrder(uint256 _id) public {
    _Order storage _order = orders[_id];
    require(_order.id == _id);
    require(msg.sender == _order.buyer);
    
    cancelledOrders[_id] = true;
    balances[msg.sender] = balances[msg.sender].add(_order.price); // TODO: need to test
    balances[artistFeeAccount] = balances[artistFeeAccount].sub(_order.price); // TODO: need to test
    
    emit Cancel(_id, msg.sender, _order.price, _order.parentIDS, _order.numLegacies, _order.gen);
  }
}