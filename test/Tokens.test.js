const {
  EVM_REVERT,
  TOKENS_NAME,
  TOKENS_SYMBOL
} = require('./helpers');

const Tokens = artifacts.require('./src.contracts/Tokens.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Tokens', ([owner, marketplace]) => {
  let tokens

  beforeEach(async () => {
    tokens = await Tokens.new(TOKENS_NAME, TOKENS_SYMBOL)
  })

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await tokens.address
      address.should.not.equal(0x0, 'address does not equal 0x0')
      address.should.not.equal('', 'address does not equal ""')
      address.should.not.equal(null, 'address does not equal null')
      address.should.not.equal(undefined, 'address does not equal undefined')
    })
  })

  it('tracks the name', async () => {
    const name = await tokens.name()
    name.toString().should.equal(TOKENS_NAME, 'name is correct')
  })

  it('tracks the symbol', async () => {
    const symbol = await tokens.symbol()
    symbol.toString().should.equal(TOKENS_SYMBOL, 'symbol is correct')
  })

  it('tracks marketplace address change', async () => {
    await tokens.setMarketplaceAddress(marketplace, { from: owner })
    const marketplaceAddress = await tokens.marketplaceAddress()
    marketplaceAddress.toString().should.equal(marketplace.toString(), 'marketplace address update is correct')
  })
})