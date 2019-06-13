import React from 'react';
import {connect} from "react-redux";
import {func} from 'prop-types';

class Registration extends React.PureComponent {

    static propTypes = {
        switchToRegistration: func.isRequired
    };

    render() {
        return (
            <>
                <div className="login-row login-title">
                    <div className="clickable big" onClick={this.props.switchToRegistration}>
                        Регистрация
                    </div>
                    <div className="left-right-margin">
                        /
                    </div>
                    <div className="underline big">
                        Вход
                    </div>
                </div>
                <div className="login-row">
                    <input placeholder="Имя пользователя"/>
                </div>
                <div className="login-row">
                    <input placeholder="Пароль"/>
                </div>
                <div className="login-row">
                    <button>Вход</button>
                </div>
                <div className="login-row">
                    <a href="#" className="reset-password">Напомнить пароль</a>
                </div>
            </>
        );
    }
}

export default connect()(Registration);
