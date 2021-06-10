import { get, reject } from 'lodash'
import { createSelector } from 'reselect'

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const artGen0Loaded = state => get(state, 'artFactory.artGen0.loaded', false)
export const artGen0LoadedSelector = createSelector(artGen0Loaded, al => al)

const artGen0 = state => get(state, 'artFactory.artGen0.data', [])
export const artGen0Selector = createSelector(artGen0, a => a)

const purchasesLoaded = state => get(state, 'artFactory.purchases.loaded', false)
export const purchasesLoadedSelector = createSelector(purchasesLoaded, pl => pl)

const purchases = state => get(state, 'artFactory.purchases.data', [])
export const purchasesSelector = createSelector(purchases, p => p)

export const allLoadedSelector = createSelector(
  artGen0LoadedSelector,
  purchasesLoadedSelector,
  (al, pl) => (al && pl) 
)

// ART / TOKENS

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

const allOrders = state => get(state, 'artFactory.allOrders.data', [])
const cancelledOrders = state => get(state, 'artFactory.cancelledOrders.data', [])
const acceptedOrders = state => get(state, 'artFactory.acceptedOrders.data', [])
const filledOrders = state => get(state, 'artFactory.artFromOrder.data', [])

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
  const filled = filledOrders(state)

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