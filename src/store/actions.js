// WEB3

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

// TOKENS

// contract

export function tokensLoaded(contract) {
  return {
    type: 'TOKENS_LOADED',
    contract
  }
}

// ART FACTORY

// contract

export function artFactoryLoaded(contract) {
  return {
    type: 'ART_FACTORY_LOADED',
    contract
  }
}

// settings

export function contractFeePercentageLoaded(contractFeePercentage) {
  return {
    type: 'CONTRACT_FEE_PERCENTAGE_LOADED',
    contractFeePercentage
  }
}

export function artistFeePercentageLoaded(artistFeePercentage) {
  return {
    type: 'ARTIST_FEE_PERCENTAGE_LOADED',
    artistFeePercentage
  }
}

export function baseArtPriceLoaded(baseArtPrice) {
  return {
    type: 'BASE_ART_PRICE_LOADED',
    baseArtPrice
  }
}

export function parentMultiplierPercentageLoaded(parentMultiplierPercentage) {
  return {
    type: 'PARENT_MULTIPLIER_PERCENTAGE_LOADED',
    parentMultiplierPercentage
  }
}

export function minParentsLoaded(minParents) {
  return {
    type: 'MIN_PARENTS_LOADED',
    minParents
  }
}

export function maxParentsLoaded(maxParents) {
  return {
    type: 'MAX_PARENTS_LOADED',
    maxParents
  }
}

export function minLegaciesLoaded(minLegacies) {
  return {
    type: 'MIN_LEGACIES_LOADED',
    minLegacies
  }
}

export function maxLegaciesLoaded(maxLegacies) {
  return {
    type: 'MAX_LEGACIES_LOADED',
    maxLegacies
  }
}

// art

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

// purchases

export function purchasesLoaded(purchases) {
  return {
    type: 'PURCHASES_LOADED',
    purchases
  }
}

// orders

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

export function orderCancelling() {
  return {
    type: 'ORDER_CANCELLING'
  }
}

export function orderCancelled(order) {
  return {
    type: 'ORDER_CANCELLED',
    order
  }
}

export function artForSaleLoaded(artForSale) {
  return {
    type: 'ART_FOR_SALE_LOADED',
    artForSale
  }
}