// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// todo
// art needs timestamps
// orders need timestamps

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
  event Order(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);
  event Accept(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);
  event Cancel(uint256 id, address indexed buyer, uint256 price, uint256[] parentIDS, uint256 numLegacies, uint256 gen);

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

  // function purchaseArtForSale(uint256 _tokenId) public {
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
    balances[msg.sender] = balances[msg.sender].add(_order.price); // need to test
    balances[artistFeeAccount] = balances[artistFeeAccount].sub(_order.price); // need to test
    emit Cancel(_id, msg.sender, _order.price, _order.parentIDS, _order.numLegacies, _order.gen);
  }
}