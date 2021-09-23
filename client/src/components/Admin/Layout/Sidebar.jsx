import React, { useState } from 'react'
import '../../../assets/css/color.scss'
import menu from '../../../assets/svg/hamburger.svg'
import close from '../../../assets/svg/close.svg'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
  const [sidebar, setSidebar] = useState(true)
  return (
    <div className="container-fluid vh-100 p-0 overflow-auto mw-100 mh-100">
      <div className="d-flex flex-wrap ">
        {sidebar ? <div className={`sidebar m-0 pl-2 col-2 col-md-3 bg-hacktone d-flex flex-column`} style={{ minHeight: "100vh" }}>
          <span className="navbar-brand mt-3 h1 text-light">
            HackerZone
          </span>
          <hr />
          <Link className="hz-link my-1" to='/'>Home</Link>
          <Link className="hz-link my-1" to='/challenge/add'>Add Challenge</Link>
          <Link className="hz-link my-1" to='/create_contest'>Create Contest</Link>
          <Link className="hz-link my-1" to='/contests/dashboard'>Contests Dashboard</Link>
        </div> : null}
        < div className={`m-0 p-0 ${sidebar ? "col-10 col-md-9" : "col-12"}`} >
          <div className="navbar mr-0 d-flex justify-content-between m-0 bg-hacktone text-light">
            <span>
              {sidebar === true ?
                <button className="btn btn-hack mx-2">
                  <img className="hz-toogle" src={close} onClick={() => setSidebar(false)} height="30" width="30" alt="close" />
                </button>
                :
                <button className="btn btn-hack mx-2">
                  <img className="hz-toogle" src={menu} onClick={() => setSidebar(true)} height="30" width="30" alt="menu" />
                </button>
              }
              <span className="navbar-brand mb-0 h1">
                HackerZone
          </span>
            </span>
            <button className="btn btn-hack" onClick={props.handleLogout}>
              {props.userData ? props.userData.full_name : "Guest"}
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
          <div className='mw-100'>
            {props.children}
          </div>
        </div>
      </div>
    </div >
  )
}
