const { EVM_REVERT } = require('./helpers');
const { expectEvent } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art', ([owner, artist, artistNew]) => {
  let artContract
  const contractFee = 1
  const artistFee = 1
  
  beforeEach(async () => {
    artContract = await ArtFactory.new(artist, artistFee)
  })

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await artContract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('it tracks the artist fee account', async () => {
      const artistFeeAccount = await artContract.artistFeeAccount()
      assert.equal(artist.toString(), artistFeeAccount.toString())
    })

    it('it tracks the artist fee', async () => {
      const artistFee = await artContract.artistFee()
      assert.equal(artistFee.toString(), artistFee.toString())
    })

    it('it tracks the contract fee', async () => {
      const contractFee = await artContract.contractFee()
      assert.equal(contractFee.toString(), '1')
    })

    it('it tracks the critter count', async () => {
      const critterCount = await artContract.critterCount()
      assert.equal(critterCount.toString(), '0')
    })
  })

  describe('new art fee account', () => {
    describe('success', () => {
      it('tracks account assignment', async () => {
        const result = await artContract.changeArtistFeeAccount(artistNew, { from: artist })
        const artistFeeAccount = await artContract.artistFeeAccount()
        assert.equal(artistFeeAccount.toString(), artistNew.toString())
      })
    })
    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artContract.changeArtistFeeAccount(artistNew, { from: owner }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  // describe('new artwork', () => {
  //   it('', async () => {
  //   })
  // })
})