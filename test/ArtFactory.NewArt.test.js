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
  GEN_1,
  TOKENS_NAME,
  TOKENS_SYMBOL,
  ORDER_PRICE
} = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const Tokens = artifacts.require('./src.contracts/Tokens.sol')
const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - new art', ([owner, artist, buyer1]) => {
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

  describe('gen 0', () => {
    let result
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      })
  
      it('tracks new art gen 0 by artist', async () => {
        const artworkCount = await artFactory.artworkCount()
        artworkCount.toString().should.equal('1', 'artwork count is correct')
  
        const art = await artFactory.artworks('0')
        art.id.toString().should.equal('0', 'id is correct')
        art.owner.toString().should.equal(artist.toString(), 'owner is correct')
        art.gen.toString().should.equal('0', 'gen is correct')
        art.tokenURI.toString().should.equal(TOKEN_URI.toString(), 'tokenURI is correct')
        art.name.toString().should.equal(NAME.toString(), 'name is correct')
        art.legacyCreated.should.equal(false, 'legacyCreated is correct')
        //TODO: art.parents.should.equal([], 'parents is correct')
        //TODO: art.siblings.should.equal([], 'siblings is correct')
        art.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
  
        const price = await artFactory.prices('0')
        price.toString().should.equal(BASE_ART_PRICE.toString(), 'prices mapping is correct')
      })

      it('tracks ERC721', async () => {
        const balanceOf = await tokens.balanceOf(artist)
        balanceOf.toString().should.equal('1', 'balanceOf is correct')

        const ownerOf = await tokens.ownerOf('0')
        ownerOf.toString().should.equal(artist.toString(), 'ownerOf is correct')

        const tokenURI = await tokens.tokenURI('0')
        tokenURI.toString().should.equal(TOKEN_URI.toString(), 'tokenURI is correct')
      })
      
      it('emits ArtGen0 event', async () => {
        expectEvent(result, 'ArtGen0', { id: '0', owner: artist, gen: '0', tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('from order', () => {
    let result
    const orderID = '0'
    const artID = '1'

    beforeEach(async() => {
      await artFactory.createArtGen0(tokens.address, TOKEN_URI, NAME, { from: artist })
      await artFactory.createOrder(PARENT_IDS, NUM_LEGACIES, { from: artist, value: TOTAL_PRICE })
    })
  
    describe('success', () => {
      beforeEach(async() => {
        await artFactory.acceptOrder(orderID, { from: artist })
        result = await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, GEN_1, [0], [], buyer1, { from: artist })
      })
  
      it('tracks new art from order by artist', async () => {
        const orderCount = await artFactory.orderCount()
        orderCount.toString().should.equal('1', 'order count is correct')

        const artworkCount = await artFactory.artworkCount()
        artworkCount.toString().should.equal('2', 'artwork count is correct')
  
        const art = await artFactory.artworks(artID)
        art.id.toString().should.equal(artID.toString(), 'id is correct')
        art.owner.toString().should.equal(buyer1.toString(), 'owner is correct')
        art.gen.toString().should.equal(GEN_1.toString(), 'gen is correct')
        art.tokenURI.toString().should.equal(TOKEN_URI.toString(), 'tokenURI is correct')
        art.name.toString().should.equal(NAME.toString(), 'name is correct')
        art.legacyCreated.should.equal(false, 'legacyCreated is correct')
        //TODO: art.parents.should.equal([0], 'parents is correct')
        //TODO: art.siblings.should.equal([], 'siblings is correct')
        art.timestamp.toString().length.should.be.at.least(1, 'timestamp is correct')
  
        const price = await artFactory.prices('1')
        price.toString().should.equal('0', 'prices mapping is correct')

        const filledOrder = await artFactory.filledOrders(orderID)
        filledOrder.should.equal(true, 'filled orders mapping is correct')

        const parent = await artFactory.artworks('0')
        parent.legacyCreated.should.equal(true, 'parent legacy created is true')
      })

      it('tracks balance transfers', async () => {
        const balanceArtist = await artFactory.balances(artist)
        balanceArtist.toString().should.equal(ORDER_PRICE.toString(), 'artist balance is correct')

        const balanceContract = await artFactory.balances(artFactory.address)
        balanceContract.toString().should.equal('0', 'contract balance is correct')
      })

      it('tracks ERC721', async () => {
        const balanceOf = await tokens.balanceOf(buyer1)
        balanceOf.toString().should.equal(artID.toString(), 'balanceOf is correct')

        const ownerOf = await tokens.ownerOf(artID)
        ownerOf.toString().should.equal(buyer1.toString(), 'ownerOf is correct')

        const tokenURI = await tokens.tokenURI(artID)
        tokenURI.toString().should.equal(TOKEN_URI.toString(), 'tokenURI is correct')
      })
      
      it('emits ArtFromOrder event', async () => {
        // TODO: expectEvent(result, 'ArtFromOrder', { id: '1', owner: artist, gen: '1', tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })

    describe('failure', () => {
      it('rejects incorrect orderID', async () => {
        await artFactory.acceptOrder(orderID, { from: artist })
        await artFactory.createArtFromOrder(tokens.address, '999', TOKEN_URI, NAME, '1', [0], [], buyer1, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        await artFactory.acceptOrder(orderID, { from: artist })
        await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, '1', [0], [], buyer1, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if not accepted', async () => {
        await artFactory.createArtFromOrder(tokens.address, orderID, TOKEN_URI, NAME, '1', [0], [], buyer1, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})