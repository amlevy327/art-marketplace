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
    string name;
    bool legacyCreated;
  }

  Critter[] critters;
  
  constructor(address _artistFeeAccount, uint256 _artistFee) ERC721("Critter", "CRITTER") {
    contractFee = 1;
    artistFeeAccount = _artistFeeAccount;
    artistFee = _artistFee;
    critterCount = 0;
  }

  function createArtwork(uint256 _gen, uint256 _dna, string memory _name, string memory _tokenURI) public {
    uint256 _id = critterCount;
    critters.push(Critter(_id, msg.sender, _gen, _dna, _name, false));
    _safeMint(msg.sender, _id);
    _setTokenURI(_id, _tokenURI);
    critterCount = critterCount.add(1);
  }

  function changeArtistFeeAccount(address _artistFeeAccount) public {
    require(msg.sender == artistFeeAccount);
    artistFeeAccount = _artistFeeAccount;
  }
}