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
  orderCancellingSelector
} from '../store/selectors'
import { cancelOpenOrder } from '../store/interactions'

const showMyArt = (myArt) => {
  return(
    <tbody>
      { myArt.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>{art.id}</td>
            <td>{art.tokenURI}</td>
            <td>{art.currentOwner}</td>
            {/* <td>
              <img src="https://pngimg.com/uploads/apple/apple_PNG12405.png" alt="my text"></img>
            </td> */}
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showMyAcceptedOrders = (myAcceptedOrders) => {
  return(
    <tbody>
      { myAcceptedOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.gen}</td>
            <td>{order.buyer}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showMyOpenOrders = (props) => {
  const { myOpenOrders, account, artFactory, dispatch } = props
  return(
    <tbody>
      { myOpenOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td>{order.id}</td>
            <td>{order.gen}</td>
            <td>{order.parentIDS.join(',')}</td>
            <td
                className="text-muted cancel-order"
                onClick={(e) => {
                  console.log('button click: cancel order')
                  cancelOpenOrder(dispatch, artFactory, order, account)
                }}
            >X</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

class MyArt extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          My Art
        </div>
        <div className="card-body">
        <Tabs defaultActiveKey="art" className="bg-dark text-white">
            <Tab eventKey="art" title="Art" className="bg-dark">
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
                    <th>Gen</th>
                    <th>Buyer</th>
                  </tr>
                </thead>
                { this.props.myOrdersLoaded ? showMyAcceptedOrders(this.props.myAcceptedOrders) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="open" title="Open Orders" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Gen</th>
                    <th>Parents</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                { this.props.myOrdersLoaded ? showMyOpenOrders(this.props) : <Spinner type="table"/> }
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
    artFactory: artFactorySelector(state)
  }
}

export default connect(mapStateToProps)(MyArt)