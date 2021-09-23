import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../assets/css/ContestPage.scss'
import intro from '../../assets/images/intro-bg.jpg'
import Loader from '../../components/Layout/Loader'
import { loadContest } from '../../redux/actions/contestActions'
import '../../assets/css/color.scss'

class ContestPage extends Component {
  componentDidMount = () => {

    this.props.loadContest(this.props.match.params)
  }
  render() {
    return this.props.challengeList ? (
      <>
        <section id="intro" style={{ background: `url(${intro}) top center`, marginTop: "-72px", paddingTop: "72px" }}>
          <div className="intro-container" data-aos="zoom-in" data-aos-delay="100">
            <h1 className="mb-4 pb-0">
              <strong><span>
                {this.props.challengeList.name}
              </span></strong>
            </h1>


            <p className="mb-4 pb-0">STARTS @: {new Date(this.props.challengeList.data.start_date).toUTCString()}</p>
            <p className="mb-4 pb-0">ENDS @: {new Date(this.props.challengeList.data.end_date).toUTCString()}</p>
            <p><Link
              className="btn btn-hack" style={{ zIndex: 999 }}
              to={`/contests/${this.props.challengeList.name}/challenges`}
            >
              {this.props.challengeList.status === "Live"
                ?
                "Enter Contest"
                :
                this.props.challengeList.status === "Upcoming"
                  ?
                  "Sign Up"
                  :
                  "Explore"
              }
            </Link>
            </p>
          </div>
        </section>
      </>
    ) : <Loader />
  }
}


const mapStateToProps = (storeState) => {
  return { challengeList: storeState.contestState.contest_data }
}

export default connect(mapStateToProps, { loadContest })(ContestPage)
