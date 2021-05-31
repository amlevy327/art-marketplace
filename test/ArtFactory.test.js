const { EVM_REVERT } = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art', ([owner, artist, artistNew, ownerNew]) => {
  let artFactory
  const contractFee = 1
  const artistFee = 1
  
  beforeEach(async () => {
    artFactory = await ArtFactory.new(artist, artistFee)
  })

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await artFactory.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('it tracks the artist fee account', async () => {
      const artistFeeAccount = await artFactory.artistFeeAccount()
      assert.equal(artist.toString(), artistFeeAccount.toString())
    })

    it('it tracks the artist fee', async () => {
      const artistFee = await artFactory.artistFee()
      assert.equal(artistFee.toString(), artistFee.toString())
    })

    it('it tracks the contract fee', async () => {
      const contractFee = await artFactory.contractFee()
      assert.equal(contractFee.toString(), '1')
    })

    it('it tracks the critter count', async () => {
      const critterCount = await artFactory.critterCount()
      assert.equal(critterCount.toString(), '0')
    })
  })

  describe('new art fee account', () => {
    describe('success', () => {
      it('tracks account assignment by artist', async () => {
        const result = await artFactory.changeArtistFeeAccount(artistNew, { from: artist })
        const artistFeeAccount = await artFactory.artistFeeAccount()
        assert.equal(artistFeeAccount.toString(), artistNew.toString())
      })
    })
    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeArtistFeeAccount(artistNew, { from: owner }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('new contract fee account', () => {
    describe('success', () => {
      it('tracks account assignment', async () => {
        const result = await artFactory.changeContractFeeAccount(ownerNew, { from: owner })
        const contractFeeAccount = await artFactory.contractFeeAccount()
        assert.equal(contractFeeAccount.toString(), ownerNew.toString())
      })
    })
    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeContractFeeAccount(ownerNew, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('new artwork - no proposal', () => {
    const gen = '1'
    const dna = '1234'
    const tokenURI = 'asdf'
    const name = 'Drew'

    describe('success', () => {
      let result

      beforeEach(async () => {
        result = await artFactory.createArtwork(gen, dna, tokenURI, name, { from: artist })
      })

      it('tracks new critter', async () => {
        const critterCount = await artFactory.critterCount()
        const critter = await artFactory.critters(0)

        critterCount.toString().should.equal('1', 'critter count correct')
        critter.id.toString().should.equal('0', 'id is correct')
        critter.owner.toString().should.equal(artist, 'owner is correct')
        critter.gen.toString().should.equal(gen, 'gen is correct')
        critter.dna.toString().should.equal(dna, 'dna is correct')
        critter.tokenURI.toString().should.equal(tokenURI, 'tokenURI is correct')
        critter.name.toString().should.equal(name, 'name is correct')
        critter.legacyCreated.should.equal(false, 'legacyCreated is correct')
      })

      it('emits a New Artwork event', async () => {
        expectEvent(result, 'Artwork', { id: '0', owner: artist, gen: gen, dna: dna, tokenURI: tokenURI, name: name })
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.createArtwork(gen, dna, name, tokenURI, { from: owner }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})