import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.PureComponent {

    render = () => (
        <div className="header">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/about">
                О нас
            </NavLink>
            <NavLink to="/service">
                Сервисы
            </NavLink>
            <NavLink to="/help">
                Помощь
            </NavLink>
        </div>
    );
}

export default connect()(Header);
