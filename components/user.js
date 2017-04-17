import * as config from './config.js';
import {isEmpty,checkFetchStatus} from './helpers';
import {formActionResult} from './loginFormState';
import {itemLoading} from './loading.state';
import {browserHistory as history} from 'react-router';
import {setLoginForm} from './loginForm.js';

const USER = 'USER'; // all user action
const VCARD = 'vcard'; //set user's vcard value action
const ROSTER = 'roster'; //set user's vcard value action
const JID = 'JID'; // set user jid (after auth or whatever)
const LOGIN = 'LOGIN'; //sets only 'loggedin' state
const LOGOUT = 'LOGOUT'; //unset whole state on logout (kill cached data, maybe)

export const userLogout = () => (dispatch, getstat) => {
    dispatch(logout())
    dispatch(setLoginForm())
    console.log('fetching logout')
    fetch(config.apiBase + 'logout', {credentials: 'include'})
    history.push('/')
}

const getUserItem = (item) => (redirMe) => (dispatch, getState) => {
    let state = getState()
    if (!state.user.loggedin) {
        console.log('Not fetching', item, ': user is not logged in')
        return
    }
    if (!isEmpty(state.user[item]) || state.loading[item]) { 
        console.log('User item', item, 'is not empty or is already being fetched')
        return 
    }
    console.log('setting '+ item);
    dispatch(itemLoading(item));
    fetch(config.apiBase + item, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((response) => checkFetchStatus(response,true))
      .then((json) => {
        if ('error' in json && json.error != "") {
            console.log('Error getting '+item+', something went wrong')
            console.log(json.error)
            if (redirMe) {
                history.push('/login')
                dispatch(formActionResult('Пожалуйста, авторизуйтесь ещё раз.'))
            }
            
        }
        
        json[item] && dispatch(setUserStateItem(item, json[item]))
        dispatch(itemLoading(item))
    }).catch((error)=>{
        console.log('Something went wront fetching', item,'Message was:', error)
        dispatch(itemLoading(item))
    })
}

const login = () => ({type:USER, kind:LOGIN})
const logout = () => ({type:USER, kind:LOGOUT})
const setUserStateItem = (item, value) => ({type: USER, kind: item, value: value})

export const setRoster = getUserItem('roster')
export const setVcard = getUserItem('vcard')
export const setUserLoggedIn = login


export const user = (state={roster:[], vcard:{}, jid:null, loggedin: false}, action) =>{
    if (action.type != USER) return state;
    console.log('User action: ', action)
    switch (action.kind) {
        case JID:   return Object.assign({}, state, {jid:action.value})
        case VCARD: return Object.assign({}, state, {vcard:action.value.vCard, loggedin: true})
        case ROSTER: return Object.assign({}, state, {roster:action.value})
        case LOGIN:   return Object.assign({}, state, {loggedin: true})
        case LOGOUT: return Object.assign({}, state, {jid:null, loggedin: false, vcard: {}, roster:[]})
        default: return state;
    }
    return state;//should never happen...

}
