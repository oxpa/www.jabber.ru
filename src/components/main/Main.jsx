import React from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../app/AppActions';

import Header from '../header/Header';
import Footer from '../footer/Footer';

class Main extends React.PureComponent {

    static propTypes = {
        signup: func
    };

    render() {
        return (
            <div className="main">
                <Header/>
                <div className="intro">
                    <p>
                        Чат, который всегда с тобой
                    </p>
                    <p>
                        Присоединяйся к нам, барон!
                    </p>
                </div>
                <div className="intro intro-image">
                </div>
                <div className="info">
                    <h3>Коротко о главном</h3>
                    <p>
                        Jabber.ru - это такой мессенджер.
                        Бесплатный, безопасный, независимый,
                        не содержит рекламы и не собирает данные
                        о пользователях.
                    </p>
                </div>
                <div className="donation">
                    <h3>Помогите, чем можете</h3>
                    <p>
                        Наш чат всегда был бесплатным, таким
                        и останется. Но мы с благодарностью примем
                        пожертвования от всех, кому нравится jabber.ru
                    </p>
                </div>
                <div className="login">
                </div>
                <div className="news">
                </div>
                <div className="clients">
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(
    state => ({
        waiting: state.getIn(['login', 'waiting'], false),
        failed: state.getIn(['login', 'failed'], false),
        token: state.getIn(['login', 'token'], null)
    }),
    dispatch => ({
        signup: (username, password) => login(dispatch, username, password),
    }))(Main);
