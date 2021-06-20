import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'

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
            </Tab>
            <Tab eventKey="order" title="From Order" className="bg-dark">
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(CreateArt)