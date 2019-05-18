import React from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../app/AppActions';

class Main extends React.PureComponent {

    static propTypes = {
        signup: func
    };

    render() {
        return (
            <div>
                Hello, World!
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
