import React from 'react';
import { connect } from 'react-redux';

class Dashboard_Importer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-10 offset-md-2 contentDiv">
                <img src={require('../../../assets/img/Dashboard.jpg')} alt="Dashboard Image" className="dasboardStatic"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(Dashboard_Importer);
export { connectedHomePage as Dashboard_Importer };
