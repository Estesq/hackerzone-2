import React, { useState } from 'react'

export default function TabModel(props) {
  const [tabmodel, setTabmodel] = useState(0)
  return (
    <>
      <ul className="nav nav-tabs col-12" id="myTab" role="tablist">
        {props.tabdata.map((el, index) =>
          <li
            className="nav-item"
            role="presentation"
            key={index}
            onClick={() => setTabmodel(index)}
          >
            <button
              className={`nav-link ${tabmodel === index ? "active" : null}`}
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              key={index}
              onClick={() => props.handleTabmodel(index)}
            >
              {el}
            </button>
          </li>)}
      </ul>

      <div
        className="tab-content col-12 "
        id="myTabContent"
        style={{
          minHeight: "50vh",
          maxHeight: "80vh",
          overflowY: "scroll"
        }}>

        <div
          className="tab-pane active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab">

          {props.children}

        </div>
      </div>
    </>
  )
}
