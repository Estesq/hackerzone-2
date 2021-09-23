import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthTab from '../components/Layout/AuthTab'
import ModalModel from '../components/Layout/ModalModel'
import { compResetPass, devResetPass } from '../redux/actions/authActions'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class ResetPassword extends Component {
  state = {
    password: '',
    confirm: '',
    passwordErr: '',
    confirmErr: '',
    isLoginOpen: false,
    isSignupOpen: false
  }
  handleClose = (type) => {

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
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { password, confirm } = this.state
    const { role, passkey } = this.props.match.params
    if (password !== '' && confirm !== '' && password === confirm) {
      console.log("hey", { password, passkey })
      if (role === "developer") {
        this.props.devResetPass({ password, passkey })
      }
      else {
        this.props.compResetPass({ password, passkey })
      }
      this.setState({
        passwordErr: '',
        confirmErr: ''
      })
    }
    else {
      this.setState({
        passwordErr: 'Something went wrong',
        confirmErr: 'Something went wrong'
      })
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.resetMsg.length !== this.props.resetMsg.length) {
      let res = this.props.resetMsg[prevProps.resetMsg.length]
      console.log(res)
      if (res.err) {
        NotificationManager.error(res.err, 'Oops!', 5000, () => {
          alert('callback');
        })
      }
      else {
        NotificationManager.success(res.msg, 'Hoorray!');
      }
    }
  }
  render() {
    return (
      <>
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

          <div className="row d-flex flex-column justify-content-center align-items-center" style={{ height: "calc(100vh - 120px)" }}>
            <div className="col-md-3 border border-success p-3">
              <form onSubmit={this.handleSubmit}>
                <h3>Reset Password</h3>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    defaultValue={this.state.password}
                    placeholder="New Password"
                    onChange={this.handleInput}
                    required
                    min="5"
                    max="12" />
                  <small id="passwordHelp" className="form-text text-muted text-danger">{this.state.passwordErr}</small>
                </div>
                <div className="form-group">
                  <label for="confirm">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm"
                    name="confirm"
                    defaultValue={this.state.confirm}
                    placeholder="Confirm New Password"
                    onChange={this.handleInput}
                    required
                    min="5"
                    max="12" />
                  <small id="confirmHelp" className="form-text text-muted text-danger">{this.state.confirmErr}</small>
                </div>
                <button className="btn btn-outline-primary">Submit</button>
                <NotificationContainer />
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (storeState) => {
  return { resetMsg: storeState.authState.reset_password }
}


export default connect(mapStateToProps, { devResetPass, compResetPass })(ResetPassword)
