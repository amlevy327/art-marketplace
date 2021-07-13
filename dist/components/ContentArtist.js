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
import SettingsArtist from './SettingsArtist'
import CreateArt from './CreateArt'
import ProfileArtist from './ProfileArtist'

class ContentArtist extends Component {
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
          { this.props.showAll ? <SettingsArtist /> : <Spinner type="table"/> }
          { this.props.showAll ? <CreateArt /> : <Spinner type="table"/> }
          { this.props.showAll ? <ProfileArtist /> : <Spinner type="table"/> }
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

export default connect(mapStateToProps)(ContentArtist)