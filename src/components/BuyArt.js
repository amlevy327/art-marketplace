import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  accountSelector,
  allLoadedSelector,
  artFactorySelector,
  artForSaleSelector,
  baseArtPriceSelector,
  contractFeePercentageSelector,
  newOrderParentIDSSelector,
  newOrderNumLegaciesSelector,
  tokensSelector,
  updatedMyArtSelector,
  newOrderSelector,
  parentMultiplierPercentageSelector,
  contractFeePercentageLoadedSelector
} from '../store/selectors'
import {
  createNewOrder,
  purchaseArt
} from '../store/interactions'
import {
  newOrderParentsChanged,
  newOrderNumLegaciesChanged
} from '../store/actions'

const showArtForSale = (props) => {
  const {
    dispatch,
    account,
    artFactory,
    tokens,
    artForSale,
    baseArtPrice,
    contractFeePercentage
  } = props
  
  const totalPrice = parseInt(baseArtPrice) + (parseInt(baseArtPrice) * (parseInt(contractFeePercentage) / 100))
  
  return(
    <tbody>
      { artForSale.map((art) => {
        return(
          <tr className={`art-${art.id}`} key={art.id}>
            <td>
              <img src={art.tokenURI} alt="N/A" width="100" height="100"></img>
            </td>
            <td>{art.gen}</td>
            <td>{totalPrice}</td>
            <td
                className="text-muted cancel-order"
                onClick={(e) => {
                  console.log('button click: buy gen 0')
                  purchaseArt(dispatch, artFactory, tokens, art, account, totalPrice)
                }}
            >Buy</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showNumLegaciesForm = (props) => {
  const {
    dispatch,
    artFactory,
    newOrderParentIDS,
    newOrderNumLegacies,
    account,
    baseArtPrice,
    parentMultiplierPercentage,
    contractFeePercentage
    // showNewOrderTotalPrice
  } = props

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      console.log('submit button clicked')

      const artPrice = parseInt(baseArtPrice) + parseInt(baseArtPrice * newOrderNumLegacies * parentMultiplierPercentage * newOrderParentIDS.length / 100)
      const contractCut = parseInt(artPrice * contractFeePercentage / 100)
      const totalPrice = artPrice + contractCut
      console.log('totalPrice: ', totalPrice)

      createNewOrder(dispatch, artFactory, newOrderParentIDS, newOrderNumLegacies, totalPrice, account)
    }}>
      <div className="form-group small">
        <label>Num Legacies</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Num Legacies"
          onChange={(e) => dispatch(newOrderNumLegaciesChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
        </div>
        <button type="submit" className="btn btn-primary btm-sm btn-black">Create Order</button>
        {/* { showNewOrderTotalPrice ? <small> Price: {calculatedTotalPrice(props)} wei</small> : null } */}
    </form>
  )
}

const calculatedTotalPrice = (props) => {
  const {
    baseArtPrice,
    contractFeePercentage,
    parentMultiplierPercentage,
    newOrderParentIDS,
    newOrderNumLegacies
  } = props

  console.log('newOrderParentIDS length: ', newOrderParentIDS.length)

  const artPrice = parseInt(baseArtPrice) + parseInt(baseArtPrice * newOrderNumLegacies * parentMultiplierPercentage * newOrderParentIDS.length / 100)
  const contractCut = parseInt(artPrice * contractFeePercentage / 100)
  const totalPrice = artPrice + contractCut

  return totalPrice
}

const showCreateOrder = (props) => {
  const {
    myArt
  } = props

  return(
    <tbody>
      { myArt.map((art) => {
        return(
          <tr className={`art-${art.id}`} key={art.id}>
            <td>
              <img src={art.tokenURI} alt="N/A" width="100" height="100"></img>
            </td>
            <td>{art.gen}</td>
            <td><input
            type="checkbox"
            onClick={(e) => {
              console.log('checkbox')
              updateParents(props, art.id)
            }}
            /></td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const updateParents = (props, id) => {
  const {
    dispatch,
    newOrderParentIDS
  } = props

  let parents = []

  if(!newOrderParentIDS) {
    console.log('first element')
    parents.push(id)
  } else {
    parents = newOrderParentIDS
    if(!newOrderParentIDS.includes(id)){
      console.log('not in array')
      parents.push(id)
    } else {
      console.log('already in array')
      parents = parents.filter((p) => p !== id)
    }
  }

  console.log('parents: ', parents)
  dispatch(newOrderParentsChanged(parents))
}

class BuyArt extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
            Buy Art
        </div>
        <div className="card-body">
          <Tabs defaultActiveKey="sale" className="bg-dark text-white">
            <Tab eventKey="sale" title="For Sale" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th></th>
                    <th>Gen</th>
                    <th>Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                { this.props.showAll ? showArtForSale(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="order" title="Create Order" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th></th>
                    <th>Gen</th>
                    <th></th>
                  </tr>
                </thead>
                { this.props.showAll ? showCreateOrder(this.props) : <Spinner type="table"/> }
              </table>
              { this.props.showAll ? showNumLegaciesForm(this.props) : <Spinner type="table"/> }
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const newOrder = newOrderSelector(state)
  const parentIDS = newOrderParentIDSSelector(state)
  const numLegacies = newOrderNumLegaciesSelector(state)
  const allLoaded = allLoadedSelector(state)
  const contractFeePercentageLoaded = contractFeePercentageLoadedSelector(state)

  return {
    account: accountSelector(state),
    artFactory: artFactorySelector(state),
    tokens: tokensSelector(state),
    artForSale: artForSaleSelector(state),
    baseArtPrice: baseArtPriceSelector(state),
    contractFeePercentage: contractFeePercentageSelector(state),
    parentMultiplierPercentage: parentMultiplierPercentageSelector(state),
    myArt: updatedMyArtSelector(state),
    newOrderParentIDS: parentIDS,
    newOrderNumLegacies: numLegacies,
    //showNewOrderTotalPrice: parentIDS.length > 3 && newOrder.numLegacies
    showAll: allLoaded && contractFeePercentageLoaded
  }
}

export default connect(mapStateToProps)(BuyArt)