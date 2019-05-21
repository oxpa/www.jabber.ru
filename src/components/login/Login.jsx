import React from 'react';
import {connect} from "react-redux";
import {bool} from 'prop-types';

import Registration from './Registration';
import Signup from './Signup';

class Login extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            selectedAuth: false
        }
    }

    static propTypes = {
        isLogged: bool
    };

    switchToSignup = () => {
        this.setState({selectedAuth: true})
    };

    switchToRegistration = () => {
        this.setState({selectedAuth: false})
    };

    render() {
        return (
            <div className="login-root">
                {
                    this.state.selectedAuth
                        ? <Signup
                            switchToRegistration={this.switchToRegistration}
                        />
                        : <Registration
                            switchToSignup={this.switchToSignup}
                        />
                }
            </div>
        );
    }
}

export default connect(state => ({
    isLogged: state.getIn(['login', 'token'], null) !== null
}), () => ({}))(Login);
