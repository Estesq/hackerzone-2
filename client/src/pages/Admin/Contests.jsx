import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableChallenge from '../../components/Admin/Contest/TableChallenge'
import TableLeaderboard from '../../components/Admin/Contest/TableLeaderboard'
import Loader from '../../components/Layout/Loader'
import TabModel from '../../components/Layout/TabModel'
import { creatorContests, loadContest } from '../../redux/actions/contestActions'
import { contestLeaderboard } from '../../redux/actions/leaderboardActions'

class Contests extends Component {
  state = {
    tabid: 0,
    name: ''
  }
  componentDidMount = () => {
    this.props.creatorContests()
  }
  handleSelect = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }
  handleTab = (tabid) => {
    this.setState({
      tabid
    })
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.name !== prevState.name && this.state.name !== '') {
      this.props.loadContest({ name: this.state.name })
      this.props.contestLeaderboard({ contest: this.state.name })
    }
  }
  render() {
    return this.props.contests ? (
      <>
        <div className="container ">
          <div className=" col-12 pt-3 d-flex justify-content-center">
            Contest Name:
          <select name="name" id="" defaultValue={this.state.name} onChange={this.handleSelect}>
              <option value=''>Select Contest</option>
              {this.props.contests.map(el => <option>{el.name}</option>)}
            </select>
          </div>
          <div className="col-12">
            <TabModel tabdata={["Challenges", "Leaderboard"]} handleTabmodel={this.handleTab}>
              {
                this.state.tabid === 0 ? (
                  <>
                    {this.props.challengeList ?
                      <TableChallenge tabledata={this.props.challengeList.challenges} /> : <Loader />
                    }
                  </>
                ) :
                  this.state.tabid === 1 ? (
                    <>
                      {this.props.leaderboard ?
                        <TableLeaderboard tabledata={this.props.leaderboard} /> : <Loader />
                      }
                    </>
                  ) : null
              }
            </TabModel>
          </div>
        </div>
      </>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return {
    contests: storeState.contestState.admin_contests,
    challengeList: storeState.contestState.contest_data,
    leaderboard: storeState.leaderboardeState.contest_leaderboard,
  }
}


export default connect(mapStateToProps, { creatorContests, loadContest, contestLeaderboard })(Contests)
