import React, { Component } from 'react'
import { connect } from 'react-redux'
import { devRegister } from '../../redux/actions/authActions'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class UserSignup extends Component {
  state = {
    full_name: null,
    email: null,
    password: null
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { full_name, email, password } = this.state
    if (full_name != null && email != null && password != null) {
      this.props.devRegister(this.state)
      e.target.reset()
    }
    else {
      NotificationManager.error('All fields should be filled.', 'Oops!', 5000, () => {
        alert('callback');
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.registerMsg.length !== this.props.registerMsg.length) {
      let res = this.props.registerMsg[prevProps.registerMsg.length]
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
        <div className="col-12" style={{ minHeight: "70vh" }}>
          <form className="form-group" id="user-register" onSubmit={this.handleSubmit} >
            <div className="input-group my-4 bg-hacktone">
              <div className="input-group-prepend  ">
                <span className="input-group-text bg-transparent  fas fa-user"></span>
              </div>
              <input
                type="text"
                name="full_name"
                className="form-control border-left-0 bg-transparent"
                placeholder="First & Last name"
                onChange={this.handleInput}
                required="required" />
            </div>
            <div className="input-group my-4 bg-hacktone">

              <div className="input-group-prepend">
                <span className="input-group-text bg-transparent  fas fa-envelope"></span>
              </div>
              <input
                type="email"
                name="email"
                className="form-control border-left-0 bg-transparent"
                placeholder="Email"
                onChange={this.handleInput}
                required="required" />
            </div>
            <div className="input-group my-4 bg-hacktone">

              <div className="input-group-prepend  ">
                <span className="input-group-text bg-transparent  fas fa-key"></span>
              </div>
              <input
                type="password"
                name="password"
                className="form-control border-left-0 bg-transparent"
                placeholder="Your Password"
                onChange={this.handleInput}
                required="required" />
            </div>
            <div className="input-group my-4 d-flex justify-content-end">
              <input type="submit" className="btn btn-hack" value="Create An Account" />
            </div>
            <NotificationContainer />
          </form>
        </div>

      </>)
  }
}

const mapStateToProps = (storeState) => {
  return { registerMsg: storeState.authState.userRegister }
}


export default connect(mapStateToProps, { devRegister })(UserSignup)
