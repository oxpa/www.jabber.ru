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
                    <a href="#" onClick={this.props.switchToRegistration}>
                        Регистрация
                    </a>
                    /
                    <div>
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
                    После регистрации скачайте программу
                    по нраву из перечня ниже, призовите друзей
                    и общайтесь
                </div>
            </>
        );
    }
}

export default connect()(Registration);
