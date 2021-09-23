import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import { isAuthenticated, logout } from './redux/actions/authActions';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import Navbar from './components/User/Layout/Navbar';
import Sidebar from './components/Admin/Layout/Sidebar';
import LandingPage from './pages/LandingPage';
import PAGE404 from './pages/PAGE404';
import CreateTest from './pages/Admin/CreateTest';
import CreateChallenge from './pages/Admin/CreateChallenge';
import Loader from './components/Layout/Loader';
import ContestList from './pages/User/ContestList';
import ContestChallenges from './pages/User/ContestChallenges';
import ContestPage from './pages/User/ContestPage';
import ChallengeProblem from './pages/User/ChallengeProblem';
import ChallengeSubmissions from './pages/User/ChallengeSubmissions';
import ChallengeLeaderboard from './pages/User/ChallengeLeaderboard';
import ContestSubmissions from './pages/User/ContestSubmissions';
import ContestLeaderboard from './pages/User/ContestLeaderboard';
import Contests from './pages/Admin/Contests';
import Footer from './components/Layout/Footer';
import ResetPassword from './pages/ResetPassword';

class App extends Component {
  componentDidMount = () => {
    this.props.isAuthenticated()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authDetails.isAuth !== this.props.authDetails.isAuth) {
      this.props.isAuthenticated()
    }
  }
  Logout = () => {
    this.props.logout()
  }
  render() {
    return (
      <>
        {
          this.props.authDetails ? (

            <BrowserRouter>
              {

                this.props.authDetails.isAuth === true &&
                  this.props.authDetails.role === 'developer' ? (
                  <>
                    <Navbar
                      userData={this.props.authDetails.userProfile}
                      handleLogout={this.Logout} />

                    <Switch>
                      <Route exact path='/contests' component={ContestList} />
                      <Route exact path='/contests/:name' component={ContestPage} />
                      <Route exact path='/contests/:name/challenges' component={ContestChallenges} />
                      <Route exact path='/contests/:name/submissions/all' component={ContestSubmissions} />
                      <Route exact path='/contests/:name/leaderboard/all' component={ContestLeaderboard} />
                      <Route exact path='/contests/:name/challenges/:challenge/problem' component={ChallengeProblem} />
                      <Route exact path='/contests/:name/challenges/:challenge/submissions' component={ChallengeSubmissions} />
                      <Route exact path='/contests/:name/challenges/:challenge/leaderboard' component={ChallengeLeaderboard} />
                      <Route exact path='/' component={UserDashboard} />
                      <Route path='/error' component={PAGE404} />
                      <Redirect from="*" to='/' />
                    </Switch>
                  </>
                ) :
                  this.props.authDetails.isAuth === true &&
                    this.props.authDetails.role === 'company' ? (
                    <Sidebar
                      userData={this.props.authDetails.userProfile}
                      handleLogout={this.Logout} >
                      <Switch>
                        <Route exact path='/challenge/add' component={CreateChallenge} />
                        <Route exact path='/create_contest' component={CreateTest} />
                        <Route exact path='/contests/dashboard' component={Contests} />
                        <Route exact path='/error' component={PAGE404} />
                        <Route exact path='/' component={AdminDashboard} />
                        <Redirect from="*" to='/' />
                      </Switch>
                    </Sidebar>
                  ) :
                    this.props.authDetails.isAuth === false ? (

                      <Switch>
                        <Route exact path='/reset_password/:role/:passkey' component={ResetPassword} />
                        <Route path="*" component={LandingPage} />
                      </Switch>
                    ) : (
                      <Loader />
                    )


              }
            </BrowserRouter >) : (
            <Loader />
          )}
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (storeState) => {
  return { authDetails: storeState.authState }
}

export default connect(mapStateToProps, { isAuthenticated, logout })(App)
