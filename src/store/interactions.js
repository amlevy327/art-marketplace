import Web3 from 'web3'
import {
  web3Loaded,
  web3AccountLoaded,
  tokensLoaded,
  artFactoryLoaded,
  artGen0Loaded,
  artFromOrderLoaded,
  purchasesLoaded,
  allOrdersLoaded,
  cancelledOrdersLoaded,
  acceptedOrdersLoaded,
  contractFeePercentageLoaded,
  artistFeePercentageLoaded,
  baseArtPriceLoaded,
  parentMultiplierPercentageLoaded,
  minParentsLoaded,
  maxParentsLoaded,
  minLegaciesLoaded,
  maxLegaciesLoaded,
  orderCancelling,
  artForSaleLoaded,
  orderCancelled
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

export const loadAllSettings = async (artFactory, dispatch) => {
  // contract fee percentage
  const contractFeePercentageStream = await artFactory.getPastEvents('ContractFeePercentage', { fromBlock: 0, toBlock: 'latest' })
  const contractFeePercentage = contractFeePercentageStream.map((event) => event.returnValues)
  dispatch(contractFeePercentageLoaded(contractFeePercentage))

  // artist fee percentage
  const artistFeePercentageStream = await artFactory.getPastEvents('ArtistFeePercentage', { fromBlock: 0, toBlock: 'latest' })
  const artistFeePercentage = artistFeePercentageStream.map((event) => event.returnValues)
  dispatch(artistFeePercentageLoaded(artistFeePercentage))

  // base art price
  const baseArtPriceStream = await artFactory.getPastEvents('BaseArtPrice', { fromBlock: 0, toBlock: 'latest' })
  const baseArtPrice = baseArtPriceStream.map((event) => event.returnValues)
  dispatch(baseArtPriceLoaded(baseArtPrice))

  // parent multiplier percentage
  const parentMultiplierPercentageStream = await artFactory.getPastEvents('ParentMultiplierPercentage', { fromBlock: 0, toBlock: 'latest' })
  const parentMultiplierPercentage = parentMultiplierPercentageStream.map((event) => event.returnValues)
  dispatch(parentMultiplierPercentageLoaded(parentMultiplierPercentage))

  // min parents
  const minParentsStream = await artFactory.getPastEvents('MinParents', { fromBlock: 0, toBlock: 'latest' })
  const minParents = minParentsStream.map((event) => event.returnValues)
  dispatch(minParentsLoaded(minParents))

  // max parents
  const maxParentsStream = await artFactory.getPastEvents('MaxParents', { fromBlock: 0, toBlock: 'latest' })
  const maxParents = maxParentsStream.map((event) => event.returnValues)
  dispatch(maxParentsLoaded(maxParents))

  // min legacies
  const minLegaciesStream = await artFactory.getPastEvents('MinLegacies', { fromBlock: 0, toBlock: 'latest' })
  const minLegacies = minLegaciesStream.map((event) => event.returnValues)
  dispatch(minLegaciesLoaded(minLegacies))

  // max legacies
  const maxLegaciesStream = await artFactory.getPastEvents('MaxLegacies', { fromBlock: 0, toBlock: 'latest' })
  const maxLegacies = maxLegaciesStream.map((event) => event.returnValues)
  dispatch(maxLegaciesLoaded(maxLegacies))
}

export const loadAllArt = async (artFactory, dispatch) => {
  // art gen 0
  const artGen0Stream = await artFactory.getPastEvents('ArtGen0', { fromBlock: 0, toBlock: 'latest' })
  console.log('artGen0Stream: ', artGen0Stream)
  const artGen0 = artGen0Stream.map((event) => event.returnValues)
  dispatch(artGen0Loaded(artGen0))

  // art from order
  const artFromOrderStream = await artFactory.getPastEvents('ArtFromOrder', { fromBlock: 0, toBlock: 'latest' })
  console.log('artFromOrderStream: ', artFromOrderStream)
  const artFromOrder = artFromOrderStream.map((event) => event.returnValues)
  dispatch(artFromOrderLoaded(artFromOrder))
}

export const loadPurchases = async (artFactory, dispatch) => {
  const purchasesStream = await artFactory.getPastEvents('Purchase', { fromBlock: 0, toBlock: 'latest' })
  console.log('purchaseStream: ', purchasesStream)
  const purchases = purchasesStream.map((event) => event.returnValues)
  dispatch(purchasesLoaded(purchases))
}

export const loadAllOrders = async (artFactory, dispatch) => {
  const allOrdersStream = await artFactory.getPastEvents('Order', { fromBlock: 0, toBlock: 'latest' })
  console.log('allOrdersStream: ', allOrdersStream)
  const allOrders = allOrdersStream.map((event) => event.returnValues)
  dispatch(allOrdersLoaded(allOrders))

  const cancelledStream = await artFactory.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
  console.log('cancelledStream: ', cancelledStream)
  const cancelledOrders = cancelledStream.map((event) => event.returnValues)
  dispatch(cancelledOrdersLoaded(cancelledOrders))

  const acceptedStream = await artFactory.getPastEvents('Accept', { fromBlock: 0, toBlock: 'latest' })
  console.log('acceptedStream: ', acceptedStream)
  const acceptedOrders = acceptedStream.map((event) => event.returnValues)
  dispatch(acceptedOrdersLoaded(acceptedOrders))
}

// EVENTS

export const subscribeToEvents = async (artFactory, dispatch) => {
  artFactory.events.Cancel({}, (error, event) => {
    dispatch(orderCancelled(event.returnValues))
  })
}

// TODO: NEED TO TEST STILL

export const cancelOpenOrder = async (dispatch, artFactory, order, account) => {
  await artFactory.methods.cancelOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(orderCancelling())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
}

// SALE

export const loadArtForSale = async (artFactory, dispatch) => {
  const artForSaleStream = await artFactory.getPastEvents('ArtForSale', { fromBlock: 0, toBlock: 'latest' })
  console.log('artForSaleStream: ', artForSaleStream)
  const artForSale = artForSaleStream.map((event) => event.returnValues)
  dispatch(artForSaleLoaded(artForSale))
}