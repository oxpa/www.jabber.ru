import React from 'react';
import SVG from 'react-inlinesvg';
import {connect} from 'react-redux';

import Emblem from './emblem.svg';

class Footer extends React.PureComponent {

    render = () => (
        <div className="footer">
            <div className="footer-emblem">
              <img src="/images/logo.png"/>
            </div>
            <div className="services">
                <div className="title">Помощь</div>
                <div className="title">Сервисы</div>
                <div className="title">Клиенты</div>
                <div className="footer-menu-column">
                    <div>FAQ</div>
                    <div>Contacts</div>
                </div>
                <div className="footer-menu-column">
                    <div>Рейтинг конференций</div>
                    <div>Архив сообщений</div>
                    <div>Juick</div>
                </div>
                <div className="footer-menu-column">
                    <div>chat.jabber.ru</div>
                    <div>Xabber</div>
                    <div>Conversations</div>
                </div>
            </div>
        </div>
    );
}

export default connect()(Footer);
