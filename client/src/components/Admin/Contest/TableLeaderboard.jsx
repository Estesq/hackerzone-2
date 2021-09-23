import React from 'react'

export default function TableLeaderboard(props) {
  console.log(props)
  return (
    <div className="w-100 bg-light" style={{ marginLeft: "-15px" }}>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Ranking</th>
            <th>User</th>
            <th style={{ width: "20%" }}>Points</th>
            <th style={{ width: "10%" }}>Solved</th>
          </tr>
        </thead>
        <tbody>
          {props.tabledata.map(el => <tr>
            <td>{el.ranking + 1}</td>
            <td>{el.users.user}</td>
            <td>{el.users.points}</td>
            <td>{el.users.count}</td>
          </tr>)}
        </tbody>
      </table>
    </div>

  )
}
