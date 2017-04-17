import {Promise} from 'es6-promise';
import {Link} from 'react-router';
import * as ReactRedux from 'react-redux';
import * as config from './config';
import * as React from 'react';
import * as Redux from 'redux';
import 'whatwg-fetch';
import {isEmpty,checkFetchStatus} from './helpers'
import {Recaptcha} from './captcha.js'
import {InputField, check} from './input.js'
import {LOGINF, REGF, REMINDF, formAction, checkFormValueAction, formSetValueAction, formSuccessAction, formState, formValues, checkValue, submitForm} from './loginFormState.js'
import * as msg from './form.messages.js'


const handleSubmit = (props) => (e) => {
    e.preventDefault();
    props.sendForm(props);
  }

const NewPasswordFormHeader = () => <div className="formHeaderRow ">
        <span className="formHeader regLabel">
            Введите новый пароль
        </span>
      </div>

const NoLinksFormHeader = (props) =>  <div className={"formHeaderRow " + props.nolinks}>
        <a className={"formHeader regLabel" +(props.kind==LOGINF?" rtxt":"")} to="#login" onClick={props.setLogin}>Вход</a>
        <a className={"formHeader regLabel" +(props.kind==REGF?" rtxt":"")} to="#register" onClick={props.setReg}>Регистрация</a>
      </div>

const FormHeader = (props) => {
    if (props.pwset) {return NewPasswordFormHeader(props) }
    if (props.nolinks) { return NoLinksFormHeader(props) }
    return (
      <div className={"formHeaderRow " + props.nolinks + " " + props.kind}>
        <Link className="formHeader logLabel" activeClassName="rtxt" to="/login" >Вход</Link>
        <Link className="formHeader regLabel" activeClassName="rtxt" to="/register" >Регистрация</Link>
        <Link className="formHeader remLabel" activeClassName="rtxt" to="/remind" >Сброс пароля</Link>
        <a className="close" onClick={() => props.router.push('/')} />
      </div>
    )
}
const captcha = (props) => {
      if (props.display) return (
        <div className="form">
          <div className={"recap" + (props.incorrect?" has-error":"")}>
            <Recaptcha callback={props.setValue} expireCallback={props.setValue} tabIndex="0"/>
            <div className="error proxima">{props.error}</div>
          </div>
        </div>)
      return null
}

const FormItself = (props) =>
  <div className="fwrap gradient-log">
    <FormHeader nolinks={props.nolinks || ""} router={props.context.router} 
                pwset={props.secondStage} kind={props.kind}
                setReg={props.setReg} setLogin={props.setLogin}/>
    <form action='.' method='post' onSubmit={handleSubmit(props)}>
      <LoginField />
      <PasswordField />
      <PasswordConfirmationField />
      <EmailField />
      <Captcha />
      <div className="form">
        <div className="form submit">
          <button className="proxima" disabled={props.sending} >{props.actionLabel}</button>
        </div>
        <div className={props.sending?"loader":"formError"}>{props.result}</div>
      </div>
      <div className="form remind">
        <Link className="proxima" to="/remind">напомнить пароль</Link>
      </div>
    </form>
  </div>

const Message = (props) => {
  if ( props.message  ){
    return (
    <div className="fwrap gradient-log message">
        {msg.success[props.result]}
    </div>)
  }
  return null
}
const LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount: function () {
    if (this.props.loggedin) {
        this.context.router.push('/personal')
    }
  },
  render: function () {
      let props=this.props
      if (props.loading) {
        return <div className="loginForm">
            <div className="loader"></div>
        </div>
      }
      return (
        <div id={props.id} className="loginForm">
          <div className="scroll">
            {props.message?
              <Message {...props} />
             :<FormItself {...props} context={this.context}/>
            }
            <div className="hg2">
              <span><img src="/static/hg.png"/></span>
            </div>
          </div>
        </div>
    )
  }
});

export function setLoginForm()                      {return formAction(LOGINF, false)}
export function setRegForm(SecondStage=false)       {return formAction(REGF, SecondStage)}
export function setRemindForm(SecondStage=false)    {return formAction(REMINDF, SecondStage)}
export function setResetForm()                      {return formAction(REMINDF, true)}

const mapLoginFormDispatchToProps = (dispatch) => {
    return {
        setLogin:       ()      => {dispatch(setLoginForm())},
        setReg:         ()      => {dispatch(setRegForm())}, 
        setRemind:      ()      => {dispatch(setRemindForm())},
        sendForm:       (props) => {dispatch(submitForm(props))},
        formSuccessAction: (kind, secondStage) =>   {dispatch(formSuccessAction(kind,secondStage))}
    }
}
const mapLoginFormStateToProps = (state) => {
    return {
      loggedin: state.user.loggedin || false,
      loading: !(('vcard' in state.loading ) || ('vcard' in state.user)) || ('vcard' in state.loading && state.loading.vcard),
      kind: state.loginForm.formState.kind,
      secondStage: state.loginForm.formState.secondStage,
      actionLabel: state.loginForm.formState.actionLabel,
      sending: state.loginForm.formState.sending,
      result: state.loginForm.formState.result,
      message: state.loginForm.formState.message
    }
}
const mapInputPropsToDispatch = (inputType, stateName) => (dispatch) => {
    return {
      checkValue: ()  => dispatch(checkFormValueAction(stateName || inputType)),
      setValue:   (e="") => dispatch(formSetValueAction(stateName || inputType, (typeof(e)==='string'?e:e.target.value)))
    }
}
const mapStateToInputProps = (inputType,stateName) => (state) => {
    return {
      ftype:        inputType,
      display:      state.loginForm.formState[stateName || inputType],
      val:          state.loginForm.formValues[stateName || inputType],
      incorrect:    (stateName||inputType) in state.loginForm.formValues.incorrect,
      error:        state.loginForm.formValues.incorrect[stateName || inputType]
    }
}
const LoginField = ReactRedux.connect(mapStateToInputProps('login'), mapInputPropsToDispatch('login'))(InputField);
const PasswordField = ReactRedux.connect(mapStateToInputProps('password'), mapInputPropsToDispatch('password'))(InputField);
const PasswordConfirmationField = ReactRedux.connect(mapStateToInputProps('password','confirmation'), mapInputPropsToDispatch('password','confirmation'))(InputField);
const EmailField = ReactRedux.connect(mapStateToInputProps('email'), mapInputPropsToDispatch('email'))(InputField);
const Captcha = ReactRedux.connect(mapStateToInputProps('captcha'),mapInputPropsToDispatch('captcha'))(captcha);
export const loginForm = Redux.combineReducers({ formState, formValues})
export const LoginFormConnected = ReactRedux.connect(mapLoginFormStateToProps, mapLoginFormDispatchToProps)(LoginForm);


