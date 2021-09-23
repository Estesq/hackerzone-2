import React, { Component } from 'react'
import { connect } from 'react-redux'
import { endedContests, liveContests, upcomingContests } from '../../redux/actions/contestActions'
import '../../assets/css/DisplayContestList.scss'
import ContestItem from '../../components/User/Contest/ContestItem'
import Breadcrumbs from '../../components/Layout/Breadcrumb'
import Loader from '../../components/Layout/Loader'
import TabModel from '../../components/Layout/TabModel'

class ContestList extends Component {
  state = {
    tabid: 0
  }
  componentDidMount = () => {
    this.props.liveContests()
    this.props.upcomingContests()
    this.props.endedContests()
  }
  handleTab = (tabid) => {
    this.setState({
      tabid
    })
  }
  render() {
    return this.props.liveList &&
      this.props.upcomingList &&
      this.props.endedList ? (
      <>
        <Breadcrumbs bread={[
          { title: "Contest", link: `/contests` },
          { title: "Challenge", link: `/contests` },
        ]} />
        <div className="container">
          <div className="row">


            <div className="col-lg-12">
              <div className="main-box clearfix">
                <div className="table-responsive bg-light" style={{ paddingTop: "-150px" }}>
                  <TabModel tabdata={["Live", "Upcoming", "Ended"]} handleTabmodel={this.handleTab} >
                    {this.state.tabid === 0 ?
                      this.props.liveList ?
                        <>
                          <table className="table user-list">
                            <tbody>
                              {this.props.liveList.length > 0 ?
                                this.props.liveList.map(el => <ContestItem list={el} />)
                                : <tr><td colSpan="3"><p className="text-center text-secondary">N/A</p></td></tr>}
                            </tbody>
                          </table>
                        </> : <Loader /> :
                      this.state.tabid === 1 ?
                        this.props.upcomingList ?
                          <>
                            <table className="table user-list">
                              <tbody>
                                {this.props.upcomingList.length > 0 ?
                                  this.props.upcomingList.map(el => <ContestItem list={el} />)
                                  : <tr><td colSpan="3"><p className="text-center text-secondary">N/A</p></td></tr>}
                              </tbody>
                            </table>
                          </> : <Loader /> :
                        this.props.endedList ?
                          <>
                            <table className="table user-list">
                              <tbody>
                                {this.props.endedList.length > 0 ?
                                  this.props.endedList.map(el => <ContestItem list={el} />)
                                  : <tr><td colSpan="3"><p className="text-center text-secondary">N/A</p></td></tr>}
                              </tbody>
                            </table>
                          </> : <Loader />}
                  </TabModel>
                </div>

              </div>
            </div>
          </div>
        </div >
      </>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return {
    liveList: storeState.contestState.live_contests,
    upcomingList: storeState.contestState.upcoming_contests,
    endedList: storeState.contestState.ended_contests,
  }
}


export default connect(mapStateToProps, {
  liveContests,
  upcomingContests,
  endedContests
})(ContestList)
