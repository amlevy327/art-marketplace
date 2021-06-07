import React, { Component } from 'react'
import { connect } from "react-redux"
import Spinner from './Spinner'
import {
  artGen0LoadedSelector,
  purchasesLoadedSelector,
  updatedArtSelector
} from '../store/selectors'

const showAllArt = (updatedArt) => {
  console.log('showAllArt')
  return(
    <tbody>
      { updatedArt.map((art) => {
        return(
          <tr className={`order-${art.id}`} key={art.id}>
            <td>{art.id}</td>
            <td>{art.tokenURI}</td>
            <td>{art.currentOwner ? art.currentOwner : art.owner}</td>
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
                  { this.props.allArtAndPurchasesLoaded ? showAllArt(this.props.updatedArt) : <Spinner /> }
              </table >
          </div>
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
    updatedArt: updatedArtSelector(state)
  }
}

export default connect(mapStateToProps)(ArtTokens)