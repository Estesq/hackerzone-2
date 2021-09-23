import React, { Component } from 'react'

class ChallengeSamples extends Component {

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-3">Samples</div>
        <div className="col-md-9 d-flex justify-content-around flex-wrap">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="sample_input">Sample Input</label>
              <textarea
                className="form-control"
                onChange={this.props.handleInputProp}
                name="sample_input"
                id="sample_input"
                rows="3"
                value={this.props.stateValues.sample_input}
              >
              </textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="sample_output">Sample Output</label>
              <textarea
                className="form-control"
                onChange={this.props.handleInputProp}
                name="sample_output"
                id="sample_output"
                rows="3"
                value={this.props.stateValues.sample_output}
              >
              </textarea>
            </div>
          </div>

          <div className="col-6">
            <p>Inputs</p>
            {
              this.props.stateValues.samples.length > 0 ?
                (
                  <ul className="list-group">
                    {this.props.stateValues.samples.map((el, index) => {
                      return (<li className="list-group-item">
                        <span className="m-1">case : {index + 1} -</span>
                        <pre>
                          <code>
                            {el.sample_input}
                          </code>
                        </pre>
                      </li>)
                    })}
                  </ul>
                )
                : null
            }
          </div>
          <div className="col-6">
            <p>Outputs</p>
            {
              this.props.stateValues.samples.length > 0 ?
                (
                  <ul className="list-group">
                    {this.props.stateValues.samples.map((el, index) => {
                      return (<li className="list-group-item">
                        <span className="">case : {index + 1} -</span>
                        <pre>
                          <code>
                            {el.sample_output}
                          </code>
                        </pre>
                      </li>)
                    })}
                  </ul>
                )
                : null
            }
          </div>
        </div>
        <div className="col-md-12 d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={this.props.handleSampleProp}>Submit Sample</button>
        </div>
      </div>
    )
  }
}

export default ChallengeSamples
