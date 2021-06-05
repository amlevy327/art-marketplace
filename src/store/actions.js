// web3

export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

// tokens

export function tokensLoaded(contract) {
  return {
    type: 'TOKENS_LOADED',
    contract
  }
}

// art factory

export function artFactoryLoaded(contract) {
  return {
    type: 'ART_FACTORY_LOADED',
    contract
  }
}