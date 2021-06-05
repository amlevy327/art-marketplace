import React, { Component } from 'react'
import { connect } from "react-redux"
import Spinner from './Spinner'
import {
  artGen0LoadedSelector,
  artGen0Selector
} from '../store/selectors'

const showArtGen0 = (artGen0) => {
  return(
    <tbody>
      { artGen0.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>{art.id}</td>
            <td>{art.tokenURI}</td>
            <td>{art.owner}</td>
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

class ArtTokens extends Component {
  render() {
    return (
      <div className="vertical">
        <div className="card bg-dark text-white">
          <div className="card-header">
            All Art
          </div>
          <div className="card-body">
              <table className="table table-dark table-sm small">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>TokenURI</th>
                          <th>Owner</th>
                      </tr>
                  </thead>
                  { this.props.artGen0Loaded ? showArtGen0(this.props.artGen0) : <Spinner type="table" />}
              </table >
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    artGen0Loaded: artGen0LoadedSelector(state),
    artGen0: artGen0Selector(state)
  }
}

export default connect(mapStateToProps)(ArtTokens)