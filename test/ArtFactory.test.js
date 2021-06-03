const { EVM_REVERT } = require('./helpers');
const { expectEvent, BN } = require('@openzeppelin/test-helpers');

const ArtFactory = artifacts.require('./src/contracts/ArtFactory.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Art', ([owner, artist, ownerNew, artistNew, buyer1]) => {
  let artFactory
  const _artistFeePercentage = 5
  const _baseArtPrice = 1000000000
  const _parentMultiplierPercentage = 5
  const _minParents = 1
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
      contractFeePercentage.toString().should.equal('1', 'contract fee percentage is correct')
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
      artistFeePercentage.toString().should.equal(_artistFeePercentage.toString(), 'artist fee percentage is correct')
    })

    it('tracks the base art price', async () => {
      const baseArtPrice = await artFactory.baseArtPrice()
      baseArtPrice.toString().should.equal(_baseArtPrice.toString(), 'base art price is correct')
    })

    it('tracks the parent percentage multiplier', async () => {
      const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
      parentMultiplierPercentage.toString().should.equal(_parentMultiplierPercentage.toString(), 'parent percentage multiplier is correct')
    })

    it('tracks the min parents', async () => {
      const minParents = await artFactory.minParents()
      minParents.toString().should.equal(_minParents.toString(), 'min parents is correct')
    })

    it('tracks the max parents', async () => {
      const maxParents = await artFactory.maxParents()
      maxParents.toString().should.equal(_maxParents.toString(), 'max parents is correct')
    })

    it('tracks the min legacies', async () => {
      const minLegacies = await artFactory.minLegacies()
      minLegacies.toString().should.equal(_minLegacies.toString(), 'min legacies is correct')
    })

    it('tracks the max legacies', async () => {
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
    let _artistFeePercentage
    describe('success', () => {
      it('tracks new fee percentage by artist', async () => {
        _artistFeePercentage = '10'
        const result = await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist })
        const artistFeePercentage = await artFactory.artistFeePercentage()
        artistFeePercentage.toString().should.equal(_artistFeePercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects fee percentage less than 1', async () => {
        _artistFeePercentage = 0
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects fee percentage more than 99', async () => {
        _artistFeePercentage = 1000
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })
      
      it('rejects non artist sender', async () => {
        await artFactory.changeArtistFeePercentage(_artistFeePercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change base art price', () => {
    const _baseArtPrice = '1000000000'
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
    let _parentMultiplierPercentage
    describe('success', () => {
      it('tracks new parent multiplier percentage by artist', async () => {
        _parentMultiplierPercentage = '50'
        const result = await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: artist })
        const parentMultiplierPercentage = await artFactory.parentMultiplierPercentage()
        parentMultiplierPercentage.toString().should.equal(_parentMultiplierPercentage.toString(), 'new artist fee percentage is correct')
      })
    })

    describe('failure', () => {
      it('rejects percentage less than 1', async () => {
        _parentMultiplierPercentage = 0
        await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects percentage greater than 99', async () => {
        _parentMultiplierPercentage = 1000
        await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        await artFactory.changeParentMultiplierPercentage(_parentMultiplierPercentage, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change min parents', () => {
    let newMinParents
    describe('success', () => {
      it('tracks new min parents by artist', async () => {
        newMinParents = '3'
        const result = await artFactory.changeMinParents(newMinParents, { from: artist })
        const minParents = await artFactory.minParents()
        minParents.toString().should.equal(newMinParents.toString(), 'new min parents is correct')
      })
    })

    describe('failure', () => {
      it('rejects number less than 1', async () => {
        newMinParents = '0'
        await artFactory.changeMinParents(newMinParents, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })
      
      it('rejects number greater than max', async () => {
        newMinParents = '100'
        await artFactory.changeMinParents(newMinParents, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        newMinParents = '3'
        await artFactory.changeMinParents(newMinParents, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change max parents', () => {
    let newMaxParents
    describe('success', () => {
      it('tracks new max parents by artist', async () => {
        newMaxParents = '20'
        const result = await artFactory.changeMaxParents(newMaxParents, { from: artist })
        const maxParents = await artFactory.maxParents()
        maxParents.toString().should.equal(newMaxParents.toString(), 'new max parents is correct')
      })
    })

    describe('failure', () => {
      it('rejects number less than min', async () => {
        newMaxParents = '0'
        await artFactory.changeMaxParents(newMaxParents, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        newMaxParents = '20'
        await artFactory.changeMaxParents(newMaxParents, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change min legacies', () => {
    let newMinLegacies

    describe('success', () => {
      it('tracks new min legacies by artist', async () => {
        newMinLegacies = '3'
        const result = await artFactory.changeMinLegacies(newMinLegacies, { from: artist })
        const minLegacies = await artFactory.minLegacies()
        minLegacies.toString().should.equal(newMinLegacies.toString(), 'new min legacies is correct')
      })
    })

    describe('failure', () => {
      it('rejects number less than 1', async () => {
        newMinLegacies = '0'
        await artFactory.changeMinLegacies(newMinLegacies, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects number greater than max', async () => {
        newMinLegacies = '100'
        await artFactory.changeMinLegacies(newMinLegacies, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        newMinLegacies = '3'
        await artFactory.changeMinLegacies(newMinLegacies, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })

  describe('change max legacies', () => {
    let newMaxLegacies
    describe('success', () => {
      it('tracks new max legacies by artist', async () => {
        newMaxLegacies = '20'
        const result = await artFactory.changeMaxLegacies(newMaxLegacies, { from: artist })
        const maxLegacies = await artFactory.maxLegacies()
        maxLegacies.toString().should.equal(newMaxLegacies.toString(), 'new max legacies is correct')
      })
    })

    describe('failure', () => {
      it('rejects number less than min', async () => {
        newMaxLegacies = '0'
        await artFactory.changeMaxLegacies(newMaxLegacies, { from: artist }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects non artist sender', async () => {
        newMaxLegacies = '20'
        await artFactory.changeMaxLegacies(newMaxLegacies, { from: buyer1 }).should.be.rejectedWith(EVM_REVERT)
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

  describe('new order', () => {
    let result
    let _parentIDS
    let _numLegacies
    const _tokenURI = 'abcd'
    const _name = 'Andrew'
    const cost = '1111000000'

    describe('success', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(_tokenURI, _name, { from: artist })
        _parentIDS = [0]
        _numLegacies = 2
        result = await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: cost })
      })

      it('tracks new order', async () => {
        const orderCount = await artFactory.orderCount()
        orderCount.toString().should.equal('1', 'order count is correct')

        const _orderPrice = _baseArtPrice + (_baseArtPrice * _numLegacies * _parentMultiplierPercentage * _parentIDS.length / 100)
        //console.log('calculated order price: ', _orderPrice)

        const _contractFee = _orderPrice * 1 / 100
        //console.log('calculated contract fee: ', _contractFee)

        const order = await artFactory.orders('0')
        //console.log(order)
        order.id.toString().should.equal('0', 'id is correct')
        order.price.toString().should.equal(_orderPrice.toString(), 'order price is correct')
        order.buyer.toString().should.equal(artist.toString(), 'buyer is correct')
        // TODO: order.parentIDS.toString().should.equal(_parentIDS.toString(), 'parentIDS is correct')
        order.numLegacies.toString().should.equal(_numLegacies.toString(), 'num legacies is correct')
        order.gen.toString().should.equal('1', 'gen is correct')

        const artistFeeAccountBalance = await artFactory.balances(artist)
        artistFeeAccountBalance.toString().should.equal('1100000000', 'artist fee account balance is correct')

        const contractFeeAccountBalance = await artFactory.balances(owner)
        contractFeeAccountBalance.toString().should.equal('11000000', 'contract fee account balance is correct')
      })

      it('emits Order event', async () => {
        // TODO: issue reading array
        // expectEvent(result, 'Order', { id: '0', buyer: buyer1, artPrice: 0, parentIDS: _parentIDS, numLegacies: _numLegacies, gen: '1' })
      })
    })

    describe('failure', () => {
      beforeEach(async() => {
        result = await artFactory.createArtGen0(_tokenURI, _name, { from: artist })
      })

      it('rejects num parents below min parents', async () => {
        _parentIDS = []
        _numLegacies = 2
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: cost }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects num parents above max parents', async () => {
        _parentIDS = [0,1,2,3,4,5,6,7,8,9]
        _numLegacies = 2
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: cost }).should.be.rejectedWith(EVM_REVERT)
      })
      
      it('rejects num legacies below min legacies', async () => {
        _parentIDS = [0, 1]
        _numLegacies = 0
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: cost }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects num legacies above max legacies', async () => {
        _parentIDS = [0, 1]
        _numLegacies = 100
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: cost }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if sender does not own all art', async () => {
        _parentIDS = [0, 1]
        _numLegacies = 2
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: buyer1, value: cost }).should.be.rejectedWith(EVM_REVERT)
      })

      it('rejects if message value is incorrect', async () => {
        _parentIDS = [0]
        _numLegacies = 2
        await artFactory.createOrder(_parentIDS, _numLegacies, { from: artist, value: '1' }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})