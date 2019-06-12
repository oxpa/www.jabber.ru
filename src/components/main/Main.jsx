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
                    <div className="intro-text big">
                        Чат, который всегда с тобой
                    </div>
                </div>
                <div className="intro-middle"/>
                <div className="intro-logo">
                    <img alt="intro" className="intro-image" src="/images/intro.png"/>
                </div>
                <div className="intro-last"/>
                <div className="info">
                    <p className="big">
                        Один абзац о нас
                    </p>
                    <p>
                        Jabber.ru - это мессенджер.
                        Бесплатный, безопасный, независимый,
                        не содержит рекламы и не собирает данные
                        о пользователях.
                    </p>
                </div>
                <div className="donation">
                    <p className="big">
                        Помочь нам
                    </p>
                    <p>
                        Наш чат всегда был бесплатным, таким
                        и останется. Но мы с благодарностью примем
                        пожертвования от всех, кому нравится jabber.ru
                    </p>
                    <button>Помочь!</button>
                </div>
                <div className="login">
                    <Login/>
                </div>
                <div className="news">
                    <p className="big">
                        Новости
                    </p>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="Jabberru"
                        noHeader
                        noFooter
                        noBorders
                        options={{height: 260, width: 460}}
                        transparent
                    />
                </div>
                <div className="row-wide clients">
                    <div className="slider-container">
                        <Slider
                            centerMode
                            slidesToShow={5}
                            dots
                        >
                            {this.props.clients.map((c, idx) => {
                                return (
                                    <div className="slider-item" key={`clients-${idx}`}>
                                        <a className="slider-item-title" href={c.get('link')}>
                                            {c.get('name')}
                                        </a>
                                        <div className="slider-item-content">
                                            <a className="slider-item-image" href={c.get('link')}>
                                                <img alt={c.get('name')} src={c.get('imgUrl')}/>
                                            </a>
                                        </div>
                                    </div>
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
