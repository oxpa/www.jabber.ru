import React from 'react';
import {connect} from "react-redux";

class Service extends React.PureComponent {
    render() {
        return (
            <>
                About page.
            </>
        );
    }
}

export default connect(() => ({}), () => ({}), Service);
