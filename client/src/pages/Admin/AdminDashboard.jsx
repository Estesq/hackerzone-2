import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../assets/css/AdminDashboard.scss'
import back from '../../assets/images/pexels-anete-lusina-4792731.jpg'

class AdminDashboard extends Component {
  render() {
    return (
      <div className="container-fluid main-section" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(235, 82, 73, 0.7), rgba(0, 0, 0, 0.7)),
        url("${back}"`
      }}>
        <div className="row">
          <div className="offset-lg-2 col-lg-8 section-part text-center">
            <h1>Hackzone</h1>
            <p>With US Search developers for your company.</p>
            <Link to={`/create_contest`} className="btn btn-danger">Create Contest</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
