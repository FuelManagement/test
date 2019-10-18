import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    "paddingLeft": "20px"
}

class LandingPageHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <div className="row">
                    <header className="col-12">
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <div className="row">
                                    <div className="w-100 pad-50">
                                        <img src={require('../../../assets/img/geonet.png')} width="200px"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 pad-50">
                                <div className="row">
                                    <ul className="list-inline col-12 pad-50">
                                        <li className="float-right" style={linkStyle}><Link to="/Register" className="link"> Sign Up </Link></li>
                                        <li className="float-right" style={linkStyle}><Link to=""> | </Link></li>
                                        <li className="float-right" style={linkStyle}><Link to="/login" className="link"> Sign In </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
        );
    }
}

export { LandingPageHeader as LandingPageHeader };