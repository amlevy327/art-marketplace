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
import {
  artistFeePercentageChanged,
  baseArtPriceChanged,
  parentMultiplierPercentageChanged,
  minParentsChanged,
  maxParentsChanged,
  minLegaciesChanged,
  maxLegaciesChanged,
  artistFeeAccountChanged
} from '../store/actions'
import {
  updateArtistFeePercentage,
  updateBaseArtPrice,
  updateParentMultiplierPercentage,
  updateMinParents,
  updateMaxParents,
  updateMinLegacies,
  updateMaxLegacies,
  updateArtistFeeAccount
} from '../store/interactions'

function showSettings(props) {
  const {
    account,
    artistFeeAccount
  } = props

  console.log('account: ', account)
  console.log('artistFeeAccount: ', artistFeeAccount)
  console.log('isArtist: ', account === artistFeeAccount)

  if (account === artistFeeAccount) {
    showArtistSettings(props)
  } else {
    showNonAristSettings(props)
  }
}

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

function showArtistSettings(props) {
  console.log('showArtistSettings')

  const {
    artistFeePercentage,
    baseArtPrice,
    parentMultiplierPercentage,
    minParents,
    maxParents,
    minLegacies,
    maxLegacies,
    dispatch,
    account,
    artFactory,
    updatedArtistFeePercentage,
    updatedBaseArtPrice,
    updatedParentMultiplierPercentage,
    updatedMinParents,
    updatedMaxParents,
    updatedMinLegacies,
    updatedMaxLegacies,
    updatedArtistFeeAccount,
    artistFeeAccount
  } = props

  return(
    <table className="table table-dark table-sm small">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Artist Fee Account</td>
          <td>
            <input
            type="text"
            placeholder={`${artistFeeAccount}`}
            onChange={(e) => dispatch(artistFeeAccountChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateArtistFeeAccount')
              updateArtistFeeAccount(dispatch, artFactory, updatedArtistFeeAccount, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Artist Fee Percentage</td>
          <td>
            <input
            type="text"
            placeholder={`${artistFeePercentage}`}
            onChange={(e) => dispatch(artistFeePercentageChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateArtistFeePercentage')
              updateArtistFeePercentage(dispatch, artFactory, updatedArtistFeePercentage, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Base Art Price</td>
          <td>
            <input
            type="text"
            placeholder={`${baseArtPrice}`}
            onChange={(e) => dispatch(baseArtPriceChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateBaseArtPrice')
              updateBaseArtPrice(dispatch, artFactory, updatedBaseArtPrice, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Parent Multiplier Percentage</td>
          <td>
            <input
            type="text"
            placeholder={`${parentMultiplierPercentage}`}
            onChange={(e) => dispatch(parentMultiplierPercentageChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateParentMultiplierPercentage')
              updateParentMultiplierPercentage(dispatch, artFactory, updatedParentMultiplierPercentage, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Min Parents</td>
          <td>
            <input
            type="text"
            placeholder={`${minParents}`}
            onChange={(e) => dispatch(minParentsChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateMinParents')
              updateMinParents(dispatch, artFactory, updatedMinParents, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Max Parents</td>
          <td>
            <input
            type="text"
            placeholder={`${maxParents}`}
            onChange={(e) => dispatch(maxParentsChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateMaxParents')
              updateMaxParents(dispatch, artFactory, updatedMaxParents, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Min Legacies</td>
          <td>
            <input
            type="text"
            placeholder={`${minLegacies}`}
            onChange={(e) => dispatch(minLegaciesChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateMaxParents')
              updateMinLegacies(dispatch, artFactory, updatedMinLegacies, account)
            }}
          >Update</td>
        </tr>
        <tr>
          <td>Max Legacies</td>
          <td>
            <input
            type="text"
            placeholder={`${maxLegacies}`}
            onChange={(e) => dispatch(maxLegaciesChanged(e.target.value))}
            className="form-control form-control-sm bg-dark text-white"
            required
            />
          </td>
          <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: updateMaxParents')
              updateMaxLegacies(dispatch, artFactory, updatedMaxLegacies, account)
            }}
          >Update</td>
        </tr>
      </tbody>
    </table>
  )
}

class Settings extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Settings
        </div>
        <div className="card-body">
          {/* { this.props.showAllSettings ? showNonAristSettings(this.props) : <Spinner type="table" /> } */}
          { this.props.showAllSettings ? showArtistSettings(this.props) : <Spinner type="table" /> }
          {/* { this.props.showAllSettings ? showSettings(this.props) : <Spinner type="table" /> } */}
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

export default connect(mapStateToProps)(Settings)