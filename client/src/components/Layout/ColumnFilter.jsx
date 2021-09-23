import React from 'react'

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{' '}
      <input
        value={filterValue || ''}
        onchange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}
