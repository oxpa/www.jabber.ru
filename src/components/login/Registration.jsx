import React from 'react';
import {connect} from "react-redux";
import {func} from 'prop-types';

class Registration extends React.PureComponent {

    static propTypes = {
        switchToSignup: func.isRequired
    };

    render() {
        return (
            <>
                <div className="login-row login-title">
                    <p className="underline big">
                        Регистрация
                    </p>
                    <p className="left-right-margin">
                        /
                    </p>
                    <p className="clickable big" onClick={this.props.switchToSignup}>
                        Вход
                    </p>
                </div>
                <div className="login-row">
                    <input placeholder="Имя пользователя"/>
                </div>
                <div className="login-row">
                    <input placeholder="Email"/>
                </div>
                <div className="login-row">
                    <button>Регистрация</button>
                </div>
                <div className="login-row login-info">
                    После регистрации скачайте программу
                    из перечня ниже, позовите друзей
                    и общайтесь.
                </div>
            </>
        );
    }
}

export default connect()(Registration);
