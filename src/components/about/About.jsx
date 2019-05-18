import React from 'react';
import {connect} from "react-redux";

class About extends React.PureComponent {
    render() {
        return (
            <>
                About page.
            </>
        );
    }
}

export default connect(() => ({}), () => ({}))(About);
