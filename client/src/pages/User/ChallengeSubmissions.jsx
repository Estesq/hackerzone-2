import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loader from '../../components/Layout/Loader'
import ChallengePlayground from '../../components/User/Challenge/ChallengePlayground'
import { challengeSubmissions } from '../../redux/actions/submitActions'
import '../../assets/css/Table.css'

class ChallengeSubmissions extends Component {
  componentDidMount = () => {
    let { name, challenge } = this.props.match.params
    this.props.challengeSubmissions({ contest: name, challenge })
  }
  render() {
    console.log("testmandi", this.props.challengeSubmitList)
    return this.props.challengeSubmitList ? (
      <ChallengePlayground paramdata={this.props.match.params} activetab="submissions">
        <table className="table striped">
          <thead>
            <tr>
              <th>Challenge</th>
              <th>
                Status
              </th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.challengeSubmitList.length > 0 ?
              this.props.challengeSubmitList.map((el, index) => <tr key={index}>
                <td>{el.challenge}</td>
                <td>{el.status}</td>
                <td>{el.score}</td>
                <td></td>
              </tr>) :
              (<td colSpan="3">Not Submitted anything yet</td>)}
          </tbody>
        </table>
      </ChallengePlayground>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return { challengeSubmitList: storeState.submitState.challenge_submissions }
}



export default withRouter(connect(mapStateToProps, { challengeSubmissions })(ChallengeSubmissions))
