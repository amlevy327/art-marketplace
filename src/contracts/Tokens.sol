// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Tokens is Ownable, ERC721URIStorage {
  using SafeMath for uint256;

  address public marketplaceAddress;

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
  }

  function setMarketplaceAddress(address _marketplaceAddress) public onlyOwner {
    marketplaceAddress = _marketplaceAddress;
  }

  modifier onlyMarketplaceAddress() {
    require(msg.sender == marketplaceAddress);
    _;
  }

  function createToken(address _to, uint256 _tokenId, string memory _tokenURI) public onlyMarketplaceAddress returns(bool success) {
    _safeMint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    return true;
  }

  function approveMarketplace(address _operator, bool _approved) public returns(bool success) {
    setApprovalForAll(_operator, _approved);
    return true;
  }

  function transferToken(address _from, address _to, uint256 _tokenId) public returns(bool success) {
    safeTransferFrom(_from, _to, _tokenId);
    return true;
  }
}