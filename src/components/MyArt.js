import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import { myAcceptedOrdersSelector, myOpenOrdersSelector, updatedMyArtSelector } from '../store/selectors'

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

const showMyOpenOrders = (myOpenOrders) => {
  return(
    <tbody>
      { myOpenOrders.map((order) => {
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
                { showMyArt(this.props.myArt) }
                {/* { this.props.showFilledOrders ? showMyFilledOrders(this.props) : <Spinner type="table" /> } */}
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
                { showMyAcceptedOrders(this.props.myAcceptedOrders) }
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
                { showMyOpenOrders(this.props.myOpenOrders) }
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
  return {
    myArt: updatedMyArtSelector(state),
    myAcceptedOrders: myAcceptedOrdersSelector(state),
    myOpenOrders: myOpenOrdersSelector(state)
  }
}

export default connect(mapStateToProps)(MyArt)