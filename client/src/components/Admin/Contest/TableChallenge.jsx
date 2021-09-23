import React from 'react'
import moment from "moment";

export default function TableChallenge(props) {
  console.log("table", props)
  return (
    <div className="w-100 bg-light" style={{ marginLeft: "-15px" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Max Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.tabledata.map(el => <tr>
            <td>{el.name}</td>
            <td>{el.level}</td>
            <td>{el.points}</td>
            <td>{moment(el.createdAt).fromNow()}</td>
          </tr>)

          }</tbody>
      </table>
    </div>
  )
}
