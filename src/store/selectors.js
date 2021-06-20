import { get, reject } from 'lodash'
import { createSelector } from 'reselect'

// ACCOUNT

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

// CONTRACTS

const tokens = state => get(state, 'tokens.contract')
export const tokensSelector = createSelector(tokens, t => t)

const tokensLoaded = state => get (state, 'tokens.loaded')
export const tokensLoadedSelector = createSelector(tokensLoaded, l => l)

const artFactory = state => get(state, 'artFactory.contract')
export const artFactorySelector = createSelector(artFactory, af => af)

const artFactoryLoaded = state => get(state, 'artFactory.loaded')
export const artFactoryLoadedSelector = createSelector(artFactoryLoaded, l => l)

// SETTINGS

// contract fee account

const contractFeeAccountLoaded = state => get(state, 'artFactory.contractFeeAccount.loaded', false)
export const contractFeeAccountLoadedSelector = createSelector(contractFeeAccountLoaded, l => l)

const contractFeeAccount = state => get(state, 'artFactory.contractFeeAccount.newAddress', null)
export const contractFeeAccountSelector = createSelector(contractFeeAccount, cfa => cfa)

// artist fee account

const artistFeeAccountLoaded = state => get(state, 'artFactory.artistFeeAccount.loaded', false)
export const artistFeeAccountLoadedSelector = createSelector(artistFeeAccountLoaded, l => l)

const artistFeeAccount = state => get(state, 'artFactory.artistFeeAccount.account', null)
export const artistFeeAccountSelector = createSelector(artistFeeAccount, afa => afa)

const updatedArtistFeeAccount = state => get(state, 'artFactory.artistFeeAccount.newAccount', null)
export const updatedArtistFeeAccountSelector = createSelector(updatedArtistFeeAccount, uafa => uafa)

// contract fee percentage

const contractFeePercentageLoaded = state => get(state, 'artFactory.contractFeePercentage.loaded', false)
export const contractFeePercentageLoadedSelector = createSelector(contractFeePercentageLoaded, l => l)

const contractFeePercentage = state => get(state, 'artFactory.contractFeePercentage.amount', null)
export const contractFeePercentageSelector = createSelector(contractFeePercentage, cfp => cfp)

// artist fee percentage

const artistFeePercentageLoaded = state => get(state, 'artFactory.artistFeePercentage.loaded', false)
export const artistFeePercentageLoadedSelector = createSelector(artistFeePercentageLoaded, l => l)

const artistFeePercentage = state => get(state, 'artFactory.artistFeePercentage.amount', null)
export const artistFeePercentageSelector = createSelector(artistFeePercentage, afp => afp)

const updatedArtistFeePercentage = state => get(state, 'artFactory.artistFeePercentage.newAmount', null)
export const updatedArtistFeePercentageSelector = createSelector(updatedArtistFeePercentage, uafp => uafp)

// base art price

const baseArtPriceLoaded = state => get(state, 'artFactory.baseArtPrice.loaded', false)
export const baseArtPriceLoadedSelector = createSelector(baseArtPriceLoaded, l => l)

const baseArtPrice = state => get(state, 'artFactory.baseArtPrice.amount', null)
export const baseArtPriceSelector = createSelector(baseArtPrice, bap => bap)

const updatedBaseArtPrice = state => get(state, 'artFactory.baseArtPrice.newAmount', null)
export const updatedBaseArtPriceSelector = createSelector(updatedBaseArtPrice, ubap => ubap)

// parent multiplier percentage

const parentMultiplierPercentageLoaded = state => get(state, 'artFactory.parentMultiplierPercentage.loaded', false)
export const parentMultiplierPercentageLoadedSelector = createSelector(parentMultiplierPercentageLoaded, l => l)

const parentMultiplierPercentage = state => get(state, 'artFactory.parentMultiplierPercentage.amount', null)
export const parentMultiplierPercentageSelector = createSelector(parentMultiplierPercentage, pmp => pmp)

const updatedParentMultiplierPercentage = state => get(state, 'artFactory.parentMultiplierPercentage.newAmount', null)
export const updatedParentMultiplierPercentageSelector = createSelector(updatedParentMultiplierPercentage, upmp => upmp)

// min parents

const minParentsLoaded = state => get(state, 'artFactory.minParents.loaded', false)
export const minParentsLoadedSelector = createSelector(minParentsLoaded, l => l)

const minParents = state => get(state, 'artFactory.minParents.amount', null)
export const minParentsSelector = createSelector(minParents, mp => mp)

const updatedMinParents = state => get(state, 'artFactory.minParents.newAmount', null)
export const updatedMinParentsSelector = createSelector(updatedMinParents, ump => ump)

// max parents

const maxParentsLoaded = state => get(state, 'artFactory.maxParents.loaded', false)
export const maxParentsLoadedSelector = createSelector(maxParentsLoaded, l => l)

const maxParents = state => get(state, 'artFactory.maxParents.amount', null)
export const maxParentsSelector = createSelector(maxParents, mp => mp)

const updatedMaxParents = state => get(state, 'artFactory.maxParents.newAmount', null)
export const updatedMaxParentsSelector = createSelector(updatedMaxParents, ump => ump)

// min legacies

const minLegaciesLoaded = state => get(state, 'artFactory.minLegacies.loaded', false)
export const minLegaciesLoadedSelector = createSelector(minLegaciesLoaded, l => l)

const minLegacies = state => get(state, 'artFactory.minLegacies.amount', null)
export const minLegaciesSelector = createSelector(minLegacies, ml => ml)

const updatedMinLegacies = state => get(state, 'artFactory.minLegacies.newAmount', null)
export const updatedMinLegaciesSelector = createSelector(updatedMinLegacies, uml => uml)

// max legacies

const maxLegaciesLoaded = state => get(state, 'artFactory.maxLegacies.loaded', false)
export const maxLegaciesLoadedSelector = createSelector(maxLegaciesLoaded, l => l)

const maxLegacies = state => get(state, 'artFactory.maxLegacies.amount', null)
export const maxLegaciesSelector = createSelector(maxLegacies, ml => ml)

const updatedMaxLegacies = state => get(state, 'artFactory.maxLegacies.newAmount', null)
export const updatedMaxLegaciesSelector = createSelector(updatedMaxLegacies, uml => uml)

// SALES & PURCHASES

// const salesCancelledLoaded = state => get(state, 'artFactory.sale.loaded', false)
// export const purchasesLoadedSelector = createSelector(purchasesLoaded, pl => pl)

// const purchases = state => get(state, 'artFactory.purchases.data', [])
// export const purchasesSelector = createSelector(purchases, p => p)

// const purchasesLoaded = state => get(state, 'artFactory.purchases.loaded', false)
// export const purchasesLoadedSelector = createSelector(purchasesLoaded, pl => pl)

// const purchases = state => get(state, 'artFactory.purchases.data', [])
// export const purchasesSelector = createSelector(purchases, p => p)

const purchasesLoaded = state => get(state, 'artFactory.purchases.loaded', false)
export const purchasesLoadedSelector = createSelector(purchasesLoaded, pl => pl)

const purchases = state => get(state, 'artFactory.purchases.data', [])
export const purchasesSelector = createSelector(purchases, p => p)

// ART / TOKENS

const artGen0Loaded = state => get(state, 'artFactory.artGen0.loaded', false)
export const artGen0LoadedSelector = createSelector(artGen0Loaded, al => al)

const artGen0 = state => get(state, 'artFactory.artGen0.data', [])
export const artGen0Selector = createSelector(artGen0, a => a)

const artFromOrderLoaded = state => get(state, 'artFactory.artFromOrder.loaded', false)
export const artFromOrderLoadedSelector = createSelector(artFromOrderLoaded, al => al)

const artFromOrder = state => get(state, 'artFactory.artFromOrder.data', [])
export const artFromOrderSelector = createSelector(artFromOrder, a => a)

export const allArtLoadedSelector = createSelector(
  artGen0Loaded,
  artFromOrderLoaded,
  (ag0, afo) => (ag0 && afo)
)

// const allArt = (artGen0, artFromOrder) => {
//   const allArt = artGen0 + artFromOrder
//   console.log('allArt: ', allArt)
//   return allArt
// }

export const updatedArtSelector = createSelector(artGen0, purchases, (allArt, allPurchases) => {
  allArt = decorateAllArt(allArt, allPurchases)
  return allArt
})

export const updatedMyArtSelector = createSelector(account, artGen0, purchases, (account, allArt, allPurchases) => {
  allArt = decorateAllArt(allArt, allPurchases)
  const myArt = allArt.filter((a) => a.currentOwner === account)
  console.log('myArt: ', myArt)
  return myArt
})

const decorateAllArt = (allArt, allPurchases) => {
  return(
      allArt.map((art) => {
          art = addCurrentOwner(art, allPurchases)
          return art
      })
  )
}

const addCurrentOwner = (art, allPurchases) => {
  let currentOwner
  currentOwner = art.owner
  for(let i=0;i<allPurchases.length;i++){
    if(art.id === allPurchases[i].id) {
      currentOwner = allPurchases[i].buyer
    }
  }

  return({
    ...art,
    currentOwner
  })
}

// ORDERS

const allOrdersLoaded = state => get(state, 'artFactory.allOrders.loaded', false)
export const allOrdersLoadedSelector = createSelector(allOrdersLoaded, status => status)
const allOrders = state => get(state, 'artFactory.allOrders.data', [])

const allCancelledOrdersLoaded = state => get(state, 'artFactory.cancelledOrders.loaded', false)
export const allCancelledOrdersLoadedSelector = createSelector(allCancelledOrdersLoaded, status => status)
const cancelledOrders = state => get(state, 'artFactory.cancelledOrders.data', [])

const allAcceptedOrdersLoaded = state => get(state, 'artFactory.acceptedOrders.loaded', false)
export const allAcceptedOrdersLoadedSelector = createSelector(allAcceptedOrdersLoaded, status => status)
const acceptedOrders = state => get(state, 'artFactory.acceptedOrders.data', [])

const orderCancelling = state => get(state, 'artFactory.orderCancelling', false)
export const orderCancellingSelector = createSelector(orderCancelling, status => status)

export const allOrderTypesLoadedSelector = createSelector(
  allOrdersLoaded,
  allCancelledOrdersLoaded,
  allAcceptedOrdersLoaded,
  (o, co, ao) => (o && co && ao)
)

const allOpenOrders = state => {
  const all = allOrders(state)
  const cancelled = cancelledOrders(state)
  const accepted = acceptedOrders(state)

  const allOpenOrders = reject(all, (order) => {
    const orderCancelled = cancelled.some((o) => o.id === order.id)
    const orderAccepted = accepted.some((o) => o.id === order.id)
    return(orderCancelled || orderAccepted)
  })

  return allOpenOrders
}

export const allOpenOrdersSelector = createSelector(allOpenOrders, oo => oo)

export const myOpenOrdersSelector = createSelector(allOpenOrders, account, (orders, account) => {
  orders = orders.filter((o) => o.buyer === account)
  return orders
})

const allAcceptedOrders = state => {
  const accepted = acceptedOrders(state)
  const filled = artFromOrder(state)

  const allAcceptedOrders = reject(accepted, (order) => {
    const orderFilled = filled.some((o) => o.id === order.id)
    return orderFilled
  })
  
  return allAcceptedOrders
}

export const allAcceptedOrdersSelector = createSelector(allAcceptedOrders, ao => ao)

export const myAcceptedOrdersSelector = createSelector(allAcceptedOrders, account, (orders, account) => {
  orders = orders.filter((o) => o.buyer === account)
  return orders
}) 

// REFACTOR

export const allLoadedSelector = createSelector(
  artGen0LoadedSelector,
  purchasesLoadedSelector,
  (al, pl) => (al && pl) 
)