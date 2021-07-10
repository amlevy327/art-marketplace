import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  myAcceptedOrdersSelector,
  myOpenOrdersSelector,
  updatedMyArtSelector,
  allArtLoadedSelector,
  purchasesLoadedSelector,
  allOrderTypesLoadedSelector,
  accountSelector,
  artFactorySelector,
  orderCancellingSelector,
  balanceLoadedSelector,
  balanceSelector
} from '../store/selectors'
import { loadBalance, withdrawBalance, cancelOpenOrder } from '../store/interactions'

const showMyArt = (myArt) => {
  return(
    <tbody>
      { myArt.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>
              <img src={art.tokenURI} alt="N/A" width="100" height="100"></img>
            </td>
            <td>{art.gen}</td>
            <td>{art.parents.join(", ")}</td>
            <td>{art.siblings.join(", ")}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showMyAcceptedOrders = (props) => {
  const {
    myAcceptedOrders,
    myArt
  } = props
  return(
    <tbody>
      { myAcceptedOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.formattedPrice}</td>
            <td>{order.gen}</td>
            {/* <td>{order.parentIDS.join(", ")}</td> */}
            <td>{showParents(order.parentIDS, myArt)}</td>
            {/* { showParents(order.parentIDS) } */}
            <td>{order.numLegacies}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showParents = (parentIDS, myArt) => {
  { parentIDS.map((parent) => {
    console.log("show parents, parent ID: ", parent)
    const art = myArt.filter((a) => a.id === parent)
    console.log("show parents, art: ", art)
    return(
      <img src={art.tokenURI} alt="N/A" width="100" height="100"></img>
    )
  })
  }
}

const showMyOpenOrders = (props) => {
  const { myOpenOrders, account, artFactory, dispatch } = props
  return(
    <tbody>
      { myOpenOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.formattedPrice}</td>
            <td>{order.gen}</td>
            <td>{order.parentIDS.join(", ")}</td>
            <td>{order.numLegacies}</td>
            <td
                className="text-muted cancel-order"
                onClick={(e) => {
                  console.log('button click: cancel order')
                  cancelOpenOrder(dispatch, artFactory, order, account)
                }}
            >Cancel</td>
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

class ProfileNonArtist extends Component {
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
          User Profile
        </div>
        <div className="card-body">
        <Tabs defaultActiveKey="art" className="bg-dark text-white">
            <Tab eventKey="art" title="Art" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th></th>
                    <th>Gen</th>
                    <th>Parents</th>
                    <th>Siblings</th>
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
                { this.props.myOrdersLoaded ? showMyAcceptedOrders(this.props) : <Spinner type="table"/> }
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
                { this.props.myOrdersLoaded ? showMyOpenOrders(this.props) : <Spinner type="table"/> }
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
  const allOrderTypesLoaded = allOrderTypesLoadedSelector(state)
  const orderCancelling = orderCancellingSelector(state)

  return {
    myArtLoaded: allArtLoaded && allPurchasesLoaded,
    myOrdersLoaded: allArtLoaded && allOrderTypesLoaded && !orderCancelling,
    myArt: updatedMyArtSelector(state),
    myAcceptedOrders: myAcceptedOrdersSelector(state),
    myOpenOrders: myOpenOrdersSelector(state),
    account: accountSelector(state),
    artFactory: artFactorySelector(state),
    balanceLoaded: balanceLoadedSelector(state),
    balance: balanceSelector(state),
  }
}

export default connect(mapStateToProps)(ProfileNonArtist)