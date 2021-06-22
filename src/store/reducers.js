import { combineReducers } from "redux"

function web3(state = {}, action) {
  switch(action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection}
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    default:
      return state
  }
}

function tokens(state = {}, action) {
  switch(action.type) {
    case 'TOKENS_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    default:
      return state
  }
}

function artFactory(state = {}, action) {
  switch(action.type) {
    case 'ART_FACTORY_LOADED':
      return { ...state, loaded: true, contract: action.contract }
      
    case 'CONTRACT_FEE_ACCOUNT_LOADED':
      return { ...state, contractFeeAccount: { loaded: true, account: action.contractFeeAccount[action.contractFeeAccount.length - 1].newAddress } }
    case 'CONTRACT_FEE_PERCENTAGE_LOADED':
        return { ...state, contractFeePercentage: {loaded: true, amount: action.contractFeePercentage[action.contractFeePercentage.length - 1].newAmount} }
    
    // artist fee account
    case 'ARTIST_FEE_ACCOUNT_LOADED':
      return { ...state, artistFeeAccount: { loaded: true, account: action.artistFeeAccount[action.artistFeeAccount.length - 1].newAddress } }
    case 'ARTIST_FEE_ACCOUNT_CHANGED':
      return { ...state, artistFeeAccount: { ...state.artistFeeAccount, newAccount: action.artistFeeAccount } }
    case 'ARTIST_FEE_ACCOUNT_UPDATING':
      return { ...state, artistFeeAccount: { ...state.artistFeeAccount, artistFeeAccountUpdating: true } }
    case 'ARTIST_FEE_ACCOUNT_UPDATED':
      return {
        ...state,
        artistFeeAccount: {
          ...state.artistFeeAccount,
          artistFeeAccountUpdating: false,
          account: action.artistFeeAccount.newAddress
        }
      }

    // artist fee percentage
    case 'ARTIST_FEE_PERCENTAGE_LOADED':
      return { ...state, artistFeePercentage: {loaded: true, amount: action.artistFeePercentage[action.artistFeePercentage.length - 1].newAmount} }
    case 'ARTIST_FEE_PERCENTAGE_CHANGED':
      return { ...state, artistFeePercentage: { ...state.artistFeePercentage, newAmount: action.artistFeePercentage } }
    case 'ARTIST_FEE_PERCENTAGE_UPDATING':
      return { ...state, artistFeePercentage: { ...state.artistFeePercentage, artistFeePercentageUpdating: true } }
    case 'ARTIST_FEE_PERCENTAGE_UPDATED':
      return {
        ...state,
        artistFeePercentage: {
          ...state.artistFeePercentage,
          artistFeePercentageUpdating: false,
          amount: action.artistFeePercentage.newAmount
        }
      }
   
    //  base art price
    case 'BASE_ART_PRICE_LOADED':
      return { ...state, baseArtPrice: {loaded: true, amount: action.baseArtPrice[action.baseArtPrice.length - 1].newAmount} }
    case 'BASE_ART_PRICE_CHANGED':
      return { ...state, baseArtPrice: { ...state.baseArtPrice, newAmount: action.baseArtPrice } }
    case 'BASE_ART_PRICE_UPDATING':
      return { ...state, baseArtPrice: { ...state.baseArtPrice, baseArtPriceUpdating: true } }
    case 'BASE_ART_PRICE_UPDATED':
      return {
        ...state,
        baseArtPrice: {
          ...state.baseArtPrice,
          baseArtPriceUpdating: false,
          amount: action.baseArtPrice.newAmount
        }
      }
    
    // parent multiplier percentage
    case 'PARENT_MULTIPLIER_PERCENTAGE_LOADED':
      return { ...state, parentMultiplierPercentage: {loaded: true, amount: action.parentMultiplierPercentage[action.parentMultiplierPercentage.length - 1].newAmount} }
    case 'PARENT_MULTIPLIER_PERCENTAGE_CHANGED':
      return { ...state, parentMultiplierPercentage: { ...state.parentMultiplierPercentage, newAmount: action.parentMultiplierPercentage } }
    case 'PARENT_MULTIPLIER_PERCENTAGE_UPDATING':
      return { ...state, parentMultiplierPercentage: { ...state.parentMultiplierPercentage, parentMultiplierPercentageUpdating: true } }
    case 'PARENT_MULTIPLIER_PERCENTAGE_UPDATED':
      return {
        ...state,
        parentMultiplierPercentage: {
          ...state.parentMultiplierPercentage,
          parentMultiplierPercentageUpdating: false,
          amount: action.parentMultiplierPercentage.newAmount
        }
      }
    
    // min parents
    case 'MIN_PARENTS_LOADED':
      return { ...state, minParents: {loaded: true, amount: action.minParents[action.minParents.length - 1].newAmount} }
    case 'MIN_PARENTS_CHANGED':
      return { ...state, minParents: { ...state.minParents, newAmount: action.minParents } }
    case 'MIN_PARENTS_UPDATING':
      return { ...state, minParents: { ...state.minParents, minParentsUpdating: true } }
    case 'MIN_PARENTS_UPDATED':
      return {
        ...state,
        minParents: {
          ...state.minParents,
          minParentsUpdating: false,
          amount: action.minParents.newAmount
        }
      }
    
    // max parents
    case 'MAX_PARENTS_LOADED':
      return { ...state, maxParents: {loaded: true, amount: action.maxParents[action.maxParents.length - 1].newAmount} }
    case 'MAX_PARENTS_CHANGED':
      return { ...state, maxParents: { ...state.maxParents, newAmount: action.maxParents } }
    case 'MAX_PARENTS_UPDATING':
      return { ...state, maxParents: { ...state.maxParents, maxParentsUpdating: true } }
    case 'MAX_PARENTS_UPDATED':
      return {
        ...state,
        maxParents: {
          ...state.maxParents,
          maxParentsUpdating: false,
          amount: action.maxParents.newAmount
        }
      }
    
    // min legacies
    case 'MIN_LEGACIES_LOADED':
      return { ...state, minLegacies: {loaded: true, amount: action.minLegacies[action.minLegacies.length - 1].newAmount} }
    case 'MIN_LEGACIES_CHANGED':
      return { ...state, minLegacies: { ...state.minLegacies, newAmount: action.minLegacies } }
    case 'MIN_LEGACIES_UPDATING':
      return { ...state, minLegacies: { ...state.minLegacies, minLegaciesUpdating: true } }
    case 'MIN_LEGACIES_UPDATED':
      return {
        ...state,
        minLegacies: {
          ...state.minLegacies,
          minLegaciesUpdating: false,
          amount: action.minLegacies.newAmount
        }
      }
    
    // max legacies
    case 'MAX_LEGACIES_LOADED':
      return { ...state, maxLegacies: {loaded: true, amount: action.maxLegacies[action.maxLegacies.length - 1].newAmount} }
    case 'MAX_LEGACIES_CHANGED':
      return { ...state, maxLegacies: { ...state.maxLegacies, newAmount: action.maxLegacies } }
    case 'MAX_LEGACIES_UPDATING':
      return { ...state, maxLegacies: { ...state.maxLegacies, maxLegaciesUpdating: true } }
    case 'MAX_LEGACIES_UPDATED':
      return {
        ...state,
        maxLegacies: {
          ...state.maxLegacies,
          maxLegaciesUpdating: false,
          amount: action.maxLegacies.newAmount
        }
      }
    
    // new art
    case 'NEW_ART_LOADED':
      return { ...state, newArt: {loaded: true, data: action.newArt} }
    case 'NEW_ART_GEN_0_TOKEN_URI_CHANGED':
      return { ...state, newArtGen0: { ...state.newArtGen0, tokenURI: action.tokenURI } }
    case 'NEW_ART_GEN_0_NAME_CHANGED':
      return { ...state, newArtGen0: { ...state.newArtGen0, name: action.name } }
    case 'NEW_ART_GEN_0_CREATING':
      return { ...state, newArtGen0: { ...state.newArtGen0, tokenURI: null, name: null, creating: true} }
    case 'NEW_ART_CREATED':
      return {
        ...state,
        newArt: {
          ...state.newArt,
          data: [
            ...state.newArt.data,
            action.newArt
          ]
        },
        newArtGen0: {
          ...state.newArtGen0,
          creating: false
        },
        newArtFromOrder: {
          ...state.newArtFromOrder,
          creating: false
        }
      }
    case 'NEW_ART_FROM_ORDER_ORDER_ID_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, orderID: action.orderID } }
    case 'NEW_ART_FROM_ORDER_TOKEN_URI_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, tokenURI: action.tokenURI } }
    case 'NEW_ART_FROM_ORDER_NAME_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, name: action.name } }
    case 'NEW_ART_FROM_ORDER_GEN_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, gen: action.gen } }
    case 'NEW_ART_FROM_ORDER_PARENTS_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, parents: action.parents } }
    case 'NEW_ART_FROM_ORDER_SIBLINGS_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, siblings: action.siblings } }
    case 'NEW_ART_FROM_ORDER_BUYER_CHANGED':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, buyer: action.buyer } }
    case 'NEW_ART_FROM_ORDER_CREATING':
      return { ...state, newArtFromOrder: { ...state.newArtFromOrder, tokenURI: null, name: null, creating: true} }
    
    case 'ART_FOR_SALE_LOADED':
      return { ...state, artForSale: {loaded: true, data: action.artForSale } }
    case 'SALES_CANCELLED_LOADED':
      return { ...state, salesCancelled: {loaded: true, data: action.salesCancelled } }
    case 'PURCHASES_LOADED':
      return { ...state, purchases: {loaded: true, data: action.purchases} }
    
    case 'ALL_ORDERS_LOADED':
      return { ...state, allOrders: {loaded: true, data: action.allOrders} }
    case 'CANCELLED_ORDERS_LOADED':
      return { ...state, cancelledOrders: {loaded: true, data: action.cancelledOrders} }
    case 'ACCEPTED_ORDERS_LOADED':
      return { ...state, acceptedOrders: {loaded: true, data: action.acceptedOrders} }
    case 'ORDER_CANCELLING':
      return { ...state, orderCancelling: true }
    case 'ORDER_CANCELLED':
      return {
          ...state,
          orderCancelling: false,
          cancelledOrders: {
              ...state.cancelledOrders,
              data: [
                  ...state.cancelledOrders.data,
                  action.order
              ]
          }
      }
    case 'ORDER_ACCEPTING':
      return { ...state, orderAccepting: true }
    case 'ORDER_ACCEPTED':
      return {
          ...state,
          orderAccepting: false,
          acceptedOrders: {
              ...state.acceptedOrders,
              data: [
                  ...state.acceptedOrders.data,
                  action.order
              ]
          }
      }
    case 'ORDER_CREATING':
      return { ...state, orderCreating: true }
    case 'ORDER_CREATED':
      return {
          ...state,
          orderCreating: false,
          allOrders: {
              ...state.allOrders,
              data: [
                  ...state.allOrders.data,
                  action.order
              ]
          }
      }
    
    case 'NEW_ORDER_PARENTS_CHANGED':
      return { ...state, newOrder: { ...state.newOrder, parentIDS: action.parentIDS } }
    case 'NEW_ORDER_NUM_LEGACIES_CHANGED':
      return { ...state, newOrder: { ...state.newOrder, numLegacies: action.numLegacies } }
    
    case 'BALANCE_LOADED':
      return { ...state, balance: {loaded: true, amount: action.accountBalance} }
    case 'BALANCE_LOADING':
      return { ...state, balance: {...state.balance, loading: true} }
    case 'WITHDRAW_COMPLETED':
      return { ...state, balance: {...state.balance, loading: false, amount: action.withdraw.balance} }
    
    case 'PURCHASE_PROCESSING':
      return { ...state, purchaseProcessing: true }
    case 'PURCHASE_COMPLETE':
      return {
          ...state,
          purchaseProcessing: false,
          purchases: {
              ...state.purchases,
              data: [
                  ...state.purchases.data,
                  action.purchase
              ]
          }
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  web3,
  tokens,
  artFactory
})

export default rootReducer