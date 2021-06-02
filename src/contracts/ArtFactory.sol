// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// TODO:
// max parents
// max legacies

contract ArtFactory is Ownable, ERC721URIStorage {

  using SafeMath for uint256;
  
  uint256 public contractFeePercentage; // percentage out of 100
  address public contractFeeAccount;
  uint256 public artistFeePercentage; // percentage out of 100
  address public artistFeeAccount;
  uint256 public baseArtPrice;
  uint256 public parentMultiplierPercentage; // percentage out of 100
  uint256 public minParents;
  uint256 public maxParents;
  uint256 public minLegacies;
  uint256 public maxLegacies;
  uint256 public critterCount;
  uint256 public orderCount;

  mapping(uint256 => Art) public artworks;
  //mapping(uint256 => Order) public orders;

  //mapping (address => uint256) public balances;

  struct Art {
    uint256 id;
    address owner;
    uint256 gen;
    uint256 dna;
    string tokenURI;
    string name;
    bool legacyCreated;
  }

  // struct Order {
  //   uint256 id;
  //   address buyer;
  //   uint256[] artIDS;
  //   uint256 numLegacies;
  // }

  event ArtGen0(uint256 id, address owner, uint256 gen, uint256 dna, string tokenURI, string name);
  //event OrderCreated(uint256 id, address buyer, uint256[] artIDS, uint256 numLegacies);

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
    
    critterCount = 0;
    orderCount = 0;
    contractFeePercentage = 1;

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
    artistFeePercentage = _artistFeePercentage;
  }

  function changeBaseArtPrice(uint256 _baseArtPrice) public onlyArtist {
    baseArtPrice = _baseArtPrice;
  }

  function changeParentMultiplierPercentage(uint256 _parentMultiplierPercentage) public onlyArtist {
    parentMultiplierPercentage = _parentMultiplierPercentage;
  }

  function changeMinParents(uint256 _minParents) public onlyArtist {
    minParents = _minParents;
  }

  function changeMaxParents(uint256 _maxParents) public onlyArtist {
    maxParents = _maxParents;
  }

  function changeMinLegacies(uint256 _minLegacies) public onlyArtist {
    minLegacies = _minLegacies;
  }

  function changeMaxLegacies(uint256 _maxLegacies) public onlyArtist {
    maxLegacies = _maxLegacies;
  }

  // function createNewCritter(uint256 _gen, uint256 _dna, string memory _tokenURI, string memory _name) public onlyArtist {
  //   uint256 _id = critterCount;
  //   critters[_id] = Critter(_id, msg.sender, _gen, _dna, _tokenURI, _name, false);
    
  //   _safeMint(msg.sender, _id);
  //   _setTokenURI(_id, _tokenURI);
    
  //   critterCount = critterCount.add(1);
  //   //emit Critter(_id, msg.sender, _gen, _dna, _tokenURI, _name);
  // }
  
/*
  function createOrder(uint256[] memory _artIDS, uint256 _numLegacies) public payable {
    uint256 _numParents = _artIDS.length;
    
    require(_numParents >= 2); // min 2 parents
    require(_numLegacies >= 1); // min 1 legacy
    require(parentPriceMultipliers[_numParents] != 0); // multiplier exists
    require(legacyPriceMulipliers[_numLegacies] != 0); // multiplier exists

    for(uint256 i=0;i<_numParents;i++) {
      require(critters[i].owner == msg.sender); // msg.sender must own art
    }

    uint256 _artPrice = artPrice * parentPriceMultipliers[_numParents] * legacyPriceMulipliers[_numLegacies];
    uint256 _contractFee = _artPrice * (contractFee / 100);
    _artPrice = _artPrice.add(_contractFee);
    require(_artPrice > 0); // price not zero - calculation error
    require(msg.value == _artPrice); // correct payment

    uint256 _id = orderCount;
    orders[_id] = Order(_id, msg.sender, _artIDS, _numLegacies);
    orderCount = orderCount.add(1);
    emit OrderCreated(_id, msg.sender, _artIDS, _numLegacies);
  }
  */
}