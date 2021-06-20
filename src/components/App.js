import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadAccount,
  loadArtFactory,
  loadTokens,
  loadWeb3,
  loadAllArt,
  loadPurchases,
  loadAllOrders,
  loadAllSettings,
  loadArtForSale,
  subscribeToEvents,
  loadSalesCancelled
} from '../store/interactions'
import { allLoadedSelector } from '../store/selectors'
import './App.css'
import Navbar from './Navbar'
import Spinner from './Spinner'
import ArtTokens from './ArtTokens'
import MyArt from './MyArt'
import Settings from './Settings'
import CreateArt from './CreateArt'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    // await window.ethereum.enable() // not sure if need this?
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const tokens = await loadTokens(web3, networkId, dispatch)
    if (!tokens) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
    }
    const artFactory = await loadArtFactory(web3, networkId, dispatch)
    if(!artFactory) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
    }

    // move this to content
    await loadAllArt(artFactory, dispatch) 
    await loadAllSettings(artFactory, dispatch)
    await loadAllOrders(artFactory, dispatch)
    await loadArtForSale(artFactory, dispatch)
    await loadSalesCancelled(artFactory, dispatch)
    await loadPurchases(artFactory, dispatch)
    await subscribeToEvents(artFactory, dispatch)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <Settings />
          <CreateArt />
          { this.props.showAll ? <MyArt /> : <Spinner /> }
          { this.props.showAll ? <ArtTokens /> : <Spinner /> }
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //   <div>
  //     <Navbar />
  //   </div>)
  // }
}

function mapStateToProps(state) {
  return {
    showAll: allLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App)