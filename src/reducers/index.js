import {combineReducers} from 'redux';
import User from './User'
import Env from './Env'
export default combineReducers({userStore: User, envStore: Env});