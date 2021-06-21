import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  newArtGen0TokenURIChanged,
  newArtGen0NameChanged,
  newArtFromOrderOrderIDChanged,
  newArtFromOrderTokenURIChanged,
  newArtFromOrderNameChanged,
  newArtFromOrderGenChanged,
  newArtFromOrderParentsChanged,
  newArtFromOrderSiblingsChanged,
  newArtFromOrderBuyerChanged
} from '../store/actions'
import {
  createNewArtGen0,
  createArtFromOrder
} from '../store/interactions'
import {
  accountSelector,
  artFactorySelector,
  tokensSelector,
  updatedNewArtGen0TokenURISelector,
  updatedNewArtGen0NameSelector,
  tokensLoadedSelector,
  updatedNewArtFromOrderOrderIDSelector,
  updatedNewArtFromOrderTokenURISelector,
  updatedNewArtFromOrderGenSelector,
  updatedNewArtFromOrderNameSelector,
  updatedNewArtFromOrderParentsSelector,
  updatedNewArtFromOrderSiblingsSelector,
  updatedNewArtFromOrderBuyerSelector
} from '../store/selectors'

const showGen0 = (props) => {
  const {
    dispatch,
    artFactory,
    tokens,
    account,
    updatedGen0TokenURI,
    updatedGen0Name
  } = props

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      createNewArtGen0(dispatch, artFactory, tokens, updatedGen0TokenURI, updatedGen0Name, account) 
    }}>
      <div className="form-group small">
        <label>Token URI</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Token URI"
          onChange={(e) => dispatch(newArtGen0TokenURIChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Name</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Name"
          onChange={(e) => dispatch(newArtGen0NameChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <button type="submit" className="btn btn-primary btm-sm btn-black">Create Art</button>
    </form>
  )
}

const showFromOrder = (props) => {
  const {
    dispatch,
    artFactory,
    tokens,
    account,
    updatedFromOrderOrderID,
    updatedFromOrderTokenURI,
    updatedFromOrderName,
    updatedFromOrderGen,
    updatedFromOrderParents,
    updatedFromOrderSiblings,
    updatedFromOrderBuyer
  } = props

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      createArtFromOrder(dispatch, artFactory, tokens, updatedFromOrderOrderID, updatedFromOrderTokenURI, updatedFromOrderName, updatedFromOrderGen, updatedFromOrderParents, updatedFromOrderSiblings, updatedFromOrderBuyer, account)
    }}>
      <div className="form-group small">
        <label>Order ID</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="OrderID"
          onChange={(e) => dispatch(newArtFromOrderOrderIDChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Token URI</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Token URI"
          onChange={(e) => dispatch(newArtFromOrderTokenURIChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Name</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Name"
          onChange={(e) => dispatch(newArtFromOrderNameChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Gen</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Gen"
          onChange={(e) => dispatch(newArtFromOrderGenChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Parents</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Parents"
          onChange={(e) => dispatch(newArtFromOrderParentsChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Siblings</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Siblings"
          onChange={(e) => dispatch(newArtFromOrderSiblingsChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <div className="form-group small">
        <label>Buyer</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Buyer"
          onChange={(e) => dispatch(newArtFromOrderBuyerChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
          />
      </div>
      <button type="submit" className="btn btn-primary btm-sm btn-black">Create Art</button>
    </form>
  )
}

class CreateArt extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
            Create Art
        </div>
        <div className="card-body">
          <Tabs defaultActiveKey="gen0" className="bg-dark text-white">
            <Tab eventKey="gen0" title="Gen0" className="bg-dark">
              { this.props.showAllTabs ? showGen0(this.props) : <Spinner type="table"/>}
            </Tab>
            <Tab eventKey="order" title="From Order" className="bg-dark">
              { this.props.showAllTabs ? showFromOrder(this.props) : <Spinner type="table"/>}
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const tokensLoaded = tokensLoadedSelector(state)
  
  return {
    artFactory: artFactorySelector(state),
    tokens: tokensSelector(state),
    account: accountSelector(state),
    updatedGen0TokenURI: updatedNewArtGen0TokenURISelector(state),
    updatedGen0Name: updatedNewArtGen0NameSelector(state),
    updatedFromOrderOrderID: updatedNewArtFromOrderOrderIDSelector(state),
    updatedFromOrderTokenURI: updatedNewArtFromOrderTokenURISelector(state),
    updatedFromOrderName: updatedNewArtFromOrderNameSelector(state),
    updatedFromOrderGen: updatedNewArtFromOrderGenSelector(state),
    updatedFromOrderParents: updatedNewArtFromOrderParentsSelector(state),
    updatedFromOrderSiblings: updatedNewArtFromOrderSiblingsSelector(state),
    updatedFromOrderBuyer: updatedNewArtFromOrderBuyerSelector(state),
    showAllTabs: tokensLoaded
  }
}

export default connect(mapStateToProps)(CreateArt)