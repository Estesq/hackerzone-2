import React, { Component } from 'react'

class ChallengeTests extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-3">Test cases</div>
        <div className="col-md-9 d-flex justify-content-around flex-wrap">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="test_input">Test case Input</label>
              <textarea
                className="form-control"
                name="test_input"
                onChange={this.props.handleInputProp}
                id="test_input"
                rows="3"
                value={this.props.stateValues.test_input}
              >
              </textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="test_output">Test case Output</label>
              <textarea
                className="form-control"
                name="test_output"
                onChange={this.props.handleInputProp}
                id="test_output"
                rows="3"
                value={this.props.stateValues.test_output}
              >
              </textarea>
            </div>
          </div>
          <div className="col-6">
            {
              this.props.stateValues.test_cases.length > 0 ?
                (
                  <ul className="list-group">
                    {this.props.stateValues.test_cases.map((el, index) => {
                      return (<li className="list-group-item">
                        <span className="">case : {index + 1} -</span>
                        <code>
                          {el.test_input}
                        </code>
                      </li>)
                    })}
                  </ul>
                )
                : null
            }
          </div>

          <div className="col-6">
            {
              this.props.stateValues.test_cases.length > 0 ?
                (
                  <ul className="list-group">
                    {this.props.stateValues.test_cases.map((el, index) => {
                      return (<li className="list-group-item">
                        <span className="">case : {index + 1} -</span>
                        <code>
                          {el.test_output}
                        </code>
                      </li>)
                    })}
                  </ul>
                )
                : null
            }
          </div>
        </div>

        <div className="col-md-12 d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={this.props.handleTestcasesProp}>Submit Testcases</button>
        </div>
      </div>

    )
  }
}

export default ChallengeTests
