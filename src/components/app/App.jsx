import React from 'react';
import {Provider} from 'react-redux';
import './App.scss';
import store from '../../rootStore';
import Router from '../router/Router';

export default class App extends React.PureComponent {

    render = () => (
        <div className="root">
            <Provider store={store}>
                <Router/>
            </Provider>
        </div>
    );
}
