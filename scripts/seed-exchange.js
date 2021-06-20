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

    result = await artFactory.createArtGen0(tokens.address, "000", "Andrew", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 0')

    result = await artFactory.createArtGen0(tokens.address, "111", "Hannah", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 1')

    result = await artFactory.createArtGen0(tokens.address, "222", "David", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 2')

    result = await artFactory.createArtGen0(tokens.address, "333", "Alexis", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 3')

    result = await artFactory.createArtGen0(tokens.address, "444", "Stevie", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 4')

    result = await artFactory.createArtGen0(tokens.address, "555", "Johnny", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 5')

    result = await artFactory.createArtGen0(tokens.address, "666", "Moira", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 6')

    result = await artFactory.createArtGen0(tokens.address, "777", "Roland", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 7')

    result = await artFactory.createArtGen0(tokens.address, "888", "Patrick", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 8')

    result = await artFactory.createArtGen0(tokens.address, "999", "Ronnie", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 9')

    result = await artFactory.createArtGen0(tokens.address, "101010", "Joe", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 10')

    result = await artFactory.createArtGen0(tokens.address, "111111", "John", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 11')

    result = await artFactory.createArtGen0(tokens.address, "121212", "Paul", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 12')

    result = await artFactory.createArtGen0(tokens.address, "131313", "Rachel", { from: artist })
    await wait(1)
    console.log('New art gen 0: id = 13')

    result = await artFactory.createArtGen0(tokens.address, "141414", "Adam", { from: artist })
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

    await artFactory.createArtFromOrder(tokens.address, 5, "poiu", "JessieOrder", 1, [11,12], [], buyer1, { from: artist })
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