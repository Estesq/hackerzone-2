import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compLogin, compRequestPass } from '../../redux/actions/authActions'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class AdminLogin extends Component {
  state = {
    email: null,
    password: null,
    remember: false,
    reset_pass_form: false
  }
  handleaLoginInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleaLoginSubmit = (e) => {
    e.preventDefault()
    this.props.compLogin(this.state)
    if (this.props.requestToken.length === 0) {
      NotificationManager.error("Something went wrong!", 'Oops!', 5000, () => {
        alert('callback');
      })
    }
    e.target.reset()
  }
  handleRemmber = (e) => {
    e.preventDefault()
    this.setState({
      remember: !this.state.remember
    })
  }
  handleReset = (e) => {
    e.preventDefault()
    this.setState({
      reset_pass_form: !this.state.reset_pass_form
    })
  }
  handleRequestPass = (e) => {
    e.preventDefault()
    this.props.compRequestPass({ email: this.state.email })
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.requestToken.length !== this.props.requestToken.length) {
      let res = this.props.requestToken[prevProps.requestToken.length]
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

      <div className="col-12" style={{ minHeight: "70vh" }}>
        <form className="form-group" id="admin-login" onSubmit={this.handleaLoginSubmit}>
          <div className="input-group my-4 bg-hacktone">
            <div className="input-group-prepend  ">
              <span className="input-group-text bg-transparent  fas fa-user"></span>
            </div>
            <input
              type="text"
              className="form-control border-left-0 bg-transparent"
              placeholder="Your Email"
              name="email"
              onChange={this.handleaLoginInput}
              required="required" />
          </div>
          {this.state.reset_pass_form === false ? <>
            <div className="input-group my-4 bg-hacktone">
              <div className="input-group-prepend  ">
                <span className="input-group-text bg-transparent  fas fa-key"></span>
              </div>
              <input
                type="password"
                className="form-control border-left-0 bg-transparent"
                placeholder="Your Password"
                required="required"
                name="password"
                onChange={this.handleaLoginInput}
              />
            </div>
            <div className="input-group my-3 d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  defaultChecked={this.state.remember}
                  onClick={this.handleRemmber}
                  id="flexCheckChecked" ></input>
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Remember password
                </label>
              </div>
              <button
                className="btn btn-transparent"
                style={{ cursor: "pointer", color: "blue" }}
                onClick={this.handleReset}
              >
                Forget password
              </button>
            </div>

            <div className="input-group my-4 d-flex justify-content-end">
              <input type="submit" className="btn btn-hack" value="Login" />
            </div>
          </> : <>
            <div className="input-group my-3 d-flex justify-content-between">
              <button className="btn btn-outline-success"
                onClick={this.handleReset}>
                <i className="fas fa-long-arrow-alt-left"></i>&nbsp;
              Back
              </button>
              <button
                className="btn btn-outline-success"
                onClick={this.handleRequestPass}
              >
                Reset Password&nbsp;
              <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </>}
          <NotificationContainer />
        </form>
      </div>

    )
  }
}

const mapStateToProps = (storeState) => {
  return { requestToken: storeState.authState.pass_token }
}

export default connect(mapStateToProps, { compLogin, compRequestPass })(AdminLogin)
