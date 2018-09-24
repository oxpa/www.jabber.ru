import {Footer} from "./menus.js";
import {LoginFormConnected}  from "./loginForm.js";
import {Link} from 'react-router';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

export const RootPlain = (props) => {
    return <Footer>
     <div className="root">
      <div className="dialog">
        <div className="hello">
        
        </div>
        <div className="phrases">
          <h1>Где я?</h1> <p>Это — Jabber.ru, джаббер, мессенджер, чат.</p>
          <h1>С чего начать?</h1> <p>Зарегистрироваться (<a href="#form">форма</a> ниже), скачать <span><Link to="/download">клиент по нраву</Link>,</span> написать друзьям. Потом прочесть <Link to="/about">помощь</Link>.</p>
          <h1>А почему не... </h1> <p>Если кратко — мы лучше. Подробней — <Link to={{pathname:'/about/', hash:'#why'}}>в разделе «помощь»</Link>.</p>
        </div>
      </div>
      <div className="mainreg">
        <div className="mainhelp">
          <h1>Несколько советов</h1>
          <p>Логин (имя пользователя) вы будете сообщать собеседникам. Используйте только латинские буквы и цифры.</p>
          <p>К имени пользователя автоматом добавят домен — "jabber.ru". Из "elena" получится "elena@jabber.ru".</p>
          <p>На сайте можно использовать логин без домена. В программах и для собеседников — только с доменом.</p>
          <p>На странице <Link to="/about/">помощи</Link> есть форма обратной связи и ответы на частозадаваемые вопросы.</p>
        </div>
        <div className="mainlogin">
          { props.loading ?
                <div className="loader"></div>
            :   props.loggedin?
                    null
                :
                    <LoginFormConnected id="form" nolinks={"nolinks"} />
          }
        </div>
      </div>
    </div>
  </Footer>
}

const mapStateToRootProps = (state) => {
    return {
        // if there is no 'vcard' state at all or it is not yet resolved
        loading: !(('vcard' in state.loading ) || ('vcard' in state.user)) || ('vcard' in state.loading && state.loading.vcard),
        loggedin: state.user.loggedin,
    }
}


export const Root = ReactRedux.connect(mapStateToRootProps)(RootPlain)
