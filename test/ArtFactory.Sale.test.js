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
  CONTRACT_FEE,
  TOKENS_NAME,
  TOKENS_SYMBOL,
  GEN0_SALE_PRICE,
  GEN0_CONTRACT_CUT,
  GEN0_TOTAL_PRICE
} = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const Tokens = artifacts.require('./src.contracts/Tokens.sol')
const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - sale', ([owner, artist, buyer1, buyer2, buyer3]) => {
  let tokens
  let artFactory

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

  describe('put up for sale', () => {
    let result
    let artID = '1'
    let orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.acceptOrder(orderID, { from: artist })
      await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        await tokens.approveMarketplace(artFactory.address, true, { from: buyer1 })
        result = await artFactory.putUpForSale(tokens.address, artID, SALE_PRICE, { from: buyer1 })
      })

      it('approves marketplace successfully', async () => {
        const result = await tokens.isApprovedForAll(buyer1, artFactory.address)
        result.should.equal(true, 'marketplace approval is correct')
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
      it('rejects if marketplace not approved', async () => {
        await artFactory.putUpForSale(tokens.address, artID, SALE_PRICE, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects incorrect art id', async () => {
        await artFactory.putUpForSale(tokens.address, '999', SALE_PRICE, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non owner sender', async () => {
        await artFactory.putUpForSale(tokens.address, artID, SALE_PRICE, { from: buyer2 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('cancel sale', () => {
    let result
    let artID = '1'
    let orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.acceptOrder(orderID, { from: artist })
      await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
      await tokens.approveMarketplace(artFactory.address, true, { from: buyer1 })
      await artFactory.putUpForSale(tokens.address, artID, SALE_PRICE, { from: buyer1 })
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

  describe('purchase - non artist owner', () => {
    let result
    const artID = '1'
    const orderID = '0'

    beforeEach(async() => {
      await tokens.approveMarketplace(artFactory.address, true, { from: artist })
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.acceptOrder(orderID, { from: artist })
      await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
      await tokens.approveMarketplace(artFactory.address, true, { from: buyer1 })
      await artFactory.putUpForSale(tokens.address, artID, SALE_PRICE, { from: buyer1 })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.purchase(tokens.address, artID, { from: buyer2, value: TOTAL_PURCHASE_PRICE })
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
        await artFactory.purchase(tokens.address, '999', { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if value does not match price', async () => {
        await artFactory.purchase(tokens.address, artID, { from: buyer2, value: '1' }).should.be.rejectedWith(EVM_REVERT)
      })

      // it('rejects if price not above 0', async () => {
      //   await artFactory.purchase(tokens.address, artID, { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      // })

      it('rejects if buyer is seller', async () => {
        await artFactory.purchase(tokens.address, artID, { from: buyer1, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
  
  describe('purchase - artist owner', () => {
    let result
    const artID = '0'

    beforeEach(async() => {
      await tokens.approveMarketplace(artFactory.address, true, { from: artist })
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.purchase(tokens.address, artID, { from: buyer2, value: GEN0_TOTAL_PRICE })
      })

      it('tracks purchase from artist', async () => {
        const art = await artFactory.artworks('0')
        art.owner.toString().should.equal(buyer2.toString(), 'new owner is correct')
        
        const price = await artFactory.prices('0')
        price.toString().should.equal('0', 'price reset to 0')

        const artistBalance = await artFactory.balances(artist)
        artistBalance.toString().should.equal(GEN0_SALE_PRICE.toString(), 'artist balance is correct')
        const contractBalance = await artFactory.balances(owner)
        contractBalance.toString().should.equal(GEN0_CONTRACT_CUT.toString(), 'contract balance is correct')
      })
      
      it('emits Purchase event', async () => {
        // TODO: expectEvent(result, 'Purchase', { id: artID, price: SALE_PRICE.toString(), buyer: buyer2, gen: GEN_1.toString(), tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects incorrect art id', async () => {
        await artFactory.purchase(tokens.address, '999', { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if value does not match price', async () => {
        await artFactory.purchase(tokens.address, artID, { from: buyer2, value: '1' }).should.be.rejectedWith(EVM_REVERT)
      })

      // it('rejects if price not above 0', async () => {
      //   await artFactory.purchase(tokens.address, artID, { from: buyer2, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      // })

      it('rejects if buyer is seller', async () => {
        await artFactory.purchase(tokens.address, artID, { from: buyer1, value: TOTAL_PURCHASE_PRICE }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('withdrawBalance', () => {
    let result
    const artID = '1'
    const orderID = '0'

    beforeEach(async() => {
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
      await artFactory.acceptOrder(orderID, { from: artist })
      await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.withdrawBalance({ from: artist })
      })

      it('tracks withdraw', async () => {

        // const sellerBalance = await artFactory.balances(buyer1)
        // sellerBalance.toString().should.equal(SALE_PRICE.toString(), 'seller balance is correct')
        // const artistBalance = await artFactory.balances(artist)
      })
      
      // it('emits Withdraw event', async () => {
      //   expectEvent(result, 'Withdraw', { id: artID, price: SALE_PRICE.toString(), buyer: buyer2, gen: GEN_1.toString(), tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      // })
    })
  
    describe('failure', () => {
      it('rejects if balance less than 0', async () => {
        await artFactory.withdrawBalance({ from: buyer2 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})