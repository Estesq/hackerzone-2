import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/css/color.scss'
import '../../../assets/css/Navbar.scss'
import menu from '../../../assets/svg/hamburger.svg'
import close from '../../../assets/svg/close.svg'

function Navbar(props) {


  const [toggle, setToggle] = useState(false)
  return (
    <>
      <nav className="text-light bg-hacktone fixed-top">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="navbar col-md-7">
            <span className="navbar-brand mb-0 h1">HackerZone</span>
            {toggle === true ?
              <button className="btn btn-hack d-sm-block d-md-none">
                <img className="hz-toogle" src={close} onClick={() => setToggle(false)} height="30" width="30" alt="close" />
              </button>
              :
              <button className="btn btn-hack d-sm-block d-md-none">
                <img className="hz-toogle" src={menu} onClick={() => setToggle(true)} height="30" width="30" alt="menu" />
              </button>
            }
          </div>
          <ul className="navbar-nav d-none col-md-5 h-100 d-md-flex flex-row justify-content-between align-items-center">
            <li className="nav-item active">
              <Link className="nav-link hz-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link hz-link" to='/contests'>Compete</Link>
            </li>
            <li className="nav-item ">
              <div className="dropdown text-center">
                <button className="dropbtn  w-100">{props.userData ? props.userData.full_name : "Guest"}</button>
                <div className="dropdown-content w-100">
                  <Link to="/profile">Your Profile</Link>
                  <button className="btn btn-hack my-1" onClick={props.handleLogout}>
                    Logout
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>

            </li>
          </ul>
        </div>
      </nav>
      {toggle ? (
        <ul className="navbar-nav d-flex col-12 d-md-none flex-column justify-content-around align-items-center text-light bg-hacktone hz-mobile-menu" style={{ position: "sticky", top: "60px" }}>
          <Link className="hz-link hz-mobile-menu-item" to='/'>Home</Link>
          <Link className="hz-link hz-mobile-menu-item" to='/contests'>Compete</Link>
          <button
            className="btn btn-hack col-12  d-flex justify-content-center align-items-center"
            style={{ maxHeight: "56px" }}
            onClick={props.handleLogout}>
            {props.userData ? props.userData.full_name : "Guest"}
          </button>
        </ul>
      ) : null
      }
      <div className="m-4 w-100">&nbsp;</div>
    </>
  )
}
export default Navbar