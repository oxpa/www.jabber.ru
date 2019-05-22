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
                    <h3 className="underline">
                        Регистрация
                    </h3>
                    /
                    <h3 className="clickable" onClick={this.props.switchToSignup}>
                        Вход
                    </h3>
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
