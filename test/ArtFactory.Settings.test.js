const {
  EVM_REVERT,
  ARTIST_FEE_PERCENTAGE,
  BASE_ART_PRICE,
  MIN_PARENTS,
  MAX_PARENTS,
  MIN_LEGACIES,
  MAX_LEGACIES,
  PARENT_MULTIPLIER_PERCENTAGE,
  ARTIST_FEE_PERCENTAGE_NEW,
  ARTIST_FEE_PERCENTAGE_LOW,
  ARTIST_FEE_PERCENTAGE_HIGH
} = require('./helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art - settings', ([owner, artist, ownerNew, artistNew, buyer1]) => {
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

  describe('change contract fee account', () => {
    describe('success', () => {
      it('tracks new account assignment by owner', async () => {
        const result = await artFactory.changeContractFeeAccount(ownerNew, { from: owner })
        const contractFeeAccount = await artFactory.contractFeeAccount()
        contractFeeAccount.toString().should.equal(ownerNew.toString(), 'new contract fee account is correct')
      })
    })

    describe('failure', () => {
      it('rejects non owner sender', async () => {
        await artFactory.changeContractFeeAccount(ownerNew, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change artist fee account', () => {
    describe('success', () => {
      it('tracks new account assignment by artist', async () => {
        const result = await artFactory.changeArtistFeeAccount(artistNew, { from: artist })
        const artistFeeAccount = await artFactory.artistFeeAccount()
        artistFeeAccount.toString().should.equal(artistNew.toString(), 'new artist fee account is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeArtistFeeAccount(artistNew, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change artist fee percentage', () => {
    let _artistFeePercentage

    describe('success', () => {
      it('tracks new fee percentage by artist', async () => {
        _artistFeePercentage = ARTIST_FEE_PERCENTAGE_NEW
        const result = await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist })
        const artistFeePercentage = await artFactory.artistFeePercentage()
        artistFeePercentage.toString().should.equal(_artistFeePercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects fee percentage less than 1', async () => {
        _artistFeePercentage = _artistFeePercentage = ARTIST_FEE_PERCENTAGE_LOW
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects fee percentage more than 99', async () => {
        _artistFeePercentage = ARTIST_FEE_PERCENTAGE_HIGH
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })
      
      it('rejects non artist sender', async () => {
        _artistFeePercentage = ARTIST_FEE_PERCENTAGE_NEW
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})