import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumbs from '../../components/Layout/Breadcrumb'
import Loader from '../../components/Layout/Loader'
import { allSubmissions } from '../../redux/actions/submitActions'


class ContestSubmissions extends Component {

  componentDidMount = () => {
    this.props.allSubmissions({ contest: this.props.match.params.name })
  }
  render() {
    return this.props.reviews ? (
      <>
        <Breadcrumbs
          bread={[
            { title: "Contest", link: `/contests/${this.props.match.params.name}/challenges` },
            { title: "Challenge", link: `/contests` },
          ]
          } />
        <div className="container">
          <div className="row">
            <div className="h2">Submissions</div>
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Challenge</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.reviews.length > 0 ?
                    this.props.reviews.map(el => <tr>
                      <td>{el.challenge}</td>
                      <td>{el.score}</td>
                      <td>{el.status}</td>
                      <td></td>
                    </tr>) :
                    <tr>
                      <td colspan="4">Didn't Submit anything!</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </>
    ) : <Loader />
  }
}

const mapStateToProps = (storeState) => {
  return { reviews: storeState.submitState.reviews }
}


export default connect(mapStateToProps, { allSubmissions })(ContestSubmissions)
