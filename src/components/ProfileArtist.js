import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  accountSelector,
  allOpenOrdersSelector,
  allAcceptedOrdersSelector,
  allOrderTypesLoadedSelector,
  artFactorySelector,
  allArtLoadedSelector,
  purchasesLoadedSelector,
  updatedMyArtSelector,
  balanceLoadedSelector,
  balanceSelector
} from '../store/selectors'
import { acceptOpenOrder, loadBalance, withdrawBalance } from '../store/interactions'

const showMyArt = (myArt) => {
  return(
    <tbody>
      { myArt.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>{art.id}</td>
            <td>{art.tokenURI}</td>
            <td>{art.currentOwner}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showAllAcceptedOrders = (props) => {
  const {
    allAcceptedOrders,
    dispatch,
    artFactory,
    account
  } = props
  
  console.log('allAcceptedOrders: ', allAcceptedOrders)

  return(
    <tbody>
      { allAcceptedOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.price}</td>
            <td>{order.gen}</td>
            <td>{order.parentIDS.join(", ")}</td>
            <td>{order.numLegacies}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showAllOpenOrders = (props) => {
  const {
    allOpenOrders,
    dispatch,
    artFactory,
    account
  } = props
  
  console.log('allOpenOrders: ', allOpenOrders)

  return(
    <tbody>
      { allOpenOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.price}</td>
            <td>{order.gen}</td>
            <td>{order.parentIDS.join(", ")}</td>
            <td>{order.numLegacies}</td>
            <td
                className="text-muted cancel-order"
                onClick={(e) => {
                  console.log('button click: accept order')
                  acceptOpenOrder(dispatch, artFactory, order, account)
                }}
            >Accept</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showBalance = (props) => {
  const {
    dispatch,
    artFactory,
    account,
    balance
  } = props
  
  //console.log('allOpenOrders: ', allOpenOrders)

  return(
    <tbody>
      <tr >
        <td>{balance}</td>
        <td
            className="text-muted cancel-order"
            onClick={(e) => {
              console.log('button click: withdraw balance')
              withdrawBalance(dispatch, artFactory, account)
            }}
        >Withdraw</td>
      </tr>
    </tbody>
  )
}

class ProfileArtist extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  
  async loadBlockchainData() {
    const { dispatch, web3, artFactory, account } = this.props
    await loadBalance(dispatch, web3, artFactory, account)
  }

  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Artist Profile
        </div>
        <div className="card-body">
        <Tabs defaultActiveKey="art" className="bg-dark text-white">
            <Tab eventKey="art" title="Art For Sale" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TokenURI</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                { this.props.myArtLoaded ? showMyArt(this.props.myArt) : <Spinner type="table"/>}
              </table>
            </Tab>
            <Tab eventKey="accepted" title="Accepted Orders" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Gen</th>
                    <th>Parent IDs</th>
                    <th>Num Legacies</th>
                  </tr>
                </thead>
                { this.props.allOrderTypesLoaded ? showAllAcceptedOrders(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="open" title="Open Orders" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Gen</th>
                    <th>Parent IDs</th>
                    <th>Num Legacies</th>
                  </tr>
                </thead>
                { this.props.allOrderTypesLoaded ? showAllOpenOrders(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="balance" title="Balance" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>Balance</th>
                  </tr>
                </thead>
                { this.props.balanceLoaded ? showBalance(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const allArtLoaded = allArtLoadedSelector(state)
  const allPurchasesLoaded = purchasesLoadedSelector(state)

  return {
    artFactory: artFactorySelector(state),
    account: accountSelector(state),
    allOpenOrders: allOpenOrdersSelector(state),
    allAcceptedOrders: allAcceptedOrdersSelector(state),
    allOrderTypesLoaded: allOrderTypesLoadedSelector(state),
    myArtLoaded: allArtLoaded && allPurchasesLoaded,
    myArt: updatedMyArtSelector(state),
    balanceLoaded: balanceLoadedSelector(state),
    balance: balanceSelector(state)
  }
}

export default connect(mapStateToProps)(ProfileArtist)