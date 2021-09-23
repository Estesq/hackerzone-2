import React, { Component } from 'react'
import illustration from '../assets/images/3661726.svg'
import '../assets/css/LandingPage.scss'
import ModalModel from '../components/Layout/ModalModel'
import { div } from 'react-router-dom'
import AuthTab from '../components/Layout/AuthTab'
import '../assets/css/color.scss'

export class LandingPage extends Component {
  state = {
    isUserOpen: false,
    isAdminOpen: false,
    isLoginOpen: false,
    isSignupOpen: false
  }
  handleClose = (type) => {
    if (type === 'User') {
      this.setState({
        isUserOpen: false
      })
    }
    if (type === 'Admin') {
      this.setState({
        isAdminOpen: false
      })
    }
    if (type === 'Login') {
      this.setState({
        isLoginOpen: false
      })
    }
    if (type === 'Signup') {
      this.setState({
        isSignupOpen: false
      })
    }
  }
  handleOpen = (type) => {
    if (type === 'User') {
      this.setState({
        isUserOpen: true
      })
    }
    if (type === 'Admin') {
      this.setState({
        isAdminOpen: true
      })
    }
    if (type === 'Login') {
      this.setState({
        isLoginOpen: true
      })
    }
    if (type === 'Signup') {
      this.setState({
        isSignupOpen: true
      })
    }
  }
  render() {
    return (
      <>
        { this.state.isUserOpen && (<ModalModel closeModal={() => this.handleClose('User')} >
          <AuthTab
            tab_one='Sign Up'
            tab_two='Login'
            tab_three='User'
          />
        </ModalModel>)}
        { this.state.isAdminOpen && (<ModalModel closeModal={() => this.handleClose('Admin')} >
          <AuthTab
            tab_one='Sign Up'
            tab_two='Login'
            tab_three='Admin'
          />
        </ModalModel>)}
        { this.state.isLoginOpen && (<ModalModel closeModal={() => this.handleClose('Login')} >
          <AuthTab
            tab_one='Developer'
            tab_two='Company'
            tab_three='Signin'
          />
        </ModalModel>)}
        { this.state.isSignupOpen && (<ModalModel closeModal={() => this.handleClose('Signup')} >
          <AuthTab
            tab_one='Developer'
            tab_two='Company'
            tab_three='Register'
          />
        </ModalModel>)}
        <div className="container-fluid LandingPage" style={{ height: "15vh" }}>
          <div className="row d-flex justify-content-between align-items-center" style={{ height: "100%" }}>
            <div className="col-12 col-md-3 ml-5"><h5>HackerZone</h5></div>
            <div className="col-12 col-md-5">
              <button className="btn btn-hack m-2 px-5" onClick={() => this.handleOpen('Login')}>Login</button>
              <button className="btn bg-outline-hack m-2 px-5" onClick={() => this.handleOpen('Signup')}>Sign Up</button>
            </div>
          </div>
          <div className="row d-flex justify-content-end align-items-center  flex-wrap-reverse" style={{ minHeight: "70vh" }}>
            <div className="col-12 col-md-5">
              <h4>Matching developers with great companies</h4>
              <div className="row">
                <div className="col-12 col-md-6 my-3">
                  <div style={{ color: "inherit", height: "100%" }} className="action d-flex flex-column justify-content-between" onClick={() => this.handleOpen('Admin')}>
                    <div className="w-100">
                      <h5><strong>For Companies</strong></h5>
                    </div>
                    <div className="w-100">
                      <p>We are the market-leading technical interview platform to identify and hire developers in div remote first world</p>
                    </div>
                    <div className="w-100">
                      <button className="btn btn-hack">Start Remote Hiring</button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 my-3">
                  <div style={{ color: "inherit", height: "100%" }} className="action d-flex flex-column justify-content-between" onClick={() => this.handleOpen('User')}>
                    <div className="w-100">
                      <h5><strong>For Developers</strong></h5>
                    </div>
                    <div className="w-100">
                      <p>Join over 11 million developers, practice coding skills, prepare for interviws, and get hired.</p>
                    </div>
                    <div className="w-100">
                      <button className="btn btn-hack">Sign Up & Code</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-12 col-md-6"><img src={illustration} alt="" className="img-fluid" /></div>
          </div>
        </div>
      </>
    )
  }
}

export default LandingPage
