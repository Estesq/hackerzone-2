import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

function VerticalTab(props) {
  const [tab, setTab] = useState(0);
  return (
    <>
      {props.data ? (
        <div className="row status" style={{ height: "50vh" }}>
          <div className="col-sm-12 col-md-4 status-tabs mt-0 mb-0">
            <div className="row">
              {props.data.output.map((el, index) => (
                <div
                  className={`${el.status ? "text-success" : "text-danger"
                    } status-tab p-2 col-3 col-md-12 ${index === tab ? "bg-light" : null}`}
                  key={index}
                  onClick={() => setTab(index)}
                >
                  {
                    el.status ? <i className="far fa-check-circle ml-1 mr-1"></i> : <i className="far fa-times-circle ml-1 mr-1"></i>
                  }
                  Sample Test Case {index}
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm-12 col-md-8 bg-light p-0 status-panels">
            {props.data.output.map((el, index) =>
              index === tab ? (
                <>
                  <div className="w-100 m-3 status-panel status-panel-input">Input (Stdin)</div>
                  <div
                    className="w-80 m-3 p-2 status-panel status-panel-result"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <pre>
                      {el.input}
                    </pre>
                  </div>
                  <div className="w-100 m-3 status-panel status-panel-output">Your Output (Stdout)</div>
                  <div
                    className="w-80 m-3 p-2 status-panel status-panel-result"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <pre>
                      {el.output}
                    </pre>
                  </div>
                  <div className="w-100 m-3 status-panel status-panel-expected">Expected Output</div>
                  <div
                    className="w-80 m-3 p-2 status-panel status-panel-result"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <pre>
                      {el.expected}
                    </pre>
                  </div>
                </>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
}
export default VerticalTab;
