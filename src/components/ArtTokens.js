import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  artGen0LoadedSelector,
  purchasesLoadedSelector,
  updatedArtSelector,
  allAcceptedOrdersSelector,
  allOpenOrdersSelector
} from '../store/selectors'

const showAllArt = (updatedArt) => {
  // console.log('showAllArt')
  return(
    <tbody>
      { updatedArt.map((art) => {
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

const showAllAcceptedOrders = (allAcceptedOrders) => {
  return(
    <tbody>
      { allAcceptedOrders.map((order) => {
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

const showAllOpenOrders = (allOpenOrders) => {
  return(
    <tbody>
      { allOpenOrders.map((order) => {
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

class ArtTokens extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
            Art
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
                { this.props.allArtAndPurchasesLoaded ? showAllArt(this.props.updatedArt) : <Spinner /> }
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
                { showAllAcceptedOrders(this.props.allAcceptedOrders) }
              </table>
            </Tab>
            <Tab eventKey="open" title="Open Orders" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Gen</th>
                    <th>Buyer</th>
                  </tr>
                </thead>
                { showAllOpenOrders(this.props.allOpenOrders) }
                {/* { this.props.showOpenOrders ? showMyOpenOrders(this.props) : <Spinner type="table" />} */}
              </table>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const artGen0Loaded = artGen0LoadedSelector(state)
  const purchasesLoaded = purchasesLoadedSelector(state)

  return {
    allArtAndPurchasesLoaded: artGen0Loaded && purchasesLoaded,
    updatedArt: updatedArtSelector(state),
    allAcceptedOrders: allAcceptedOrdersSelector(state),
    allOpenOrders: allOpenOrdersSelector(state)
  }
}

export default connect(mapStateToProps)(ArtTokens)