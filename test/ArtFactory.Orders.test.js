const {
  EVM_REVERT,
  ARTIST_FEE_PERCENTAGE,
  BASE_ART_PRICE,
  MIN_PARENTS,
  MAX_PARENTS,
  MIN_LEGACIES,
  MAX_LEGACIES,
  PARENT_MULTIPLIER_PERCENTAGE,
  TOKEN_URI,
  NAME,
  PARENT_IDS,
  PARENT_IDS_LOW,
  PARENT_IDS_HIGH,
  NUM_LEGACIES,
  NUM_LEGACIES_LOW,
  NUM_LEGACIES_HIGH,
  ORDER_PRICE,
  CONTRACT_FEE,
  TOTAL_PRICE,
  TOKENS_NAME, 
  TOKENS_SYMBOL
} = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const Tokens = artifacts.require('./src.contracts/Tokens.sol')
const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - orders', ([owner, artist, buyer1]) => {
  let artFactory
  let tokens

  beforeEach(async () => {
    tokens = await Tokens.new(TOKENS_NAME, TOKENS_SYMBOL)
    
    artFactory = await ArtFactory.new(
      artist,
      ARTIST_FEE_PERCENTAGE,
      BASE_ART_PRICE,
      PARENT_MULTIPLIER_PERCENTAGE,
      MIN_PARENTS,
      MAX_PARENTS,
      MIN_LEGACIES,
      MAX_LEGACIES,
      { from: owner })

    await tokens.setMarketplaceAddress(artFactory.address, { from: owner })
  })

  describe('new order', () => {
    let result

    describe('success', () => {
      beforeEach(async() => {
        await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
        result = await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      })

      it('tracks new order', async () => {
        const orderCount = await artFactory.orderCount()
        orderCount.toString().should.equal('1', 'order count is correct')

        const order = await artFactory.orders('0')
        order.id.toString().should.equal('0', 'id is correct')
        order.price.toString().should.equal(ORDER_PRICE.toString(), 'order price is correct')
        order.buyer.toString().should.equal(artist.toString(), 'buyer is correct')
        // TODO: order.parentIDS.toString().should.equal(_parentIDS.toString(), 'parentIDS is correct')
        order.numLegacies.toString().should.equal(NUM_LEGACIES.toString(), 'num legacies is correct')
        order.gen.toString().should.equal('1', 'gen is correct')

        const artistFeeAccountBalance = await artFactory.balances(artist)
        artistFeeAccountBalance.toString().should.equal(ORDER_PRICE.toString(), 'artist fee account balance is correct')

        const contractFeeAccountBalance = await artFactory.balances(owner)
        contractFeeAccountBalance.toString().should.equal(CONTRACT_FEE.toString(), 'contract fee account balance is correct')
      })

      it('emits Order event', async () => {
        // TODO: issue reading array
        // expectEvent(result, 'Order', { id: '0', buyer: buyer1, artPrice: 0, parentIDS: PARENT_IDS, numLegacies: NUM_LEGACIES, gen: '1' })
      })
    })

    describe('failure', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      })

      it('rejects num parents below min parents', async () => {
        await artFactory.createOrder(PARENT_IDS_LOW, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects num parents above max parents', async () => {
        await artFactory.createOrder(PARENT_IDS_HIGH, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })
      
      it('rejects num legacies below min legacies', async () => {
        await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES_LOW, { from: artist, value: TOTAL_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects num legacies above max legacies', async () => {
        await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES_HIGH, { from: artist, value: TOTAL_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if sender does not own all art', async () => {
        await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: buyer1, value: TOTAL_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if message value is incorrect', async () => {
        await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: '1' }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('accept order', () => {

    describe('success', () => {
      beforeEach(async() => {
        await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
        await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      })

      it('tracks accepted order by artist', async () => {
        await artFactory.acceptOrder('0', { from: artist })
        const acceptedOrder = await artFactory.acceptedOrders('0')
        acceptedOrder.should.equal(true, 'accepted orders mapping correct')
      })

      it('emits Accepted event', async () => {
        // TODO: issue reading array
        // expectEvent(result, 'Accepted', { id: '0', buyer: buyer1, artPrice: 0, parentIDS: _parentIDS, numLegacies: _numLegacies, gen: '1' })
      })
    })

    describe('failure', () => {
      it('rejects invalid id', async () => {
        await artFactory.acceptOrder('100', { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non buyer sender', async () => {
        await artFactory.acceptOrder('0', { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('cancel order', () => {
    const cost = '1111000000'

    beforeEach(async() => {
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
    })

    describe('success', () => {
      
      it('tracks cancelled order by buyer', async () => {
        await artFactory.cancelOrder('0', { from: artist })
        const cancelledOrder = await artFactory.cancelledOrders('0')
        cancelledOrder.should.equal(true, 'cancelled orders mapping correct')

        // TODO: need another account to test
        // const buyerAccountBalance = await artFactory.balances(artist)
        // buyerAccountBalance.toString().should.equal('1100000000', 'buyer account balance is correct')
        // same for artist account balance
      })

      it('emits Cancel event', async () => {
        // TODO: issue reading array
        // expectEvent(result, 'Cancel', { id: '0', buyer: buyer1, artPrice: 0, parentIDS: _parentIDS, numLegacies: _numLegacies, gen: '1' })
      })
    })

    describe('failure', () => {
      it('rejects invalid id', async () => {
        await artFactory.cancelOrder('100', { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non buyer sender', async () => {
        await artFactory.cancelOrder('0', { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})