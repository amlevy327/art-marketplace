// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ArtFactory is Ownable, ERC721URIStorage {

  using SafeMath for uint256;
  
  uint256 public contractFee;
  uint256 public artistFee;
  address public contractFeeAccount;
  address public artistFeeAccount;
  uint256 public critterCount;

  struct Critter {
    uint256 id;
    address owner;
    uint256 gen;
    uint256 dna;
    string tokenURI;
    string name;
    bool legacyCreated;
  }

  struct _Proposal {
    uint256 id;
  }

  mapping(uint256 => Critter) public critters;
  mapping(uint256 => _Proposal) public proposals;
  //mapping(uint256 => bool) public proposalCancelled;
  //mapping(uint256 => bool) public orders;

  event Artwork(uint256 id, address owner, uint256 gen, uint256 dna, string tokenURI, string name);
  event Proposal();
  
  constructor(address _artistFeeAccount, uint256 _artistFee) ERC721("Critter", "CRITTER") {
    contractFee = 1;
    artistFeeAccount = _artistFeeAccount;
    artistFee = _artistFee;
    critterCount = 0;
  }

  modifier onlyArtist() {
    require(msg.sender == artistFeeAccount);
    _;
  }

  function changeArtistFeeAccount(address _artistFeeAccount) public onlyArtist {
    artistFeeAccount = _artistFeeAccount;
  }

  function changeContractFeeAccount(address _contractFeeAccount) public onlyOwner {
    contractFeeAccount = _contractFeeAccount;
  }

  function createArtwork(uint256 _gen, uint256 _dna, string memory _tokenURI, string memory _name) public onlyArtist {
    uint256 _id = critterCount;
    critters[_id] = Critter(_id, msg.sender, _gen, _dna, _tokenURI, _name, false);
    _safeMint(msg.sender, _id);
    _setTokenURI(_id, _tokenURI);
    critterCount = critterCount.add(1);
    emit Artwork(_id, msg.sender, _gen, _dna, _tokenURI, _name);
  }

  function createProposal() public {

    emit Proposal();
  }
}