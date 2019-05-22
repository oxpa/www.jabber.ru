import {combineReducers} from 'redux-immutable'
import AppReducer from './components/app/AppReducer';
import MainReducer from './components/main/MainReducer';

export default combineReducers({
    login: AppReducer,
    main: MainReducer,
});
