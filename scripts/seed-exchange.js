const { ARTIST_FEE_PERCENTAGE, BASE_ART_PRICE, PARENT_MULTIPLIER_PERCENTAGE, MIN_PARENTS, MAX_PARENTS, MIN_LEGACIES, MAX_LEGACIES, TOKENS_NAME, TOKENS_SYMBOL, GEN0_TOTAL_PRICE } = require("../test/helpers")

const Tokens = artifacts.require('Tokens')
const ArtFactory = artifacts.require('ArtFactory')

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  try {
    console.log('script is running')
    
    // get accounts and contracts
    const accounts = await web3.eth.getAccounts()
    const owner = accounts[0]
    const artist = accounts[1]
    const buyer1 = accounts[2]
    const buyer2 = accounts[3]
    
    // get contracts
    const tokens = await Tokens.deployed(
      TOKENS_NAME,
      TOKENS_SYMBOL,
      { from: owner }
    )
    console.log('Tokens fetched: ', tokens.address)
    
    const artFactory = await ArtFactory.deployed(
      artist,
      ARTIST_FEE_PERCENTAGE,
      BASE_ART_PRICE,
      PARENT_MULTIPLIER_PERCENTAGE,
      MIN_PARENTS,
      MAX_PARENTS,
      MIN_LEGACIES,
      MAX_LEGACIES,
      { from: owner }
    )
    console.log('ArtFactory fetched: ', artFactory)

    // create gen0 art
    let result

    await tokens.setMarketplaceAddress(artFactory.address, { from: owner })
    console.log('marketplace address set')

    await tokens.approveMarketplace(artFactory.address, true, { from: artist })
    console.log('marketplace approval for artist')

    await tokens.approveMarketplace(artFactory.address, true, { from: buyer1 })
    console.log('marketplace approval for buyer1')

    await tokens.approveMarketplace(artFactory.address, true, { from: buyer2 })
    console.log('marketplace approval for buyer2')

    result = await artFactory.createArtGen0(tokens.address, "111", "Andrew", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 0')

    result = await artFactory.createArtGen0(tokens.address, "222", "Hannah", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 1')

    result = await artFactory.createArtGen0(tokens.address, "333", "Alexis", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 2')

    // purchase
    await artFactory.purchase(tokens.address, '0', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase: id = 0')

    await artFactory.purchase(tokens.address, '2', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase: id = 2')

  } catch (error) {
    console.log(error)
  }

  callback()
}