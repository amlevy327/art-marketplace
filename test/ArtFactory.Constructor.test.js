const {
  EVM_REVERT,
  CONTRACT_FEE_PERCENTAGE,
  ARTIST_FEE_PERCENTAGE,
  BASE_ART_PRICE,
  MIN_PARENTS,
  MAX_PARENTS,
  MIN_LEGACIES,
  MAX_LEGACIES,
  PARENT_MULTIPLIER_PERCENTAGE,
  TOKENS_NAME,
  TOKENS_SYMBOL
} = require('./helpers');

const Tokens = artifacts.require('./src.contracts/Tokens.sol')
const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - constructor', ([owner, artist]) => {
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
  })

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await artFactory.address
      address.should.not.equal(0x0, 'address does not equal 0x0')
      address.should.not.equal('', 'address does not equal ""')
      address.should.not.equal(null, 'address does not equal null')
      address.should.not.equal(undefined, 'address does not equal undefined')
    })

    it('tracks the artwork count', async () => {
      const critterCount = await artFactory.artworkCount()
      critterCount.toString().should.equal('0', 'artwork count is correct')
    })

    it('tracks the order count', async () => {
      const orderCount = await artFactory.orderCount()
      orderCount.toString().should.equal('0', 'critter count is correct')
    })

    it('tracks the contract fee percentage', async () => {
      const contractFeePercentage = await artFactory.contractFeePercentage()
      contractFeePercentage.toString().should.equal(CONTRACT_FEE_PERCENTAGE.toString(), 'contract fee percentage is correct')
    })

    it('tracks contract fee account', async () => {
      const contractFeeAccount = await artFactory.contractFeeAccount()
      contractFeeAccount.toString().should.equal(owner.toString(), 'contract fee account is correct')
    })

    it('tracks the artist fee account', async () => {
      const artistFeeAccount = await artFactory.artistFeeAccount()
      artistFeeAccount.toString().should.equal(artist.toString(), 'artist fee account is correct')
    })

    it('tracks the artist fee percentage', async () => {
      const artistFeePercentage = await artFactory.artistFeePercentage()
      artistFeePercentage.toString().should.equal(ARTIST_FEE_PERCENTAGE.toString(), 'artist fee percentage is correct')
    })

    it('tracks the base art price', async () => {
      const baseArtPrice = await artFactory.baseArtPrice()
      baseArtPrice.toString().should.equal(BASE_ART_PRICE.toString(), 'base art price is correct')
    })

    it('tracks the parent percentage multiplier', async () => {
      const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
      parentMultiplierPercentage.toString().should.equal(PARENT_MULTIPLIER_PERCENTAGE.toString(), 'parent percentage multiplier is correct')
    })

    it('tracks the min parents', async () => {
      const minParents = await artFactory.minParents()
      minParents.toString().should.equal(MIN_PARENTS.toString(), 'min parents is correct')
    })

    it('tracks the max parents', async () => {
      const maxParents = await artFactory.maxParents()
      maxParents.toString().should.equal(MAX_PARENTS.toString(), 'max parents is correct')
    })

    it('tracks the min legacies', async () => {
      const minLegacies = await artFactory.minLegacies()
      minLegacies.toString().should.equal(MIN_LEGACIES.toString(), 'min legacies is correct')
    })

    it('tracks the max legacies', async () => {
      const maxLegacies = await artFactory.maxLegacies()
      maxLegacies.toString().should.equal(MAX_LEGACIES.toString(), 'max legacies is correct')
    })
  })

  describe('marketplace approval', () => {
    it('approves successfully', async () => {
      await tokens.approveMarketplace(artFactory.address, true, { from: artist })
      const result = await tokens.isApprovedForAll(artist, artFactory.address)
      result.should.equal(true, 'marketplace approval is correct')
    })
  })  
})