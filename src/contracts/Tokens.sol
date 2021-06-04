// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Tokens is ERC721URIStorage {
  using SafeMath for uint256;

  constructor() ERC721("Art", "ART") {
  }
}