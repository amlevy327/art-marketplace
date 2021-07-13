import React, { Component } from 'react'
import { connect } from "react-redux"
import Spinner from './Spinner'
import {
  artistFeePercentageLoadedSelector,
  artistFeePercentageSelector,
  baseArtPriceLoadedSelector,
  baseArtPriceSelector,
  parentMultiplierPercentageLoadedSelector,
  parentMultiplierPercentageSelector,
  minParentsLoadedSelector,
  minParentsSelector,
  maxParentsLoadedSelector,
  maxParentsSelector,
  minLegaciesLoadedSelector,
  maxLegaciesLoadedSelector,
  minLegaciesSelector,
  maxLegaciesSelector,
  contractFeePercentageLoadedSelector,
  contractFeePercentageSelector,
  accountSelector,
  artistFeeAccountSelector,
  artistFeeAccountLoadedSelector,
  artFactorySelector,
  updatedArtistFeePercentageSelector,
  updatedBaseArtPriceSelector,
  updatedParentMultiplierPercentageSelector,
  updatedMinParentsSelector,
  updatedMaxParentsSelector,
  updatedMinLegaciesSelector,
  updatedMaxLegaciesSelector,
  updatedArtistFeeAccountSelector
} from '../store/selectors'

function showNonAristSettings(props) {
  console.log('showNonAristSettings')

  const {
    contractFeePercentage,
    artistFeePercentage,
    baseArtPrice,
    parentMultiplierPercentage,
    minParents,
    maxParents,
    minLegacies,
    maxLegacies
  } = props

  return(
    <table className="table table-dark table-sm small">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contract Fee Percentage</td>
          <td>{contractFeePercentage}</td>
        </tr>
        <tr>
          <td>Artist Fee Percentage</td>
          <td>{artistFeePercentage}</td>
        </tr>
        <tr>
          <td>Base Art Price</td>
          <td>{baseArtPrice}</td>
        </tr>
        <tr>
          <td>Parent Multiplier Percentage</td>
          <td>{parentMultiplierPercentage}</td>
        </tr>
        <tr>
          <td>Min Parents</td>
          <td>{minParents}</td>
        </tr>
        <tr>
          <td>Max Parents</td>
          <td>{maxParents}</td>
        </tr>
        <tr>
          <td>Min Legacies</td>
          <td>{minLegacies}</td>
        </tr>
        <tr>
          <td>Max Legacies</td>
          <td>{maxLegacies}</td>
        </tr>
      </tbody>
    </table>
  )
}

class SettingsNonArtist extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Settings
        </div>
        <div className="card-body">
          { this.props.showAllSettings ? showNonAristSettings(this.props) : <Spinner type="table" /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let contractFeePercentageLoaded = contractFeePercentageLoadedSelector(state)
  let artistFeePercentageLoaded = artistFeePercentageLoadedSelector(state)
  let baseArtPriceLoaded = baseArtPriceLoadedSelector(state)
  let parentMultiplierPercentageLoaded = parentMultiplierPercentageLoadedSelector(state)
  let minParentsLoaded = minParentsLoadedSelector(state)
  let maxParentsLoaded = maxParentsLoadedSelector(state)
  let minLegaciesLoaded = minLegaciesLoadedSelector(state)
  let maxLegaciesLoaded = maxLegaciesLoadedSelector(state)
  let artistFeeAccountLoaded = artistFeeAccountLoadedSelector(state)

  return {
    showAllSettings:
      contractFeePercentageLoaded
      && artistFeePercentageLoaded
      && baseArtPriceLoaded
      && parentMultiplierPercentageLoaded
      && minParentsLoaded
      && maxParentsLoaded
      && minLegaciesLoaded
      && maxLegaciesLoaded
      && artistFeeAccountLoaded,
    contractFeePercentage: contractFeePercentageSelector(state),
    artistFeePercentage: artistFeePercentageSelector(state),
    baseArtPrice: baseArtPriceSelector(state),
    parentMultiplierPercentage: parentMultiplierPercentageSelector(state),
    minParents: minParentsSelector(state),
    maxParents: maxParentsSelector(state),
    minLegacies: minLegaciesSelector(state),
    maxLegacies: maxLegaciesSelector(state),
    account: accountSelector(state),
    artistFeeAccount: artistFeeAccountSelector(state),
    artFactory: artFactorySelector(state),
    updatedArtistFeeAccount: updatedArtistFeeAccountSelector(state),
    updatedArtistFeePercentage: updatedArtistFeePercentageSelector(state),
    updatedBaseArtPrice: updatedBaseArtPriceSelector(state),
    updatedParentMultiplierPercentage: updatedParentMultiplierPercentageSelector(state),
    updatedMinParents: updatedMinParentsSelector(state),
    updatedMaxParents: updatedMaxParentsSelector(state),
    updatedMinLegacies: updatedMinLegaciesSelector(state),
    updatedMaxLegacies: updatedMaxLegaciesSelector(state),
    updatedArtistFeeAccount: updatedArtistFeeAccountSelector(state)
  }
}

export default connect(mapStateToProps)(SettingsNonArtist)