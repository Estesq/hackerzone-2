import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import parse from 'html-react-parser';
import ChallengePlayground from '../../components/User/Challenge/ChallengePlayground'
import Output from '../../components/User/Challenge/Output'
import { loadProblem } from '../../redux/actions/contestActions';
import Loader from '../../components/Layout/Loader';
import { runProgram } from '../../redux/actions/problemActions';
import { submitProblem } from '../../redux/actions/submitActions';
import { jscript, pythonScript } from '../../helpers/defaultCodes';

class ChallengeProblem extends Component {
  state = {
    language: 'python',
    code: pythonScript
  }
  componentDidMount = () => {
    this.props.loadProblem(this.props.match.params)
  }
  handleEditor = (value, event) => {
    this.setState({ code: value })
  }
  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value === "python") {
      this.setState({
        code: pythonScript
      })
    }
    else if (e.target.value === "javascript") {
      this.setState({
        code: jscript
      })
    }
  }
  handleRun = async (samples, node, event) => {
    if (this.props.problem) {
      let { language, code } = this.state

      this.props.runProgram(language, code, samples, this.props.problem.name)
    }
    if (this.props.output) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }
  handleSubmit = () => {
    let { language, code } = this.state
    let { name, challenge } = this.props.match.params
    let { test_cases, points } = this.props.problem
    let submitObj = { language, script: code, contest: name, challenge, test_cases, points }
    this.props.submitProblem(submitObj)
  }
  render() {
    return this.props.problem ? (
      <ChallengePlayground paramdata={this.props.match.params} activetab="problem">


        <div className="col-md-9  bg-light">
          <div className="col-md-12 bg-light pt-2 pb-3">
            {parse(this.props.problem.description)}
          </div>
          <div className="col-md-12 mt-5 pb-4 bg-light pl-0 pr-0" >
            <div className="col-md-12 d-flex justify-content-end">
              <div className="form-group w-40 pt-2">
                <select
                  className="form-control"
                  onChange={this.handleSelect}
                  value={this.state.language}
                  name="language"
                  id="language">
                  {/* {this.props.problem.languages.map(el => {
                    return <option key={el}>{el}</option>
                  })} */}
                  <option>python</option>
                  <option>javascript</option>
                </select>
              </div>
            </div>
            <Editor
              theme="vs-dark"
              language={this.state.language}
              onChange={this.handleEditor}
              height="60vh"
              value={this.state.code ? this.state.code : ''}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-end">
            <div className="w-40 pt-3 pb-3">
              <button
                className="btn btn-dark text-success"
                onClick={() =>
                  this.handleRun(this.props.problem.samples,
                    this.result)}>Run Script</button>
              <button
                className="btn btn-success text-dark ml-3"
                onClick={this.handleSubmit}>
                Submit
                    </button>
            </div>
          </div>
          <div className="w-100 py-1 my-5" ref={(node) => this.result = node} style={{ minHeight: "30vh", backgroundColor: "#eee" }}>

            {this.props.output.length > 0 ?
              (this.props.output.filter(el => el.name === this.props.match.params.challenge).length > 0 ?
                (<Output output={this.props.output.filter(el => el.name === this.props.match.params.challenge)
                [this.props.output.filter(el => el.name === this.props.match.params.challenge).length - 1]} />)
                : null)
              : null
            }

          </div>
        </div>
        <div className="col-md-3">
          <div className="w-100">
            <strong className="text-secondary">Max Points:</strong> {this.props.problem.points}
          </div>
          <div className="w-100">
            <strong className="text-secondary">Difficulty:</strong> {this.props.problem.level}
          </div>
        </div>


      </ChallengePlayground>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return {
    problem: storeState.contestState.problem_data,
    output: storeState.problemState.problem_output
  }
}



export default withRouter(connect(mapStateToProps, { submitProblem, loadProblem, runProgram })(ChallengeProblem))
