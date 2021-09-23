import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import contestReducer from './reducers/contestReducer'
import leaderboardReducer from './reducers/leaderboardReducer'
import problemReducer from './reducers/problemReducer'
import submitReducer from './reducers/submitReducer'

let rootReducer = combineReducers({
  problemState: problemReducer,
  authState: authReducer,
  contestState: contestReducer,
  submitState: submitReducer,
  leaderboardeState: leaderboardReducer
})
export default rootReducer