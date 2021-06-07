import Web3 from 'web3'
import {
  web3Loaded,
  web3AccountLoaded,
  tokensLoaded,
  artFactoryLoaded,
  artGen0Loaded,
  purchasesLoaded
} from './actions'
import Tokens from '../abis/Tokens.json'
import ArtFactory from '../abis/ArtFactory.json'

export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum !== 'undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign('https://metamask.io/')
  }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = await accounts[0]
  if(typeof account !== 'undefined') {
    dispatch(web3AccountLoaded(account))
    return account
  } else {
    window.alert('Please install MetaMask')
    window.location.assign('https://metamask.io/')
  }
}

export const loadTokens = async (web3, networkId, dispatch) => {
  try {
    const tokens = new web3.eth.Contract(Tokens.abi, Tokens.networks[networkId].address)
    dispatch(tokensLoaded(tokens))
    return tokens
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadArtFactory = async (web3, networkId, dispatch) => {
  try {
    const artFactory = new web3.eth.Contract(ArtFactory.abi, ArtFactory.networks[networkId].address)
    dispatch(artFactoryLoaded(artFactory))
    return artFactory
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadAllArt = async (artFactory, dispatch) => {
  // art gen 0
  const artGen0Stream = await artFactory.getPastEvents('ArtGen0', { fromBlock: 0, toBlock: 'latest' })
  console.log('artGen0Stream: ', artGen0Stream)
  const artGen0 = artGen0Stream.map((event) => event.returnValues)
  dispatch(artGen0Loaded(artGen0))

  // art from order
}

export const loadPurchases = async (artFactory, dispatch) => {
  const purchasesStream = await artFactory.getPastEvents('Purchase', { fromBlock: 0, toBlock: 'latest' })
  console.log('purchaseStream: ', purchasesStream)
  const purchases = purchasesStream.map((event) => event.returnValues)
  dispatch(purchasesLoaded(purchases))
}