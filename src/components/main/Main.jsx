import React from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../app/AppActions';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import {List} from 'immutable';
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Header from '../header/Header';
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
                <Header/>
                <div className="light-blue row-0"/>
                <div className="row-1 intro">
                    <h2>Чат, который всегда с тобой</h2>
                    <p>
                        Присоединяйся к нам, барон!
                    </p>
                </div>
                <div className="row-2 intro intro-image">
                </div>
                <div className="light-blue"/>
                <div className="row-1 info">
                    <h3>Коротко о главном</h3>
                    <p>
                        Jabber.ru - это такой мессенджер.
                        Бесплатный, безопасный, независимый,
                        не содержит рекламы и не собирает данные
                        о пользователях.
                    </p>
                </div>
                <div className="row-2 donation">
                    <h3>Помогите, чем можете</h3>
                    <p>
                        Наш чат всегда был бесплатным, таким
                        и останется. Но мы с благодарностью примем
                        пожертвования от всех, кому нравится jabber.ru
                    </p>
                    <button>Хочу помочь</button>
                </div>
                <div className="row-1 login">
                    <Login/>
                </div>
                <div className="row-2 news">
                    <h3>
                        Новости
                    </h3>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="Jabberru"
                        noHeader
                        noFooter
                        noBorders
                        options={{height: 300}}
                    />
                </div>
                <div className="row-wide clients">
                    <CarouselProvider
                        naturalSlideHeight={10}
                        naturalSlideWidth={100}
                        visibleSlides={1}
                        totalSlides={this.props.clients.size}
                    >
                        <Slider>
                            {this.props.clients.map((c, idx) => {
                                return (
                                    <Slide key={`client-${idx}`} index={idx}>{c.get('name')}</Slide>
                                );
                            })}
                        </Slider>
                        <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext>
                    </CarouselProvider>
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
