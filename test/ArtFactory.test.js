const { EVM_REVERT } = require('./helpers');
const { expectEvent, BN } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art', ([owner, artist, ownerNew, artistNew, buyer1, buyer2, buyer3]) => {
  let artFactory
  const artistFeePercentageC = 5
  const baseArtPriceC = 1
  const parentMultiplierPercentageC = 20
  const minParentsC = 2
  const maxParentsC = 4
  const minLegaciesC = 1
  const maxLegaciesC = 4
  
  beforeEach(async () => {
    artFactory = await ArtFactory.new(
      artist,
      artistFeePercentageC,
      baseArtPriceC,
      parentMultiplierPercentageC,
      minParentsC,
      maxParentsC,
      minLegaciesC,
      maxLegaciesC,
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

    it('it tracks the critter count', async () => {
      const critterCount = await artFactory.critterCount()
      critterCount.toString().should.equal('0', 'critter count is correct')
    })

    it('it tracks the order count', async () => {
      const orderCount = await artFactory.orderCount()
      orderCount.toString().should.equal('0', 'critter count is correct')
    })

    it('it tracks the contract fee percentage', async () => {
      const contractFeePercentage = await artFactory.contractFeePercentage()
      contractFeePercentage.toString().should.equal('1', 'contract fee percentage is correct')
    })

    it('it tracks the artist fee account', async () => {
      const artistFeeAccount = await artFactory.artistFeeAccount()
      artistFeeAccount.toString().should.equal(artist.toString(), 'artist fee account is correct')
    })

    it('it tracks the artist fee percentage', async () => {
      const artistFeePercentage = await artFactory.artistFeePercentage()
      artistFeePercentage.toString().should.equal(artistFeePercentageC.toString(), 'artist fee percentage is correct')
    })

    it('it tracks the base art price', async () => {
      const baseArtPrice = await artFactory.baseArtPrice()
      baseArtPrice.toString().should.equal(baseArtPriceC.toString(), 'base art price is correct')
    })

    it('it tracks the parent percentage multiplier', async () => {
      const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
      parentMultiplierPercentage.toString().should.equal(parentMultiplierPercentageC.toString(), 'parent percentage multiplier is correct')
    })

    it('it tracks the min parents', async () => {
      const minParents = await artFactory.minParents()
      minParents.toString().should.equal(minParentsC.toString(), 'min parents is correct')
    })

    it('it tracks the max parents', async () => {
      const maxParents = await artFactory.maxParents()
      maxParents.toString().should.equal(maxParentsC.toString(), 'max parents is correct')
    })

    it('it tracks the min legacies', async () => {
      const minLegacies = await artFactory.minLegacies()
      minLegacies.toString().should.equal(minLegaciesC.toString(), 'min legacies is correct')
    })

    it('it tracks the max legacies', async () => {
      const maxLegacies = await artFactory.maxLegacies()
      maxLegacies.toString().should.equal(maxLegaciesC.toString(), 'max legacies is correct')
    })
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
    const newArtistFeePercentage = '10'
    describe('success', () => {
      it('tracks new fee percentage by artist', async () => {
        const result = await artFactory.changeArtistFeePercentage(newArtistFeePercentage, { from: artist })
        const artistFeePercentage = await artFactory.artistFeePercentage()
        artistFeePercentage.toString().should.equal(newArtistFeePercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeArtistFeePercentage(newArtistFeePercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change base art price', () => {
    const newBaseArtPrice = '5'
    describe('success', () => {
      it('tracks new base art price by artist', async () => {
        const result = await artFactory.changeBaseArtPrice(newBaseArtPrice, { from: artist })
        const baseArtPrice = await artFactory.baseArtPrice()
        baseArtPrice.toString().should.equal(newBaseArtPrice.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeBaseArtPrice(newBaseArtPrice, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change parent multiplier percentage', () => {
    const newParentMultiplierPercentage = '50'
    describe('success', () => {
      it('tracks new parent multiplier percentage by artist', async () => {
        const result = await artFactory.changeParentMultiplierPercentage(newParentMultiplierPercentage, { from: artist })
        const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
        parentMultiplierPercentage.toString().should.equal(newParentMultiplierPercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeParentMultiplierPercentage(newParentMultiplierPercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change min parents', () => {
    const newMinParents = '10'
    describe('success', () => {
      it('tracks new min parents by artist', async () => {
        const result = await artFactory.changeMinParents(newMinParents, { from: artist })
        const minParents = await artFactory.minParents()
        minParents.toString().should.equal(newMinParents.toString(), 'new min parents is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeMinParents(newMinParents, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change max parents', () => {
    const newMaxParents = '20'
    describe('success', () => {
      it('tracks new max parents by artist', async () => {
        const result = await artFactory.changeMaxParents(newMaxParents, { from: artist })
        const maxParents = await artFactory.maxParents()
        maxParents.toString().should.equal(newMaxParents.toString(), 'new max parents is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeMaxParents(newMaxParents, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change min legacies', () => {
    const newMinLegacies = '10'
    describe('success', () => {
      it('tracks new min legacies by artist', async () => {
        const result = await artFactory.changeMinLegacies(newMinLegacies, { from: artist })
        const minLegacies = await artFactory.minLegacies()
        minLegacies.toString().should.equal(newMinLegacies.toString(), 'new min legacies is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeMinParents(newMinLegacies, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change max legacies', () => {
    const newMaxLegacies = '20'
    describe('success', () => {
      it('tracks new max legacies by artist', async () => {
        const result = await artFactory.changeMaxLegacies(newMaxLegacies, { from: artist })
        const maxLegacies = await artFactory.maxLegacies()
        maxLegacies.toString().should.equal(newMaxLegacies.toString(), 'new max legacies is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeMaxParents(newMaxLegacies, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  // describe('new art', () => {
  //   const gen = '1'
  //   const dna = '1234'
  //   const tokenURI = 'asdf'
  //   const name = 'Drew'

  //   describe('success', () => {
  //     let result

  //     beforeEach(async () => {
  //       result = await artFactory.createArt(gen, dna, tokenURI, name, { from: artist })
  //     })

  //     it('tracks new critter', async () => {
  //       const critterCount = await artFactory.critterCount()
  //       critterCount.toString().should.equal('1', 'critter count correct')
        
  //       const critter = await artFactory.critters(0)
  //       critter.id.toString().should.equal('0', 'id is correct')
  //       critter.owner.toString().should.equal(artist, 'owner is correct')
  //       critter.gen.toString().should.equal(gen, 'gen is correct')
  //       critter.dna.toString().should.equal(dna, 'dna is correct')
  //       critter.tokenURI.toString().should.equal(tokenURI, 'tokenURI is correct')
  //       critter.name.toString().should.equal(name, 'name is correct')
  //       critter.legacyCreated.should.equal(false, 'legacyCreated is correct')
  //     })

  //     it('emits a Artwork event', async () => {
  //       expectEvent(result, 'Art', { id: '0', owner: artist, gen: gen, dna: dna, tokenURI: tokenURI, name: name })
  //     })
  //   })

  //   describe('failure', () => {
  //     it('rejects non artist sender', async () => {
  //       await artFactory.createArt(gen, dna, name, tokenURI, { from: owner }).should.be.rejectedWith(EVM_REVERT)
  //     })
  //   })
  // })
})