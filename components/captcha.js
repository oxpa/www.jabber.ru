import {captchaSiteKey} from './config.js'
import * as React from 'react'

export const resetCaptcha = (cptID) => {
  console.log('trying to reset captcha');
  if (typeof(cptId) === "undefined") {
    if(typeof(window.grecaptcha) !== "undefined" && typeof(window.cptID) !== "undefined") {
      console.log('found global recaptcha');
      try {
        window.grecaptcha.reset(window.cptID)
      } catch (err) {
        console.log('error reseting captcha', err)
      }
    } else {
      console.log('no global captcha could be found for reset!')
    }
  } else {
    if (typeof(window.grecaptcha) !== "undefined") {
      console.log('found',cptID, 'recaptcha');
      try {
        window.grecaptcha.reset(cptID)
      } catch (err) {
        console.log('error reseting captcha', err)
      }
    } else {
      console.log('no local captcha could be found for reset!')
    }
  }
}

export class Recaptcha extends React.Component {
  constructor(props) {
    super(props);
    //this.props = Object.assign({},props);
  }
  componentWillUnmount () {
    resetCaptcha(window.cptID)
  }
  renderCaptcha (that)  { return () => {
    console.log('that in captcha is', that)
    window.cptID = grecaptcha.render("recaptcha",
      {"sitekey": that.props.sitekey,
       "theme": that.props.theme,
       "callback": that.props.callback,
       "data-expired-callback": that.props.expireCallback,
       "size": that.props.size,
       "tabIndex": that.props.tabIndex
    })

  }}
  componentDidMount () {
    if (typeof (grecaptcha) === "undefined") {
      window.renderCaptcha = this.renderCaptcha(this);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=renderCaptcha';
      script.async = true;
      document.body.appendChild(script);
    } else {
        this.renderCaptcha(this)();
    }
  }
  render() {
    return <div id="recaptcha" className={this.props.className}></div>
  }
}

Recaptcha.PropTypes = {
    sitekey: React.PropTypes.string,
    theme:  React.PropTypes.string,
    callback: React.PropTypes.func.isRequired,
    expireCallback: React.PropTypes.func.isRequired,
    size: React.PropTypes.string,
    tabIndex: React.PropTypes.number.isRequired,
    className: React.PropTypes.string
}
Recaptcha.defaultProps = {
    sitekey: captchaSiteKey,
    theme: "light",
    size: "normal"
}
