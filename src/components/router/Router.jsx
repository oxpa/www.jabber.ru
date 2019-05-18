import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Main from '../main/Main';
import About from '../about/About';
import Service from '../service/Service';

export default class Router extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={Main}/>
                <Route path="/about" exact component={About}/>
                <Route path="/service" exact component={Service}/>
            </BrowserRouter>
        );
    }
}
