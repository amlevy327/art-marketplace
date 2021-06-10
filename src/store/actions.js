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

export function artGen0Loaded(artGen0) {
  return {
    type: 'ART_GEN_0_LOADED',
    artGen0
  }
}

export function artFromOrderLoaded(artFromOrder) {
  return {
    type: 'ART_FROM_ORDER_LOADED',
    artFromOrder
  }
}

export function purchasesLoaded(purchases) {
  return {
    type: 'PURCHASES_LOADED',
    purchases
  }
}

export function allOrdersLoaded(allOrders) {
  return {
    type: 'ALL_ORDERS_LOADED',
    allOrders
  }
}

export function cancelledOrdersLoaded(cancelledOrders) {
  return {
    type: 'CANCELLED_ORDERS_LOADED',
    cancelledOrders
  }
}

export function acceptedOrdersLoaded(acceptedOrders) {
  return {
    type: 'ACCEPTED_ORDERS_LOADED',
    acceptedOrders
  }
}