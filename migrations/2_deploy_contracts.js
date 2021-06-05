const {
  TOKENS_NAME,
  TOKENS_SYMBOL,
  ARTIST_FEE_PERCENTAGE,
  BASE_ART_PRICE,
  PARENT_MULTIPLIER_PERCENTAGE,
  MIN_PARENTS,
  MAX_PARENTS,
  MIN_LEGACIES,
  MAX_LEGACIES
} = require('../test/helpers');

const Tokens = artifacts.require('Tokens')
const ArtFactory = artifacts.require('ArtFactory')

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]
  const artist = accounts[1]

  await deployer.deploy(Tokens,
    TOKENS_NAME,
    TOKENS_SYMBOL,
    { from: owner })

  await deployer.deploy(ArtFactory,
    artist,
    ARTIST_FEE_PERCENTAGE,
    BASE_ART_PRICE,
    PARENT_MULTIPLIER_PERCENTAGE,
    MIN_PARENTS,
    MAX_PARENTS,
    MIN_LEGACIES,
    MAX_LEGACIES,
    { from: owner })
}