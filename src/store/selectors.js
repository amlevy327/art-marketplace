import { get } from 'lodash'
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

export const attemptToWork = createSelector()

export const updatedArtSelector = createSelector(artGen0, purchases, (allArt, allPurchases) => {
  console.log('updatedArtSelector')
  console.log(`updatedArtSelector allArt length = ${allArt.length}`)
  console.log(`updatedArtSelector allArt purch = ${allPurchases.length}`)
  allArt = decorateAllArt(allArt, allPurchases)
  return allArt
})

const decorateAllArt = (allArt, allPurchases) => {
  console.log('decorateAllArt')
  return(
      allArt.map((art) => {
          art = addCurrentOwner(art, allPurchases)
          return art
      })
  )
}

const addCurrentOwner = (art, allPurchases) => {
  console.log('addCurrentOwner')
  console.log(`addCurrentOwner artID = ${art.id}`)
  
  let currentOwner
  for(let i=0;i<allPurchases.length;i++){
    console.log(`addCurrentOwner inside for loop, puchaseID = ${allPurchases[i].id}`)
    if(art.id === allPurchases[i].id) {
      currentOwner = allPurchases[i].buyer
      console.log(`addCurrentOwner current owner = ${currentOwner}`)
    }
  }

  return({
    ...art,
    currentOwner
  })
}

// export const allTokensSelector = createSelector(
//   artGen0,
//   (artGen0) => {
//     //purchases = purchases.map((a,b) => a.timestamp - b.timestamp)
//     const allTokens = decorateAllTokens(artGen0)
//     return allTokens
//   }
// )

// const decorateAllTokens = state => {
//   return (
//     artGen0.map((artGen0) => {
//       artGen0 = updateOwner(rtGen0)
//       return artGen0
//     })
//   )
// }

// const updateOwner = (artGen0) => {
//   console.log(`zzz updateOwner, artID = ${artGen0.id}`)

//   const purch = purchases(state)

//   let currentOwner
//   for(let i=0;i<purchases.length;i++){
//     console.log(`zzz inside for loop, puchaseID = ${purchases[i].id}`)
//     if(artGen0.id === purchases[i].id) {
//       currentOwner = purchases.buyer
//       console.log(`zzz current owner = ${currentOwner}`)
//     }
//   }

//   return({
//     ...artGen0,
//     currentOwner
//   })
// }