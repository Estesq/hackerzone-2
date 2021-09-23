import React, { Component } from 'react'
import '../../assets/css/color.scss'
import { addChallenge } from '../../redux/actions/problemActions';
import { connect } from 'react-redux';
import TabModel from '../../components/Layout/TabModel';
import ChallengeDesc from '../../components/Admin/Challenge/ChallengeDesc';
import ChallengeSamples from '../../components/Admin/Challenge/ChallengeSamples';
import ChallengeTests from '../../components/Admin/Challenge/ChallengeTests';


class CreateChallenge extends Component {
  state = {
    name: '',
    description: '',
    samples: [],
    test_cases: [],
    level: 'Easy',
    points: 5,
    languages: [],
    sample_input: '',
    sample_output: '',
    test_input: '',
    test_output: ''
  }
  handleDescription = (event, editor) => {
    const data = editor.getData();
    this.setState({
      description: data
    })
  }
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }
  handleSample = () => {
    let s = this.state.samples
    const { sample_input, sample_output } = this.state
    if (sample_input !== '' || sample_output !== '') {
      s.push({ sample_input, sample_output })
      this.setState({
        samples: s
      })
      this.setState({
        sample_input: '',
        sample_output: ''
      })
    }

  }
  handleTab = (tabid) => {
    this.setState({
      tabid
    })
  }
  handleSubmit = async () => {
    const {
      name, description, samples, test_cases, level, points, languages
    } = this.state
    this.props.addChallenge({ name, description, samples, test_cases, level, points, languages })
    this.setState({
      tabid: 0,
      name: '',
      description: '',
      samples: [],
      test_cases: [],
      level: 'Easy',
      points: 5,
      languages: [],
      sample_input: '',
      sample_output: '',
      test_input: '',
      test_output: ''
    })
  }
  handleTestcases = () => {

    let t = this.state.test_cases
    const { test_input, test_output } = this.state
    if (test_input !== '' || test_output !== '') {
      t.push({ test_input, test_output })
      this.setState({
        test_cases: t
      })
      this.setState({
        test_input: '',
        test_output: ''
      })
    }
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
          <p className="h2 py-1 pl-5">Create Challenge</p>
          <button className="btn btn-hack h-75" onClick={this.handleSubmit}>Submit</button>
        </div>
        <div style={{ height: "50px", marginBottom: "50px" }}></div>
        <TabModel handleTabmodel={this.handleTab} tabdata={["Description", "Samples", "Testcases"]}>
          {this.state.tabid === 0 ?
            (
              <ChallengeDesc
                handleInputProp={this.handleInput}
                handleDescriptionProp={this.handleDescription}
                stateValues={this.state}
              />
            )
            : this.state.tabid === 1 ?
              (
                <ChallengeSamples
                  handleInputProp={this.handleInput}
                  stateValues={this.state}
                  handleSampleProp={this.handleSample}
                />

              ) : this.state.tabid === 2 ? (
                <ChallengeTests
                  handleInputProp={this.handleInput}
                  stateValues={this.state}
                  handleTestcasesProp={this.handleTestcases}
                />
              ) : null}
        </TabModel>

      </>
    )
  }
}


export default connect(null, { addChallenge })(CreateChallenge)
