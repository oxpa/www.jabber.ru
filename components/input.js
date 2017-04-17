import * as React from 'react'

export class TextArea extends React.Component{
  render () {
    let props=this.props;
    if (!props.display) {return null}
    return (
      <div className={"form " + props.ftype}>
          <textarea className={"proxima "+((props.incorrect)?"has-error":"")}
                    placeholder={props.ftype}
                    tabIndex={props.tabIndex}
                    value={props.val}
                    onChange={props.setValue}
                    onBlur={props.checkValue}
                    type={ props.ftype }
                    name={ props.ftype }
                    key={props.ftype}
                    ref={(inp) => this._input=inp }
                  > </textarea>
          {(props.incorrect)?<div className="error proxima">{props.error}</div>
          : ""
          }
      </div>)
  }
}

export class InputField extends React.Component{ 
  componentDidMount() {
    this.props.focus && this.props.display && this._input.focus();
  }
  render () { 
    let props=this.props; 
    if (!props.display) {return null}
    return (
      <div className={"form " + props.ftype}>
          <input  className={"proxima "+((props.incorrect)?"has-error":"")}
                  placeholder={props.ftype}
                  tabIndex={props.tabIndex}
                  value={props.val}
                  onChange={props.setValue}
                  onBlur={props.checkValue}
                  type={ props.ftype }
                  name={ props.ftype }
                  key={props.ftype}
                  ref={(inp) => this._input=inp }
                  />
          {(props.incorrect)?<div className="error proxima">{props.error}</div>
          : ""
          }
      </div>)
  }
}

let check = {};
check.login = (state) => {
    let Login = state.login;
    let Domains = state.domains;
    if (Login.length < 1) return "Введите логин, пожалуйста";
    if (Login.length > 512) return "Пожалуйста, используйте более короткий логин";
    if(!(typeof(Domains) === 'undefined')) {
        if (Login.indexOf('@') != -1) {
            let domain = Login.split('@',2)[1];
            console.log(domain);
            if (Domains.some((elem) => elem === domain)) {return "";}
            else return "Мы не поддерживаем домен "+domain;
        }
        //return "Логин не должен содержать символ '@'"
    };
    
    return "";
};
check.password = (state) => {
    let Password = state.password;
    if (Password.length <5) return "Пароль должен быть не менее 5 букв";
    if (Password.length >512) return "Пожалуйста, используйте более короткий пароль";
    return "";
};
check.email = (state) => {
    var filter=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/ui;
    if (filter.test(state.email)) {
        return "";
    } else {
        return "Не больно-то это похоже на email адрес";
    }
};
check.captcha = (state) => {
    if (state.captcha.length > 1) {return ""}
    return "заполните, пожалуйста, капчу"
};
check.confirmation = (state) => {
    if (state.confirmation == state.password) {return ""}
    return "введённые пароли должны совпадать!"
}

export {check};
