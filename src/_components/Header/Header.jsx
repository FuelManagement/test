import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /**Manoj Change start*/
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 gray-bg border-bottom shadow-sm fixed-header">
                <Link className="my-0 mr-md-auto font-weight-normal" to="/">
                <img src={require('../../../assets/img/small_header.JPG')} />   
                </Link>
                <nav className="my-2 my-md-0 mr-md-3">
                  <Link className="p-2 text-white font-big link" to="/login">
                    <i className="fas fa-bell"></i>
                  </Link>
                  <Link className="p-2 text-white font-big link" to="/login">
                    <i className="fas fa-cog"></i>
                  </Link>
                  <Link className="p-2 text-white shadow-btn link text-black" to="/login" >Sign Out</Link>
                </nav>
                <Link className="p-2 text-white font-big" to="#">
                  <i className="fas fa-user-circle"></i>
                </Link>
            </div>
            /**Manoj Change End*/
        )
    }
}

export { Header }