import {combineReducers} from 'redux-immutable'
import LoginReducer from './components/app/AppReducer';

export default combineReducers({
    login: LoginReducer
});
