import React from 'react';
import {connect} from "react-redux";

class Help extends React.PureComponent {
    render() {
        return (
            <>
                Help page.
            </>
        );
    }
}

export default connect(() => ({}), () => ({}))(Help);
