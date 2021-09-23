import axios from "axios"
import { LOAD_CHALLENGE_SUBMISSIONS, LOAD_REVIEW_SUBMISSIONS, SUBMIT_PROBLEM } from "../actionTypes"
let tokanstorage = sessionStorage.getItem('token') || localStorage.getItem('token')

export const submitProblem = (body) => async (dispatch) => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/script`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: SUBMIT_PROBLEM,
    payload: res.data
  })
}
export const challengeSubmissions = (body) => async (dispatch) => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/challenge_results`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_CHALLENGE_SUBMISSIONS,
    payload: res.data
  })
}
export const allSubmissions = (body) => async (dispatch) => {
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/submit/contest_results`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': tokanstorage
    },
    data: JSON.stringify(body)
  }
  let res = await axios(config)
  dispatch({
    type: LOAD_REVIEW_SUBMISSIONS,
    payload: res.data
  })
}
