import React from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../app/AppActions';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import {List} from 'immutable';
import Slider from "react-slick";

import Footer from '../footer/Footer';
import Login from '../login/Login';

class Main extends React.PureComponent {

    static propTypes = {
        signup: func,
        loadClients: func,
        clients: object
    };

    componentDidMount() {
        this.props.loadClients();
    }

    render() {
        return (
            <div className="main">
                <div className="intro-first"/>
                <div className="intro">
                    <h2>Чат, который всегда с тобой</h2>
                    <p>
                        Присоединяйтесь к нам, барон!
                    </p>
                </div>
                <div className="intro-logo">
                    <img alt="intro" className="intro-image" src="/images/intro.png"/>
                </div>
                <div className="intro-last"/>
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
                    <button>Хочу помочь</button>
                </div>
                <div className="login">
                    <Login/>
                </div>
                <div className="news">
                    <h3>
                        Новости
                    </h3>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="Jabberru"
                        noHeader
                        noFooter
                        noBorders
                        options={{height: 260}}
                    />
                </div>
                <div className="row-wide clients">
                    <div className="slider-container">
                        <Slider
                            centerMode
                            slidesToShow={3}
                        >
                            {this.props.clients.map((c, idx) => {
                                return (
                                    <div key={`client-${idx}`}>{c.get('name')}</div>
                                );
                            })}
                        </Slider>
                    </div>
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
        token: state.getIn(['login', 'token'], null),
        clients: state.getIn(['main', 'clients'], List())
    }),
    dispatch => ({
        signup: (username, password) => login(dispatch, username, password),
        loadClients: () => dispatch({type: 'LOAD_CLIENTS_STARTED'}),
    }))(Main);
