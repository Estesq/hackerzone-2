import React from 'react'
import { Link } from 'react-router-dom'

export default function ChallengeSnippet(props) {
  return (

    <div className="w-100 mt-1 mb-4" style={{ border: "1px solid black", borderRadius: "5px" }}>
      <div className="W-100 d-flex justify-content-between">
        <div className="text-success pt-3 pb-2 pl-3 pr-3 " style={{ fontSize: "1.2em", fontWeight: "800" }}>{props.data.name}</div>
        <div>
          <Link to={`/contests/${props.contestname}/challenges/${props.data.name}/leaderboard`}>
            <i className="fas fa-trophy pt-3 pb-0 px-3 text-secondary" style={{ fontSize: "1.2em" }}></i>
          </Link>
          <Link to={`/contests/${props.contestname}/challenges/${props.data.name}/submissions`}>
            <i className="fas fa-list pt-3 pb-0 px-3 text-secondary" style={{ fontSize: "1.2em" }}></i>
          </Link>
        </div>
      </div>
      <div className="W-100 d-flex justify-content-between flex-wrap">
        <div
          className=" pt-1 pb-3 pl-3 pr-3 " style={{ display: "inline-block" }} >
          {/* <span className="text-secondary px-1">Success Rate:</span>
          <span className="px-1"></span> */}
          <span className="text-secondary px-1">Max Score:</span>
          <span className="px-1">{props.data.points}</span>
          <span className="text-secondary px-1">Difficulty:</span>
          <span className="px-1">{props.data.level}</span>
        </div>
        <Link
          to={`/contests/${props.contestname}/challenges/${props.data.name}/problem`}
          className="btn btn-success mx-2 mt-0 mb-2">
          Solve Problem
          </Link>
      </div>

    </div>

  )
}
