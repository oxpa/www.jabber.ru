import React from 'react';
import {connect} from "react-redux";
import {bool} from 'prop-types';

class Login extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            selectedAuth: true
        }
    }

    static propTypes = {
        isLogged: bool
    };

    render() {
        return (
            <div className="login-root">
                Login page.
            </div>
        );
    }
}

export default connect(state => ({
    isLogged: state.getIn(['login', 'token'], null) !== null
}), () => ({}))(Login);
