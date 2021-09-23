import Editor from '@monaco-editor/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/color.scss';
import { jscript, pythonScript } from '../../helpers/defaultCodes';
import { compileProgram } from '../../redux/actions/problemActions';

class UserDashboard extends Component {
  state = {
    language: "python",
    code: pythonScript,
    input: null,
    sampled: [],
    languages: []
  }
  handleEditor = (value, event) => {
    this.setState({ code: value })
    console.log({ value })
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
  handleSubmit = () => {
    this.props.compileProgram(this.state)
    this.setState({
      sampled: [...this.state.sampled, this.state.input],
      languages: [...this.state.languages, this.state.language === "python" ? "python Solution.py" : "node Solution.js"]
    })
  }
  render() {
    console.log(this.props.output)
    return (
      <div className="container-fluid" style={{ backgroundColor: "#8d5185;", backgroundImage: "linear-gradient(315deg, #8d5185 0%, #a1bafe 74%)", height: "calc(100vh - 60px)", marginTop: "-16px" }}>
        <div className="row d-flex justify-content-center flex-column text-center flex-wrap">
        </div>
        <div className="row text-center ">
          <div className="col-md-6 mb-1">
            <h4 style={{ color: "white" }}>Editor</h4>
            <div className="w-100">
              <Editor
                theme="vs-dark"
                language={this.state.language}
                onChange={this.handleEditor}
                value={this.state.code ? this.state.code : ''}
                height="79vh"
              />
            </div>
            <div className="w-100 d-flex justify-content-between">
              <select
                id="language"
                name="language"
                onChange={this.handleInput}>
                <option>python</option>
                <option>javascript</option>
              </select>
              <button className="btn bg-dark text-success" onClick={this.handleSubmit}>Run Program</button>
            </div>
          </div>
          <div className="col-md-6 h-100" style={{ display: "table" }}>
            <h4 className="" style={{ color: "white" }}>Output</h4>
            <div
              className="w-100 bg-dark text-success text-left mt-2"
              style={{
                border: "1px solid red",
                height: "79vh", overflow: "scroll", maxHeight: "500px"
              }}>
              {this.props.output ?
                this.props.output.map((el, index) => <>
                  <small>>  {
                    this.state.languages[index] ? `> ${this.state.languages[index]}` : null
                  }</small>
                  <pre style={{ color: "white" }}>
                    {this.state.sampled[index] ? `> ${this.state.sampled[index]}` : null}
                  </pre>
                  <pre style={{ color: "white" }}>
                    > {el}
                  </pre>
                </>
                ) : null
              }
              <pre>
              </pre>
            </div>
            <div className="w-100 input-group" style={{ display: "table-row" }}>
              <input
                type="text"
                id="input"
                name="input"
                onChange={this.handleInput}
                placeholder="Enter Input Here" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (storeState) => {
  return { output: storeState.problemState.compiled_output }
}

export default connect(mapStateToProps, { compileProgram })(UserDashboard)
