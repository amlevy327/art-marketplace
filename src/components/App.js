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
  subscribeToEvents
} from '../store/interactions'
import { allLoadedSelector } from '../store/selectors'
import './App.css'
import Navbar from './Navbar'
import Spinner from './Spinner'
import ArtTokens from './ArtTokens'
import MyArt from './MyArt'
import Settings from './Settings'

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
    await loadPurchases(artFactory, dispatch)
    await loadArtForSale(artFactory, dispatch)
    await subscribeToEvents(artFactory, dispatch)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="vertical-split">
            <Settings />
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
          { this.props.showAll ? <MyArt /> : <Spinner /> }
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
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