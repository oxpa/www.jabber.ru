import React from 'react';
import {connect} from 'react-redux';

class Footer extends React.PureComponent {

    render = () => (
        <div className="footer">
            <div className="footer-emblem">
              <img alt="jabber.ru" src="/images/logo.png"/>
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
                    <div><a href="http://jc.jabber.ru/">Рейтинг конференций</a></div>
                    <div><a href="https://www.jabber.ru/chatlogs/">Архив сообщений</a></div>
                    <div><a href="https://juick.com/">Juick</a></div>
                </div>
                <div className="footer-menu-column">
                    <div><a href="https://chat.jabber.ru/">chat.jabber.ru</a></div>
                    <div><a href="https://www.xabber.com/">Xabber</a></div>
                    <div><a href="https://conversations.im/">Conversations</a></div>
                </div>
            </div>
        </div>
    );
}

export default connect()(Footer);
