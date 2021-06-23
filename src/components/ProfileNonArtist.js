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

const showMyAcceptedOrders = (myAcceptedOrders) => {
  return(
    <tbody>
      { myAcceptedOrders.map((order) => {
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

const showMyOpenOrders = (props) => {
  const { myOpenOrders, account, artFactory, dispatch } = props
  return(
    <tbody>
      { myOpenOrders.map((order) => {
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

class ProfileNonArtist extends Component {
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
                { this.props.myOrdersLoaded ? showMyAcceptedOrders(this.props.myAcceptedOrders) : <Spinner type="table"/> }
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

export default connect(mapStateToProps)(ProfileNonArtist)