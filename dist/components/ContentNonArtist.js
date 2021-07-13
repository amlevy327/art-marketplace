import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import {
  loadAllArt,
  loadPurchases,
  loadAllOrders,
  loadAllSettings,
  loadArtForSale,
  subscribeToEvents,
  loadSalesCancelled
} from '../store/interactions'
import {
  allLoadedSelector,
  artFactoryLoadedSelector,
  artFactorySelector
} from '../store/selectors'
import Spinner from './Spinner'
import SettingsNonArtist from './SettingsNonArtist'
import ProfileNonArtist from './ProfileNonArtist'
import ArtTokens from './ArtTokens'
import BuyArt from './BuyArt'

class ContentNonArtist extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const {
      dispatch,
      artFactory
    } = props

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
        <div className="content">
          { this.props.showAll ? <SettingsNonArtist /> : <Spinner type="table"/> }
          { this.props.showAll ? <BuyArt /> : <Spinner type="table"/> }
          { this.props.showAll ? <ProfileNonArtist /> : <Spinner type="table"/> }
          { this.props.showAll ? <ArtTokens /> : <Spinner type="table"/> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const allLoaded = allLoadedSelector(state)
  const artFactoryLoaded = artFactoryLoadedSelector(state)

  return {
    artFactory: artFactorySelector(state),
    showAll: allLoaded && artFactoryLoaded
  }
}

export default connect(mapStateToProps)(ContentNonArtist)