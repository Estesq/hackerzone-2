import React, { Component } from 'react'
import { connect } from 'react-redux'
import TestChallenges from '../../components/Admin/Contest/TestChallenges'
import TestDesc from '../../components/Admin/Contest/TestDesc'
import Loader from '../../components/Layout/Loader'
import TabModel from '../../components/Layout/TabModel'
import { addContest } from '../../redux/actions/contestActions'
import { ownChallenges } from '../../redux/actions/problemActions'

class CreateTest extends Component {
  state = {
    tabid: 0,
    name: '',
    overview: '',
    start_date: new Date(),
    end_date: new Date(),
    description: '',
    tagline: '',
    challenges: null
  }
  handleTab = (tabid) => {
    this.setState({
      tabid
    })
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleStart = (e) => {
    this.setState({ start_date: e })
  }
  handleEnd = (e) => {
    this.setState({ end_date: e })
  }
  handleDescription = (event, editor) => {
    const data = editor.getData();
    this.setState({
      description: data
    })
  }
  handleOverview = (event, editor) => {
    const data = editor.getData();
    this.setState({
      overview: data
    })
  }

  componentDidMount = () => {
    this.props.ownChallenges()
  }
  handleChallenge = (data) => {
    const data_id = data.map((d) => d._id)
    this.setState({
      challenges: data_id

    })
  }
  handleSubmit = () => {
    this.props.addContest(this.state)
  }
  render() {
    return (
      <>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            position: "absolute",
            width: "calc(100% - 15px)",
            right: "15px",
            zIndex: 1
          }}>
          <p className="h2 py-1 pl-5">Create Test</p>
          <button className="btn btn-hack h-75" onClick={this.handleSubmit}>Submit</button>
        </div>
        <div style={{ height: "50px", marginBottom: "50px" }}></div>
        <TabModel handleTabmodel={this.handleTab} tabdata={["Description", "Challenges"]}>
          {this.state.tabid === 0 ?
            (
              <TestDesc

                handleInputProp={this.handleInput}
                handleStartProp={this.handleStart}
                handleEndProp={this.handleEnd}
                handleOverviewProp={this.handleOverview}
                handleDescriptionProp={this.handleDescription}
                stateValues={this.state}
              />
            )
            : this.state.tabid === 1 ?
              (
                this.props.challengeList ?
                  (
                    <TestChallenges
                      tableData={this.props.challengeList}
                      handleAdd={this.handleChallenge}
                    />
                  ) : <Loader />
              ) : null}
        </TabModel>
      </>
    )
  }
}

const mapStateToProps = (storeState) => {
  return { challengeList: storeState.problemState.own_challenges }
}



export default connect(mapStateToProps, { ownChallenges, addContest })(CreateTest)
