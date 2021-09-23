import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../Layout/Breadcrumb'
import '../../../assets/css/ChallengePlayground.scss'

export default function ChallengePlayground(props) {
  return (
    <>
      <Breadcrumbs
        bread={[
          { title: "Contest", link: `/contests/${props.paramdata.name}/challenges` },
          { title: "Challenge", link: `/contests/${props.paramdata.name}/challenges/${props.paramdata.challenge}/problem` },
        ]
        } />
      <div className="container">
        <div className="row">
          <div className="h3">
            {props.paramdata.name}
          </div>
          <div className="w-100 hacktab pt-3 pl-2">
            <ul className="nav nav-tabs">
              <li className="nav-item hack-item">
                <Link
                  className={`nav-link hacktab-link ${props.activetab === "problem" ? "hacktab-light" : null}`}
                  to={`/contests/${props.paramdata.name}/challenges/${props.paramdata.challenge}/problem`}>
                  Problem
                  </Link>
              </li>
              <li
                className="nav-item">
                <Link
                  className={`nav-link hacktab-link ${props.activetab === "submissions" ? "hacktab-light" : null}`}
                  to={`/contests/${props.paramdata.name}/challenges/${props.paramdata.challenge}/submissions`}>
                  Submissions
                </Link>
              </li>
              <li
                className="nav-item">
                <Link
                  className={`nav-link hacktab-link ${props.activetab === "leaderboard" ? "hacktab-light" : null}`}
                  to={`/contests/${props.paramdata.name}/challenges/${props.paramdata.challenge}/leaderboard`}>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="h5 w-100 py-2">
            {props.paramdata.challenge}
          </div>
          {props.children}
        </div>
      </div>
    </>
  )
}
