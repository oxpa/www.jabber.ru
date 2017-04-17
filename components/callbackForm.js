import {isEmpty,checkFetchStatus} from './helpers';
import {Recaptcha} from './captcha.js'
import * as config from './config';
import {InputField, TextArea, check} from './input.js'
import {itemLoading} from './loading.state'
import * as React from 'react'
import * as ReactRedux from 'react-redux'

const CBFORM = 'CBFORM'
const SET = 'SET'
const ERROR = 'ERROR'
const RESULT = 'RESULT'

const captcha = (props) => 
          <div className={"recap" + (props.incorrect?" has-error":"")}>
            <Recaptcha callback={props.setValue} expireCallback={props.setValue} tabIndex="0"/>
            <div className="error proxima">{props.error}</div>
          </div>


const cbForm = (props) =>
    <div className="cbform">
      <form action="." method="post" onSubmit={handleSubmit(props)}>
        <EmailField />
        <RequestField />
        <Captcha />
          <span className={(props.sending && (! props.result))?"loader":"formError"}>{props.result}</span>
          <span className="form submit">
            <button className="proxima" disabled={props.sending} >Отправить запрос</button>
          </span>
      </form>
    </div>

const mapCBFormDispatchToProps = (dispatch) => {
    return {
        sendForm:       (props) => {dispatch(sendForm(props))},
    }
}
const mapCBFormStateToProps = (state) => {
    return {
      sending: state.loading.cbform,
      result: state.cbFormState.result,
    }
}

const mapInputPropsToDispatch = (inputType, stateName) => (dispatch) => {
    return {
      checkValue: ()  => dispatch(cbFormCheckValueAction(stateName || inputType)),
      setValue:   (e="") => dispatch(cbFormValueAction(stateName || inputType, (typeof(e)==='string'?e:e.target.value)))
    }
}
const mapStateToInputProps = (inputType,stateName) => (state) => {
    return {
      ftype:        inputType,
      display:      true,
      val:          state.cbFormState[stateName || inputType],
      incorrect:    (stateName||inputType) in state.cbFormState.incorrect,
      error:        state.cbFormState.incorrect[stateName || inputType]
    }
}

//const NameField = ReactRedux.connect(mapStateToInputProps('name'), mapInputPropsToDispatch('name'))(InputField);
const EmailField = ReactRedux.connect(mapStateToInputProps('email'), mapInputPropsToDispatch('email'))(InputField);
//const SubjectField = ReactRedux.connect(mapStateToInputProps('subject'), mapInputPropsToDispatch('subject'))(InputField);
const RequestField = ReactRedux.connect(mapStateToInputProps('message'), mapInputPropsToDispatch('message'))(TextArea);
const Captcha = ReactRedux.connect(mapStateToInputProps('captcha'),mapInputPropsToDispatch('captcha'))(captcha);

const cbFormActionResult = (reason) => ({type: CBFORM, kind: RESULT, value: reason})
const cbFormValueAction = (field, value) =>({type:CBFORM, kind:SET, value: {[field]:value}})
const cbFormErrorAction = (field, error) => ({type:CBFORM, kind:ERROR, value:{[field]:error} })
const cbFormCheckValueAction = (field) => (dispatch, getState) => {
    if (field == 'message') {return}
    let state = getState()
    let res = check[field](state.cbFormState)
        dispatch(cbFormErrorAction(field, res))
    if (res != "") {
        console.log('Value for', field, 'did not pass check with msg:', res)
    }
}

const handleSubmit = (props) => (e) => {
    e.preventDefault();
    props.sendForm(props);
  }

function sendForm (props) {
    return (dispatch,getState) => {
        let state = getState();
        if (state.loading.cbform) {
            //doubleclick :(
            console.log('double click in callback post')
            return;
        }
        dispatch(itemLoading('cbform'))
        //let fields = ['name','subject','email','captcha', 'message'];
        let fields = ['email','captcha', 'message'];
        fields.forEach((elem) => {
            if (state.cbFormState[elem]) {dispatch(cbFormCheckValueAction(elem))}
        });
        state=getState();
        if (isEmpty(state.cbFormState.incorrect)) {
            let body={};
            fields.forEach((elem) => {
                if (state.cbFormState[elem]) {
                    let value = state.cbFormState[elem];
                    Object.assign(body,{[elem]:value});
                }
            });
            fetch(config.apiBase + 'feedback', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }).then(checkFetchStatus)
              .then((json) => {
                    if (json['result'] == 'ok'){
                        dispatch(cbFormActionResult())
                    } else {
                        dispatch(cbFormActionResult(json['error']))
                    }
                    if (typeof(grecaptcha) !== 'undefined') {
                        grecaptcha.reset()
                    }
                    // prevent multiple posting on success
                    dispatch(cbFormValueAction('email',''))
                    dispatch(itemLoading('cbform'))
                    })
              .catch((error) => {   
                    console.log(error);
                    dispatch(cbFormErrorAction("An error occured. Please, retry"))
                    dispatch(itemLoading('cbform'))
              });
        } else {
            dispatch(itemLoading('cbform'))
        }
    }
}
export let cbFormState = (state={incorrect:{}, email:"", message:"", result:"", captcha:""}, action) => {
    if (action.type != CBFORM) {return state}
    if (action.kind == RESULT) {return Object.assign({}, state, {result:"Ваше сообщение доставлено администратору и на него скоро ответят."})}
    if (action.kind == SET) return Object.assign({}, state, action.value)
    if (action.kind == ERROR) { 
        let field = Object.keys(action.value)[0]
        if (action.value[field] == "") {
            let new_incorrect = Object.assign({}, state.incorrect)
            delete new_incorrect[field]
            return Object.assign({}, state, {incorrect: new_incorrect})
        } else {
            return Object.assign({}, state, {incorrect: Object.assign({}, state.incorrect, action.value)})
        }
    }
    return state;
}


export const CallbackForm = ReactRedux.connect(mapCBFormStateToProps,mapCBFormDispatchToProps)(cbForm)
