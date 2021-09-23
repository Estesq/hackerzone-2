import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loader from '../../components/Layout/Loader'
import ChallengePlayground from '../../components/User/Challenge/ChallengePlayground'
import { challengeLeaderboard } from '../../redux/actions/leaderboardActions'

class ChallengeLeaderboard extends Component {
  componentDidMount = () => {
    this.props.challengeLeaderboard({ contest: this.props.match.params.name, challenge: this.props.match.params.challenge })
  }
  render() {
    return this.props.challengeRank ? (
      <ChallengePlayground paramdata={this.props.match.params} activetab="leaderboard">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.challengeRank.length > 0 ?
              this.props.challengeRank.map(el => <tr>
                <td>{el.ranking + 1}</td>
                <td>{el.users.user}</td>
                <td>{el.users.points}</td>
                <td></td>
              </tr>) :
              <td colspan="4">Noone submitted anything to this challenge yet!</td>
            }
          </tbody>
        </table>
      </ChallengePlayground>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return { challengeRank: storeState.leaderboardeState.challenge_leaderboard }
}


export default withRouter(connect(mapStateToProps, { challengeLeaderboard })(ChallengeLeaderboard))
