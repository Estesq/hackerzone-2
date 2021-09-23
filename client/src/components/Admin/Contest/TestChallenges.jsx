import React, { useState } from 'react'
import { useTable, useRowSelect } from "react-table";
import '../../../assets/css/color.scss'
import CreateChallenge from '../../../pages/Admin/CreateChallenge';
import ModalModel from '../../Layout/ModalModel';


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export default function TestChallenges(props) {

  const [modal, setModal] = useState(false);


  const columns = React.useMemo(() => [
    {
      Header: "Title: ",
      accessor: "name"
    },
    {
      Header: "Level",
      accessor: "level"
    },
    {
      Header: "Points",
      accessor: "points"
    }
  ], [])
  const data = React.useMemo(() => props.tableData, [props.tableData])

  const tableInstance = useTable({
    columns,
    data
  },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance

  return (
    <>
      { modal && (<ModalModel closeModal={() => setModal(false)}>
        <div className="d-flex flex-column bg-light pr-2" style={{ maxWidth: "90vw", minWidth: "90vw", maxHeight: "87vh", minHeight: "87vh" }}>
          <CreateChallenge />
        </div>
      </ModalModel>)}
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}   >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="bg-hacktone text-light">
                  {
                    column.render("Header")
                  }

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const { status } = row.values;
            return (
              <tr {...row.getRowProps()} status={status}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="table-info">
                    {
                      cell.render("Cell")
                    }
                  </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-hacktone text-light" style={{ minWidth: "calc(100% - 30px)", position: "absolute", bottom: "0" }}>
        <div className="d-flex justify-content-between align-items-center w-100 h-100">
          <div className="btn bg-outline-hack m-1">
            Selected Rows: {Object.keys(selectedRowIds).length}
          </div>
          <button className="btn bg-light m-1" onClick={() => props.handleAdd(selectedFlatRows.map((d) => d.original))}>
            Add Selected

        </button>
          <button className="btn bg-light m-1" onClick={() => setModal(true)}>
            Add Challenges
        </button>
        </div>

      </div>
    </>
  )
}
