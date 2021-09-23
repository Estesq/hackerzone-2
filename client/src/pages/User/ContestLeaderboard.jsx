import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumbs from '../../components/Layout/Breadcrumb'
import Loader from '../../components/Layout/Loader'
import { contestLeaderboard } from '../../redux/actions/leaderboardActions'


class ContestLeaderboard extends Component {

  componentDidMount = () => {
    this.props.contestLeaderboard({ contest: this.props.match.params.name })
  }
  render() {
    return this.props.leaderboard ? (
      <>
        <Breadcrumbs
          bread={[
            { title: "Contest", link: `/contests/${this.props.match.params.name}/challenges` },
            { title: "Challenge", link: `/contests` },
          ]
          } />
        <div className="container">
          <div className="row">
            <div className="h2">Leaderboard</div>
            <div className="col-12">
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
                  {this.props.leaderboard.length > 0 ?
                    this.props.leaderboard.map(el => <tr>
                      <td>{el.ranking + 1}</td>
                      <td>{el.users.user}</td>
                      <td>{el.users.points}</td>
                      <td></td>
                    </tr>) : (
                      <tr>
                        <td colSpan="4">Noone Submitted Anything yet!</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return { leaderboard: storeState.leaderboardeState.contest_leaderboard }
}


export default connect(mapStateToProps, { contestLeaderboard })(ContestLeaderboard)
