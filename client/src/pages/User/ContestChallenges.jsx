import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/Layout/Breadcrumb'
import Loader from '../../components/Layout/Loader'
import ChallengeSnippet from '../../components/User/Challenge/ChallengeSnippet'
import { loadContest } from '../../redux/actions/contestActions'
import { selfContestRank } from '../../redux/actions/leaderboardActions'
import '../../assets/css/color.scss'

class ContestChallenges extends Component {
  componentDidMount = () => {

    this.props.loadContest(this.props.match.params)
    this.props.selfContestRank({ contest: this.props.match.params.name })
  }
  render() {
    console.log(this.props.rank)
    return this.props.challengeList ? (
      <>

        <Breadcrumbs
          bread={[
            { title: "Contest", link: `/contests/${this.props.match.params.name}` },
            { title: "Challenge" },
          ]} />
        <div className="container">
          <div className="row">
            <h5 className="display-5 pl-0 pr-3 pt-3 pb-1">
              <strong>
                {this.props.match.params.name}
              </strong>

            </h5>
            {this.props.challengeList ?
              <h5 style={{ verticalAlign: "middle", lineHeight: "60px" }}>
                <span className="ring-container">
                  <div className={`ringring ${this.props.challengeList.status}`}></div>
                  <div className={`circle ${this.props.challengeList.status}`}></div>
                </span>
                <sup>{this.props.challengeList.status}</sup>
              </h5>
              : null}
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-9">
              <h6 className="display-6 pl-0 pr-3 pt-3 pb-1"><strong>Challenges</strong></h6>
              {this.props.challengeList.challenges.map((el) => <ChallengeSnippet data={el} contestname={this.props.challengeList.name} key={el.name} />)}

            </div>
            <div className="col-md-3">
              <h6 className="display-6 pl-0 pr-3 pt-3 pb-1"><strong>Current Rank: {this.props.rank ? this.props.rank.length > 0 ? this.props.rank[0].ranking + 1 : "N/A" : "N/A"}</strong>
              </h6>
              <div>
                <Link to={`/contests/${this.props.match.params.name}/leaderboard/all`}>
                  <i className="fas fa-trophy pt-3 pb-0 px-3 text-secondary" style={{ fontSize: "1.2em" }}></i>
            Current Leaderboard
          </Link>
                <Link to={`/contests/${this.props.match.params.name}/submissions/all`}>
                  <i className="fas fa-list pt-3 pb-0 px-3 text-secondary" style={{ fontSize: "1.2em" }}></i>
            Review Submissions
          </Link>
              </div>


            </div>
          </div>
        </div>
      </>) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return {
    challengeList: storeState.contestState.contest_data,
    rank: storeState.leaderboardeState.self_rank
  }
}

export default connect(mapStateToProps, { loadContest, selfContestRank })(ContestChallenges)
