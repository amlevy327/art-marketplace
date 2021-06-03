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
  NAME
} = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - new art', ([owner, artist, buyer1]) => {
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

  describe('gen 0', () => {
    let result
  
    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(TOKEN_URI, NAME, { from: artist })
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
  
        const price = await artFactory.prices('0')
        price.toString().should.equal(BASE_ART_PRICE.toString(), 'prices mapping is correct')
      })
      
      it('emits ArtGen0 event', async () => {
        expectEvent(result, 'ArtGen0', { id: '0', owner: artist, gen: '0', tokenURI: TOKEN_URI, name: NAME, legacyCreated: false, parents: [], siblings: [] })
      })
    })
  
    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.createArtGen0(TOKEN_URI, NAME, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})