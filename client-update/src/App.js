import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
// import './App.scss'
import { isAuthenticated, logout } from './redux/actions/authActions'
import Navbar from './components/developer/Navbar'

// REACT APP IMPORTS
import UserDashboard from './components/developer/UserDashboard'
import Contests from './pages/developer/Contests'
import Sidebar from './components/company/Sidebar'
import CreateContest from './pages/company/CreateContest'
import LandingPage from './pages/common/LandingPage'
import Authentication from './pages/common/Authentication'
import CreateChallenge from './pages/company/CreateChallenge'

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
        {this.props.authDetails ? (
          <BrowserRouter>
            {this.props.authDetails.isAuth === true &&
              this.props.authDetails.role === 'developer' ? (
              <>
                <Navbar />
                <Switch>
                  <Route exact path='/' component={UserDashboard} />
                  <Route exact path='/contests' component={Contests} />
                  <Redirect from='*' to='/' />
                </Switch>
              </>
            ) : this.props.authDetails.isAuth === true &&
              this.props.authDetails.role === 'company' ? (
              <Sidebar>
                <Switch>
                  <Route
                    exact
                    path='/create_contest'
                    component={CreateContest}
                  />
                  <Route
                    exact
                    path='/create_challenge'
                    component={CreateChallenge}
                  />
                  <Redirect from='*' to='/create_contest' />
                </Switch>
              </Sidebar>
            ) : this.props.authDetails.isAuth === false ? (
              <>
                <Switch>
                  {/*    <Route
                  exact
                  path='/reset_password/:role/:passkey'
                  component={ResetPassword}
                /> */}
                  <Route exact path='/auth/signin' component={Authentication} />
                  <Route exact path='/auth/signup' component={Authentication} />
                  <Route path='*' component={LandingPage} />
                </Switch>
              </>
            ) : (
              /* Loader */
              <></>
            )}
          </BrowserRouter>
        ) : (
          /* Loader */
          <></>
        )}
        {/* Footer */}
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return { authDetails: storeState.authState }
}

export default connect(mapStateToProps, { isAuthenticated, logout })(App)
