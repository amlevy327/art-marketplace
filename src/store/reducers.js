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
      return { ...state, loaded: true, tokens: action.contract }
    default:
      return state
  }
}

function artFactory(state = {}, action) {
  switch(action.type) {
    case 'ART_FACTORY_LOADED':
      return { ...state, loaded: true, artFactory: action.contract }
    case 'ART_GEN_0_LOADED':
      return { ...state, artGen0: {loaded: true, data: action.artGen0} }
    case 'PURCHASES_LOADED':
      return { ...state, purchases: {loaded: true, data: action.purchases} }
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