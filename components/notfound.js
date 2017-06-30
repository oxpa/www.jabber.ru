import {Footer} from "./menus.js";
import {LoginFormConnected}  from "./loginForm.js";
import {Link} from 'react-router';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

export const NotFound = (props) => {
    return <div className="loginForm">
        <p className="notFoundNumber">404</p>
        <p className="notFoundText">No secret page for you. Only 404 is here :( </p>
    </div>
}

