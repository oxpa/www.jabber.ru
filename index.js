import {App, store} from "./components/application.js"
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import * as ReactDOM from 'react-dom';
import * as React from 'react';

const history = syncHistoryWithStore(browserHistory, store);

const SApp = App(history);

ReactDOM.render(
    <SApp/>
, document.getElementById('RC'))
