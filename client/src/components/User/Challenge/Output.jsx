import React from 'react'
import VerticalTab from './VerticalTab'

export default function Output(props) {
  return (
    <>
      {
        props.output.error ?
          (<div
            className="col-md-12 m-0 p-0"
            style={{ height: "50vh"}}>
            <div className="w-100 h-100" >
              <div className="col-md-12 bg-light mt-2 mb-2 text-danger ml-0 mr-0 p-1">
                <h5 className="display-5">Compilation Error :(</h5>
              </div>
              <div className="col-md-12 pt-1 pb-2">

                Check the compiler output, fix the error and try again.
                </div>
              <div className="col-md-12 bg-light ml-0 mr-0 p-3">
                <h6 className="display-6">Compile message</h6>
                <div
                  className="col md-12"
                  style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                  <pre>{props.output.error}</pre>
                </div>
              </div>
            </div>
          </div>)
          : (
            <div className="col-md-12 m-0">
              {props.output.failed === 0 ?
                <>
                  <div
                    className="col-12 mt-2 mb-2 pr-0 pl-0 text-success"
                    style={{ fontSize: "1.3em", fontWeight: "800" }}>
                    Congratulations!
                      </div>
                  <div className="col-12 mt-2 mb-2 pr-0 pl-0">
                    You have passed the sample test cases. Click the submit button to run your code against all the test cases.
                    </div>
                </>
                :
                <>
                  <div
                    className="col-12 mt-2 mb-2 pr-0 pl-0 text-danger"
                    style={{ fontSize: "1.3em", fontWeight: "800" }}>
                    Wrong Answer :(</div>
                  <div className="col-12 mt-2 mb-2 pr-0 pl-0">
                    {props.output.failed}/{props.output.output.length} test case failed
                    </div>
                </>
              }

              <VerticalTab data={props.output} />
            </div>
          )
      }
    </>
  )
}
