import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  purchasesLoadedSelector,
  updatedArtSelector,
  allAcceptedOrdersSelector,
  allOpenOrdersSelector,
  allArtLoadedSelector,
  allOrderTypesLoadedSelector
} from '../store/selectors'

const showAllArt = (updatedArt) => {
  // console.log('showAllArt')
  return(
    <tbody>
      { updatedArt.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>
              <img src={art.tokenURI} alt="N/A" width="100" height="100"></img>
            </td>
            <td className={`text-${art.ownedByCurrentAccount}`}>{art.gen}</td>
            <td className={`text-${art.ownedByCurrentAccount}`}>{art.parents.join(", ")}</td>
            <td className={`text-${art.ownedByCurrentAccount}`}>{art.siblings.join(", ")}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showAllAcceptedOrders = (allAcceptedOrders) => {
  return(
    <tbody>
      { allAcceptedOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.id}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.formattedPrice}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.gen}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.parentIDS.join(", ")}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.numLegacies}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const showAllOpenOrders = (allOpenOrders) => {
  return(
    <tbody>
      { allOpenOrders.map((order) => {
        return(
          <tr className={`order-${order.id}`} key={order.id}>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.id}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.formattedPrice}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.gen}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.parentIDS.join(", ")}</td>
            <td className={`text-${order.createdByCurrentAccount}`}>{order.numLegacies}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

class ArtTokens extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
            Community
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
                { this.props.allArtLoaded ? showAllArt(this.props.updatedArt) : <Spinner type="table"/> }
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
                { this.props.allOrdersLoaded ? showAllAcceptedOrders(this.props.allAcceptedOrders) : <Spinner type="table"/> }
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
                { this.props.allOrdersLoaded ? showAllOpenOrders(this.props.allOpenOrders) : <Spinner type="table"/> }
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

  return {
    allArtLoaded: allArtLoaded && allPurchasesLoaded,
    allOrdersLoaded: allArtLoaded && allOrderTypesLoaded,
    updatedArt: updatedArtSelector(state),
    allAcceptedOrders: allAcceptedOrdersSelector(state),
    allOpenOrders: allOpenOrdersSelector(state)
  }
}

export default connect(mapStateToProps)(ArtTokens)