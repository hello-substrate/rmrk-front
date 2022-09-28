import { combineReducers } from 'redux'
import counter from './counter'
import substrate from './substrate'

export default combineReducers({
  counter,
  substrate
});
