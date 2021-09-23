import React from 'react'
import ErrorLogo from '../assets/images/ErrorPage404-03.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/color.scss'
import { Link } from 'react-router-dom'

function PAGE404(props) {
  return (
    <div className="container-fluid p-0 m-0 d-flex flex-column justify-content-center align-items-center" style={{
      backgroundImage: `url(${ErrorLogo})`, height:"89vh", backgroundPosition:"center",backgroundSize:"cover", margin:"auto", minHeight:"89%" 
    }}>
      <span>
        <Link to="/" className="btn" style={{
          backgroundColor: "white",
          color: "#005e9d",
          borderColor: "#31347b"
        }}
        >Back To Home</Link>
      </span>
    </div>
  )
}

export default PAGE404
