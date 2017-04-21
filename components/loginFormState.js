import {InputField, check} from './input.js'
import {isEmpty,checkFetchStatus} from './helpers'
import * as config from './config';
import * as msg from './form.messages.js'
import {resetCaptcha} from './captcha.js'
import {browserHistory as history} from 'react-router'
import {setUserLoggedIn} from './user.js'

let apiUrls = {'login':'auth', 'remind':'reset', 'register':'register'}
const FORM   = 'LFORM';  // login form actions

export const LOGINF  = 'login'; // make form to be a login form
export const REGF    = 'register';   // make form to be a registration form
export const REMINDF = 'remind';   // make form to be a remind password form

const SETFVAL = "SETFV" ; // set form value generic action
const LOGINV  = "LOGINV"; // set login value
const EMAILV  = "EMAILV"; // set email value
const PASSWV  = "PASSWV"; // set password value
const CAPTCHAV  = "CAPTCHAV"; // set recaptcha response

const CHECKFV  = "CHECK" ; // check form value action
const CHKLOGIN = "CLOG"  ; // check login value
const CHKEMAIL = "CEMAIL"; // check email value 
const CHKPASS  = "CPASS" ; // check password value
const CHKCAPT  = "CCAP"  ; // check captcha value (ensure it is if needed)
const CHKCNFR  = "CCONFR"; // check password confirmation to match pw
const CHKALL   = "CALL"  ; // check all fields of a form

const SEND = "S";       // action to send form
const GOT = "G";       // action to set state when request is done
const SENDING = "S1";   // form state
const FALTY = "F";      // form state in case of error


export function formAction(actKind, value) {
  return {type:FORM, kind:actKind, value:value}
}
export function checkFormValueAction(field) {
    return formAction(CHECKFV, field)
}

function formActionSending() {
    return formAction(SEND, false)
}
export function formSetValueAction(kind, value) {
    return formAction(SETFVAL, {[kind]:value})
}

// is_msg displays text removing all inputs and setting redirect
export function formActionResult(data, is_msg=false) {
    return formAction(GOT, {is_msg:is_msg, msg:data})
}


// runs checks for a field by type
// returns an object to insert into new state
// i.e. saves values for types other than checked
function checkValue(type, state) {
    let incorrect = state.incorrect;
    let ckResult = (check[type])(state)
    if (ckResult == "") {
        delete(incorrect[type]);
    } else {
        incorrect[type] = ckResult;
    }
    return {incorrect:incorrect}
}

export function formValues (state={login:"", password:"", email:"",captcha:"", confirmation:"", incorrect:{}}, action){
    if (action.type != FORM) { return state };
    let newState = Object.assign({}, state);
    switch (action.kind) {
        case SETFVAL:
                    let field = Object.keys(action.value)[0];
                    Object.assign(newState, action.value);
                    // skip cheking until it is forced
                    if (! (field in newState.incorrect)) {
                        return newState
                    };
                    Object.assign(newState, checkValue(field, newState));
                    return newState;
        case CHECKFV:
                    return Object.assign(newState, checkValue(action.value, newState));
        case LOGINF:
        case REGF:
        case REMINDF:
                    //reset state of the form for each switch of type
                    if (newState.captcha != "" ) {resetCaptcha()}
                    return Object.assign(newState, {
                        login:"", password:"",
                        email:"", captcha:"",
                        confirmation:"", incorrect:{}
                    })

    }
    return state;
}

export function formState (state={
                        login:true, password:true,
                        email:false, captcha:true,
                        confirmation: false, message: false,
                        actionLabel:"Войти",
                        kind:LOGINF, sending:false,
                        secondStage: false,
                        result:""
                    }
                    ,action){
    //console.log("formstate action:",state,action);
    if (action.type != FORM) {return state};
    let s = action.value ; // this is for action.value === SecondStage
    switch (action.kind) {
        case SEND:      return Object.assign({}, state, {sending:!state.sending, result:""})
        case GOT:       return Object.assign({}, state, {
                            sending: false,
                            message: action.value.is_msg,
                            result: action.value.msg
                        })
        case LOGINF:    return Object.assign({}, state, {
                            login: true, password: true,
                            email: false, captcha: true,
                            confirmation: false, message: false,
                            actionLabel: "Войти", result: "",
                            secondStage: false,
                            kind:LOGINF
                        })
        case REGF:
        case REMINDF:
                        let newstate = {}
                        if (action.value) {
                            Object.assign(newstate, state, {
                                login: false, password: true,
                                email: false, captcha: false,
                                confirmation: true, message: false,
                                actionLabel: "Установить", result: "",
                                secondStage: true, kind: action.kind
                            })
                            
                        } else {
                            Object.assign(newstate, state, {
                                login: true, password: false,
                                email: true, captcha: true,
                                confirmation: false, message: false,
                                actionLabel: "Регистрация", result: "",
                                secondStage: false, kind: action.kind
                            })
                            if (action.kind == REMINDF) {
                                Object.assign(newstate, 
                                    {actionLabel: "Выслать пароль",
                                     email: false})
                            }
                        }
                        return newstate
      default: return state
    }
}


const composeBodyForFetch = (dispatch, getState) => {
        let state=getState();
        let fields = ['login','password','email','captcha'];
        fields.forEach((elem) => {
            if (state.loginForm.formState[elem]) {dispatch(checkFormValueAction(elem))}
        });

        // renew state as check funstion should have processed it
        state=getState();
        if (! isEmpty(state.loginForm.formValues.incorrect)) {
            return null;
        } else {
            let body={};
            Object.assign(body,{kind:state.loginForm.formState.kind});
            // for each field get it's value, process and add into body
            fields.forEach((elem) => {
                if (state.loginForm.formState[elem]) {
                    let value = state.loginForm.formValues[elem];
                    if (elem == 'login') {
                        if (value.indexOf('@') == -1) {
                            console.log('index of @ is -1, adding domain to ', value);
                            value = value.trim() + '@' + config.xmppDomain
                        }
                        value = value.toLowerCase()
                    }
                    Object.assign(body,{[elem]:value});
                }
            });
            return body;
        }
}

export function submitForm (props) {
    return (dispatch,getState) => {
        dispatch(formActionSending())
        let body = composeBodyForFetch( dispatch, getState);

        if (body) {
            if (typeof(props.routeParams) !== 'undefined' && typeof(props.routeParams.ehash) !== 'undefined') {
                 Object.assign(body,{hash:props.routeParams.ehash})
            }
            fetch(config.apiBase + apiUrls[body.kind], {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }).then((response) => checkFetchStatus(response,true))
              .then((json) => {
                    console.log('json response', json);
                    resetCaptcha();
                    dispatch(formSetValueAction('captcha', ""));
                    if (json['result'] == 'ok'){
                        dispatch(formSuccessAction(body.kind, props.secondStage))
                    } else {
                        dispatch(formActionResult(msg.errors[json['error']] || json['error']))
                    }})
              .catch((error) => {console.log(error);dispatch(formActionResult("An error occured. Please, retry"))});
        } else {
            dispatch(formActionSending())
        }
    }
}

function formSuccessAction (kind, secondStage) {
    switch(kind) {
        case LOGINF: return (dispatch) => {
                dispatch(setUserLoggedIn())
                dispatch(formAction(GOT, {is_msg:true, msg:kind}));
                setTimeout(()=>{history.push('/personal')}, 2000)
            }
        case REGF:
        case REMINDF:  return (dispatch) => {
                // 
                dispatch(formAction(GOT, {is_msg: true, msg:secondStage?'password':kind}));
                setTimeout(()=>{history.push('/login')}, 2000)
            }

    }
}

