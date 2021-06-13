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
    
    case 'CONTRACT_FEE_PERCENTAGE_LOADED':
        return { ...state, contractFeePercentage: {loaded: true, amount: action.contractFeePercentage[0].newAmount} }
    case 'ARTIST_FEE_PERCENTAGE_LOADED':
      return { ...state, artistFeePercentage: {loaded: true, amount: action.artistFeePercentage[0].newAmount} }
    case 'BASE_ART_PRICE_LOADED':
      return { ...state, baseArtPrice: {loaded: true, amount: action.baseArtPrice[0].newAmount} }
    case 'PARENT_MULTIPLIER_PERCENTAGE_LOADED':
      return { ...state, parentMultiplierPercentage: {loaded: true, amount: action.parentMultiplierPercentage[0].newAmount} }
    case 'MIN_PARENTS_LOADED':
      return { ...state, minParents: {loaded: true, amount: action.minParents[0].newAmount} }
    case 'MAX_PARENTS_LOADED':
      return { ...state, maxParents: {loaded: true, amount: action.maxParents[0].newAmount} }
    case 'MIN_LEGACIES_LOADED':
      return { ...state, minLegacies: {loaded: true, amount: action.minLegacies[0].newAmount} }
    case 'MAX_LEGACIES_LOADED':
      return { ...state, maxLegacies: {loaded: true, amount: action.maxLegacies[0].newAmount} }
    
    case 'ART_GEN_0_LOADED':
      return { ...state, artGen0: {loaded: true, data: action.artGen0} }
    case 'ART_FROM_ORDER_LOADED':
      return { ...state, artFromOrder: {loaded: true, data: action.artFromOrder} }
    
    case 'ART_FOR_SALE_LOADED':
      return { ...state, artForSale: {loaded: true, data: action.artForSale } }
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