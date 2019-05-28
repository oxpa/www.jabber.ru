import React from 'react';
import {connect} from 'react-redux';

class Footer extends React.PureComponent {

    render = () => (
        <div className="footer">
            <div className="footer-emblem"/>
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
