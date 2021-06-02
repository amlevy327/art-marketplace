const { EVM_REVERT } = require('./helpers');
const { expectEvent, BN } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art', ([owner, artist, ownerNew, artistNew, buyer1]) => {
  let artFactory
  const _artistFeePercentage = 5
  const _baseArtPrice = 1
  const _parentMultiplierPercentage = 20
  const _minParents = 2
  const _maxParents = 4
  const _minLegacies = 1
  const _maxLegacies = 4
  
  beforeEach(async () => {
    artFactory = await ArtFactory.new(
      artist,
      _artistFeePercentage,
      _baseArtPrice,
      _parentMultiplierPercentage,
      _minParents,
      _maxParents,
      _minLegacies,
      _maxLegacies,
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

    it('it tracks the artwork count', async () => {
      const critterCount = await artFactory.artworkCount()
      critterCount.toString().should.equal('0', 'artwork count is correct')
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
      artistFeePercentage.toString().should.equal(_artistFeePercentage.toString(), 'artist fee percentage is correct')
    })

    it('it tracks the base art price', async () => {
      const baseArtPrice = await artFactory.baseArtPrice()
      baseArtPrice.toString().should.equal(_baseArtPrice.toString(), 'base art price is correct')
    })

    it('it tracks the parent percentage multiplier', async () => {
      const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
      parentMultiplierPercentage.toString().should.equal(_parentMultiplierPercentage.toString(), 'parent percentage multiplier is correct')
    })

    it('it tracks the min parents', async () => {
      const minParents = await artFactory.minParents()
      minParents.toString().should.equal(_minParents.toString(), 'min parents is correct')
    })

    it('it tracks the max parents', async () => {
      const maxParents = await artFactory.maxParents()
      maxParents.toString().should.equal(_maxParents.toString(), 'max parents is correct')
    })

    it('it tracks the min legacies', async () => {
      const minLegacies = await artFactory.minLegacies()
      minLegacies.toString().should.equal(_minLegacies.toString(), 'min legacies is correct')
    })

    it('it tracks the max legacies', async () => {
      const maxLegacies = await artFactory.maxLegacies()
      maxLegacies.toString().should.equal(_maxLegacies.toString(), 'max legacies is correct')
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
    const _artistFeePercentage = '10'
    describe('success', () => {
      it('tracks new fee percentage by artist', async () => {
        const result = await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist })
        const artistFeePercentage = await artFactory.artistFeePercentage()
        artistFeePercentage.toString().should.equal(_artistFeePercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change base art price', () => {
    const _baseArtPrice = '5'
    describe('success', () => {
      it('tracks new base art price by artist', async () => {
        const result = await artFactory.changeBaseArtPrice(_baseArtPrice, { from: artist })
        const baseArtPrice = await artFactory.baseArtPrice()
        baseArtPrice.toString().should.equal(_baseArtPrice.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeBaseArtPrice(_baseArtPrice, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change parent multiplier percentage', () => {
    const _parentMultiplierPercentage = '50'
    describe('success', () => {
      it('tracks new parent multiplier percentage by artist', async () => {
        const result = await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: artist })
        const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
        parentMultiplierPercentage.toString().should.equal(_parentMultiplierPercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
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

  describe('new art gen 0', () => {
    let result
    const _tokenURI = 'abcd'
    const _name = 'Andrew'

    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(_tokenURI, _name, { from: artist })
      })

      it('tracks new art gen 0 by artist', async () => {
        const artworkCount = await artFactory.artworkCount()
        artworkCount.toString().should.equal('1', 'artwork count is correct')

        const art = await artFactory.artworks('0')
        art.id.toString().should.equal('0', 'id is correct')
        art.owner.toString().should.equal(artist.toString(), 'owner is correct')
        art.gen.toString().should.equal('0', 'gen is correct')
        art.tokenURI.toString().should.equal(_tokenURI.toString(), 'tokenURI is correct')
        art.name.toString().should.equal(_name.toString(), 'name is correct')
        art.legacyCreated.should.equal(false, 'legacyCreated is correct')
        //TODO: art.parents['0'].should.equal([], 'parents is correct')
        //TODO: art.siblings.should.equal([], 'siblings is correct')

        const price = await artFactory.prices('0')
        price.toString().should.equal(_baseArtPrice.toString(), 'prices mapping is correct')
      })
      
      it('emits ArtGen0 event', async () => {
        expectEvent(result, 'ArtGen0', { id: '0', owner: artist, gen: '0', tokenURI: _tokenURI, name: _name, legacyCreated: false, parents: [], siblings: [] })
      })
    })

    describe('failure', () => {
      it('rejects non artist sender', async () => {
        await artFactory.createArtGen0(_tokenURI, _name, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
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