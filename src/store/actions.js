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

export function contractFeeAccountLoaded(contractFeeAccount) {
  return {
    type: 'CONTRACT_FEE_ACCOUNT_LOADED',
    contractFeeAccount
  }
}

export function contractFeePercentageLoaded(contractFeePercentage) {
  return {
    type: 'CONTRACT_FEE_PERCENTAGE_LOADED',
    contractFeePercentage
  }
}

// artist fee account

export function artistFeeAccountLoaded(artistFeeAccount) {
  return {
    type: 'ARTIST_FEE_ACCOUNT_LOADED',
    artistFeeAccount
  }
}

export function artistFeeAccountChanged(artistFeeAccount) {
  return {
    type: 'ARTIST_FEE_ACCOUNT_CHANGED',
    artistFeeAccount
  }
}

export function artistFeeAccountUpdating() {
  return {
    type: 'ARTIST_FEE_ACCOUNT_UPDATING'
  }
}

export function artistFeeAccountUpdated(artistFeeAccount) {
  return {
    type: 'ARTIST_FEE_ACCOUNT_UPDATED',
    artistFeeAccount
  }
}

// artist fee percentage

export function artistFeePercentageLoaded(artistFeePercentage) {
  return {
    type: 'ARTIST_FEE_PERCENTAGE_LOADED',
    artistFeePercentage
  }
}

export function artistFeePercentageChanged(artistFeePercentage) {
  return {
    type: 'ARTIST_FEE_PERCENTAGE_CHANGED',
    artistFeePercentage
  }
}

export function artistFeePercentageUpdating() {
  return {
    type: 'ARTIST_FEE_PERCENTAGE_UPDATING'
  }
}

export function artistFeePercentageUpdated(artistFeePercentage) {
  return {
    type: 'ARTIST_FEE_PERCENTAGE_UPDATED',
    artistFeePercentage
  }
}

// base art price

export function baseArtPriceLoaded(baseArtPrice) {
  return {
    type: 'BASE_ART_PRICE_LOADED',
    baseArtPrice
  }
}

export function baseArtPriceChanged(baseArtPrice) {
  return {
    type: 'BASE_ART_PRICE_CHANGED',
    baseArtPrice
  }
}

export function baseArtPriceUpdating() {
  return {
    type: 'BASE_ART_PRICE_UPDATING'
  }
}

export function baseArtPriceUpdated(baseArtPrice) {
  return {
    type: 'BASE_ART_PRICE_UPDATED',
    baseArtPrice
  }
}

// parent multiplier percentage

export function parentMultiplierPercentageLoaded(parentMultiplierPercentage) {
  return {
    type: 'PARENT_MULTIPLIER_PERCENTAGE_LOADED',
    parentMultiplierPercentage
  }
}

export function parentMultiplierPercentageChanged(parentMultiplierPercentage) {
  return {
    type: 'PARENT_MULTIPLIER_PERCENTAGE_CHANGED',
    parentMultiplierPercentage
  }
}

export function parentMultiplierPercentageUpdating() {
  return {
    type: 'PARENT_MULTIPLIER_PERCENTAGE_UPDATING'
  }
}

export function parentMultiplierPercentageUpdated(parentMultiplierPercentage) {
  return {
    type: 'PARENT_MULTIPLIER_PERCENTAGE_UPDATED',
    parentMultiplierPercentage
  }
}

// min parents

export function minParentsLoaded(minParents) {
  return {
    type: 'MIN_PARENTS_LOADED',
    minParents
  }
}

export function minParentsChanged(minParents) {
  return {
    type: 'MIN_PARENTS_CHANGED',
    minParents
  }
}

export function minParentsUpdating() {
  return {
    type: 'MIN_PARENTS_UPDATING'
  }
}

export function minParentsUpdated(minParents) {
  return {
    type: 'MIN_PARENTS_UPDATED',
    minParents
  }
}

// max parents

export function maxParentsLoaded(maxParents) {
  return {
    type: 'MAX_PARENTS_LOADED',
    maxParents
  }
}

export function maxParentsChanged(maxParents) {
  return {
    type: 'MAX_PARENTS_CHANGED',
    maxParents
  }
}

export function maxParentsUpdating() {
  return {
    type: 'MAX_PARENTS_UPDATING'
  }
}

export function maxParentsUpdated(maxParents) {
  return {
    type: 'MAX_PARENTS_UPDATED',
    maxParents
  }
}

// min legacies

export function minLegaciesLoaded(minLegacies) {
  return {
    type: 'MIN_LEGACIES_LOADED',
    minLegacies
  }
}

export function minLegaciesChanged(minLegacies) {
  return {
    type: 'MIN_LEGACIES_CHANGED',
    minLegacies
  }
}

export function minLegaciesUpdating() {
  return {
    type: 'MIN_LEGACIES_UPDATING'
  }
}

export function minLegaciesUpdated(minLegacies) {
  return {
    type: 'MIN_LEGACIES_UPDATED',
    minLegacies
  }
}

// max legacies

export function maxLegaciesLoaded(maxLegacies) {
  return {
    type: 'MAX_LEGACIES_LOADED',
    maxLegacies
  }
}

export function maxLegaciesChanged(maxLegacies) {
  return {
    type: 'MAX_LEGACIES_CHANGED',
    maxLegacies
  }
}

export function maxLegaciesUpdating() {
  return {
    type: 'MAX_LEGACIES_UPDATING'
  }
}

export function maxLegaciesUpdated(maxLegacies) {
  return {
    type: 'MAX_LEGACIES_UPDATED',
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

// sale & purchases

export function purchasesLoaded(purchases) {
  return {
    type: 'PURCHASES_LOADED',
    purchases
  }
}

export function artForSaleLoaded(artForSale) {
  return {
    type: 'ART_FOR_SALE_LOADED',
    artForSale
  }
}

export function salesCancelledLoaded(salesCancelled) {
  return {
    type: 'SALES_CANCELLED_LOADED',
    salesCancelled
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