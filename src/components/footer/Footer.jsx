import React from 'react';
import {connect} from 'react-redux';

class Footer extends React.PureComponent {

    render = () => (
        <>
            <div className="medium-blue"/>
            <div className="row-full footer">
            </div>
            <div className="medium-blue"/>
        </>
    );
}

export default connect()(Footer);
