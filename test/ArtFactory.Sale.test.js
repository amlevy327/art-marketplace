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
  TOTAL_PRICE,
  PARENT_IDS,
  NUM_LEGACIES,
  SALE_PRICE,
  GEN_1,
  TOTAL_PURCHASE_PRICE,
  ARTIST_CUT,
  CONTRACT_CUT,
  ORDER_PRICE,
  CONTRACT_FEE
} = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - sale', ([owner, artist, buyer1, buyer2]) => {
  let artFactory

  beforeEach(async () => {
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
  })

  describe('put up for sale', () => {
    let result
    let artID = '1'
    let orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.createArtFromOrder(orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.putUpForSale(artID, SALE_PRICE, { from: buyer1 })
      })
  
      it('tracks sale by owner', async () => {
        const salePrice = await artFactory.prices(artID)
        salePrice.toString().should.equal(SALE_PRICE.toString(), 'prices mapping is correct')
      })
      
      it('emits ArtForSale event', async () => {
        // TODO: expectEvent(result, 'ArtForSale', { id: artID, price: SALE_PRICE.toString(), owner: buyer1, gen: GEN_1.toString(), tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects incorrect art id', async () => {
        await artFactory.putUpForSale('999', SALE_PRICE, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non owner sender', async () => {
        await artFactory.putUpForSale(artID, SALE_PRICE, { from: buyer2 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('cancel sale', () => {
    let result
    let artID = '1'
    let orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.createArtFromOrder(orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
      await artFactory.putUpForSale(artID, SALE_PRICE, { from: buyer1 })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.cancelSale(artID, { from: buyer1 })
      })
  
      it('tracks sale by owner', async () => {
        const salePrice = await artFactory.prices(artID)
        salePrice.toString().should.equal('0', 'prices mapping is correct')
      })
      
      it('emits SaleCancel event', async () => {
        // TODO: expectEvent(result, 'SaleCancel', { id: artID, owner: buyer1, gen: GEN_1.toString(), tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects incorrect art id', async () => {
        await artFactory.cancelSale('999', { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non owner sender', async () => {
        await artFactory.cancelSale(artID, { from: buyer2 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
  
  describe('purchase', () => {
    let result
    let artID = '1'
    let orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.createArtFromOrder(orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
      await artFactory.putUpForSale(artID, SALE_PRICE, { from: buyer1 })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.purchase(artID, { from: buyer2, value: TOTAL_PURCHASE_PRICE })
      })

      it('tracks purchase', async () => {
        const art = await artFactory.artworks(artID)
        art.owner.toString().should.equal(buyer2.toString(), 'new owner is correct')
        
        const price = await artFactory.prices(artID)
        price.toString().should.equal('0', 'price reset to 0')

        const sellerBalance = await artFactory.balances(buyer1)
        sellerBalance.toString().should.equal(SALE_PRICE.toString(), 'seller balance is correct')
        const artistBalance = await artFactory.balances(artist)
        artistBalance.toString().should.equal((ORDER_PRICE + ARTIST_CUT).toString(), 'artist balance is correct')
        const contractBalance = await artFactory.balances(owner)
        contractBalance.toString().should.equal((CONTRACT_FEE + CONTRACT_CUT).toString(), 'contract balance is correct')
      })
      
      it('emits Purchase event', async () => {
        // TODO: expectEvent(result, 'Purchase', { id: artID, price: SALE_PRICE.toString(), buyer: buyer2, gen: GEN_1.toString(), tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects incorrect art id', async () => {
        await artFactory.purchase('999', { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if value does not match price', async () => {
        await artFactory.purchase(artID, { from: buyer2, value: '1' }).should.be.rejectedWith(EVM_REVERT)
      })

      // it('rejects if price not above 0', async () => {
      //   await artFactory.purchase(artID, { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      // })

      it('rejects if buyer is seller', async () => {
        await artFactory.purchase(artID, { from: buyer1, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})