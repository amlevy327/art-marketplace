const { ARTIST_FEE_PERCENTAGE, BASE_ART_PRICE, PARENT_MULTIPLIER_PERCENTAGE, MIN_PARENTS, MAX_PARENTS, MIN_LEGACIES, MAX_LEGACIES, TOKENS_NAME, TOKENS_SYMBOL, GEN0_TOTAL_PRICE, TOTAL_PRICE } = require("../test/helpers")

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
    console.log('Tokens fetched')
    
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
    console.log('ArtFactory fetched')

    
    let result

    // set marketplace address

    await tokens.setMarketplaceAddress(artFactory.address, { from: owner })
    console.log('marketplace address set')

    // marketplace approvals

    await tokens.approveMarketplace(artFactory.address, true, { from: artist })
    console.log('marketplace approval for artist')

    await tokens.approveMarketplace(artFactory.address, true, { from: buyer1 })
    console.log('marketplace approval for buyer1')

    await tokens.approveMarketplace(artFactory.address, true, { from: buyer2 })
    console.log('marketplace approval for buyer2')

    // create gen0 arts

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmWd5X5cwcsKaC1UScppxwZtccbZP4eBNtGoR4fHQ2AHr8", "Andrew", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 0')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmYtcgwadwhuMQ5U4cKkGPaMCL5rjKnS92h29nuCboD6CM", "Hannah", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 1')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmY1C4fd9grSqqJh1qLyeLcJ14Y4e18wbGFLEqMcDHEtop", "David", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 2')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmXPMjbzuTPKzvXqpivL2hrTnpTjMK4TSTZ4mEfkqhModt", "Alexis", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 3')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmSyMPsYrd36T6UsbMSfEud8gk9yihroGGN8kya6vumh8q", "Stevie", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 4')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmaGjZXuFvbMG3WJjyyFg15NYuU3SFNAQofSjjcmLwNiZb", "Johnny", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 5')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmWzzrCWFXW8KjBSS4fSzae2UAk65KPuRLrdZkd5QT6CBr", "Moira", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 6')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmdC98SyS7gjpCQbb78uX642UL6kNvMPcyhmwY4rfG3bVX", "Roland", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 7')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmV1UxMhfJH9do2fzQSo5zw5g3t8LLAp7p1Rmxeu2vWoGi", "Patrick", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 8')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmfUcs5f9nLuuJPwtHX4J2GpiKvALDweeWVY4gTQL6dwfD", "Ronnie", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 9')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/Qmc7xyPqdL8N9JvNoCoKeKHXYxDcLcYjxLcwboQDqpTjKa", "Joe", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 10')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmexJKvxpmNGq1XFDuq3JDad4KZ9o6BHznCoJNM7Bwanrq", "John", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 11')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmafY3yEjfyy2mri33kapmaGshoUwowGzu7d8tLjTJ91xs", "Paul", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 12')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmWTqJT28tR63VURexAmnNzjfNJJaBxMvX6Sc5NvrnRP3R", "Rachel", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 13')

    result = await artFactory.createArtGen0(tokens.address, "https://ipfs.io/ipfs/QmdE9eJZfb45LuLT6X2rhmZtdWHf1ggMGNwJg9G5n3MuY1", "Adam", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 14')

    // purchases

    await artFactory.purchase(tokens.address, '0', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 0')

    await artFactory.purchase(tokens.address, '2', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 2')

    await artFactory.purchase(tokens.address, '4', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 4')

    await artFactory.purchase(tokens.address, '6', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 6')

    await artFactory.purchase(tokens.address, '1', { from: buyer2, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 1')

    await artFactory.purchase(tokens.address, '3', { from: buyer2, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 3')

    await artFactory.purchase(tokens.address, '5', { from: buyer2, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 5')

    await artFactory.purchase(tokens.address, '7', { from: buyer2, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 7')

    await artFactory.purchase(tokens.address, '10', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 8')

    await artFactory.purchase(tokens.address, '11', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 9')

    await artFactory.purchase(tokens.address, '12', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 10')

    await artFactory.purchase(tokens.address, '13', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 11')

    await artFactory.purchase(tokens.address, '14', { from: buyer1, value: GEN0_TOTAL_PRICE })
    await wait(1)
    console.log('New art purchase gen0: id = 12')

    // create orders

    await artFactory.createOrder([0], 2, { from: buyer1, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 0')

    await artFactory.createOrder([4,6], 1, { from: buyer1, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 1')

    await artFactory.createOrder([1], 2, { from: buyer2, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 2')

    await artFactory.createOrder([3,5], 1, { from: buyer2, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 3')

    await artFactory.createOrder([10], 2, { from: buyer1, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 4')

    await artFactory.createOrder([11,12], 1, { from: buyer1, value: TOTAL_PRICE })
    await wait(1)
    console.log('New order: id = 5')

    // accept orders

    await artFactory.acceptOrder('1', { from: artist })
    await wait(1)
    console.log('Accepted order: id = 1')

    await artFactory.acceptOrder('2', { from: artist })
    await wait(1)
    console.log('Accepted order: id = 2')

    await artFactory.acceptOrder('5', { from: artist })
    await wait(1)
    console.log('Accepted order: id = 3')

    // create arts from orders

    await artFactory.createArtFromOrder(tokens.address, 5, "https://ipfs.io/ipfs/QmS5DRxNRQv9jMxpzUxcdxzKay6SwUEEsU8JtTuBdFZNi9", "JessieOrder", 1, [11,12], [], buyer1, { from: artist })
    await wait(1)
    console.log('Create art from order: id = 15')

    // create art for sale
    await artFactory.putUpForSale(tokens.address, 13, 30000, { from: buyer1 })
    await wait(1)
    console.log('Art id=13 for sale: id = 0')

    await artFactory.putUpForSale(tokens.address, 14, 40000, { from: buyer1 })
    await wait(1)
    console.log('Art id=14 for sale: id = 1')

    // cancel sale
    artFactory.cancelSale(14, { from: buyer1 } )
    await wait(1)
    console.log('Sale cancelled art id = 14: id = 0')

  } catch (error) {
    console.log(error)
  }

  callback()
}