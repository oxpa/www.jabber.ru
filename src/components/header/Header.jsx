import React from 'react';
import {connect} from 'react-redux';

class Header extends React.PureComponent {

    render = () => (
        <div className="row-wide header"/>
    );
}

export default connect()(Header);
