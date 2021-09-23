import React from 'react'
import { Link } from 'react-router-dom'

export default function ContestItem(props) {
  return (
    <tr>
      <td>
        <Link to={`/contests/${props.list.name}`} className="user-link">{props.list.name}</Link>
        <span className="user-subhead">{props.list.creator}</span>
      </td>
      <td>
        <p> Start: {new Date(props.list.start_date).toUTCString()}</p>
        <p>End: {new Date(props.list.end_date).toUTCString()}</p>
      </td>
      <td >

        <Link to={`/contests/${props.list.name}/challenges`} className="table-link">
          <span className="fa fa-stack">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-pen fa-stack-1x fa-inverse"></i>
          </span>
        </Link>
        <Link to={`/contests/${props.list.name}/leaderboard/all`} className="table-link danger">
          <span className="fa-stack">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-trophy fa-stack-1x fa-inverse"></i>
          </span>
        </Link>

      </td>
    </tr>

  )
}
