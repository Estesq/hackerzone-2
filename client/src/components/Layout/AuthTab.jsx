import React, { useState } from 'react'
import '../../assets/css/color.scss'
import { Link } from 'react-router-dom'
import AdminLogin from '../Admin/AdminLogin'
import AdminSignup from '../Admin/AdminSignup'
import UserSignup from '../User/UserSignup'
import UserLogin from '../User/UserLogin'

export default function AuthTab(props) {
  var [tab, setTab] = useState(0)
  return (
    <><div className="col-md-6 bg-light">
      <ul className="nav nav-tabs row login">
        <li className="nav-item w-50 text-center" >
          <Link className={tab === 0 ? `nav-link bg-light` : `nav-link bg-hacktone`} onClick={() => setTab(0)} style={{ borderRadius: "0" }}>{props.tab_one}</Link>
        </li>
        <li className="nav-item w-50 text-center" >
          <Link className={tab === 1 ? `nav-link bg-light` : `nav-link bg-hacktone`} onClick={() => setTab(1)} style={{ borderRadius: "0" }}> {props.tab_two}</Link>
        </li>
      </ul>


      {
        tab === 0 ?
          (props.tab_three === 'User' ?
            (<UserSignup />)
            : props.tab_three === 'Admin' ?
              (<AdminSignup />)
              : props.tab_three === 'Signin' ?
                (<UserLogin />)
                : props.tab_three === 'Register' ?
                  (<UserSignup />)
                  : null)
          : null
      }
      {
        tab === 1 ?
          (props.tab_three === 'User' ?
            (<UserLogin />)
            : props.tab_three === 'Admin' ?
              (<AdminLogin />)
              : props.tab_three === 'Signin' ?
                (<AdminLogin />)
                : props.tab_three === 'Register' ?
                  (<AdminSignup />)
                  : null)
          : null
      }
    </div>
    </>
  )
}
