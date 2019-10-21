import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 

import './sidebar.css';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        jQuery(function ($) {
            $(".sidebar-dropdown > a").click(function() {
                $(".sidebar-submenu").slideUp(200);
                if ($(this).parent().hasClass("active")) {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this).parent().removeClass("active");
                } else {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this).next(".sidebar-submenu").slideDown(200);
                    $(this).parent().addClass("active");
                }
            });

            $("#close-sidebar").click(function() {
                $(".page-wrapper").removeClass("toggled");
            });
            $("#show-sidebar").click(function() {
                $(".page-wrapper").addClass("toggled");
            });   
        });
    }

    render(){
        const { user={} } = this.props;
        return (
            <div className="page-wrapper chiller-theme toggled">
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div className="user-pic">
                            <img className="img-responsive img-rounded" 
                                src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                alt="User picture" />
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user.first_name} 
                                <strong> {user.last_name}</strong>
                            </span>
                            <span className="user-role">{user.role}</span>
                            <span className="user-status">
                                <i className="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>
                    {/* <!-- sidebar-header  --> */}
                    <div className="sidebar-menu">
                        <ul>
                            <li className="header-menu">
                               {/* <span>General</span> */}
                            </li>
                            <li className="sidebar-dropdown active">
                                <Link to="/">
                                    <i className="fa fa-tachometer-alt"></i>
                                    <span>Dashboard</span>
                                  {/* <span className="badge badge-pill badge-warning">New</span> */}
                                </Link>
                                {/*
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li>
                                            <Link to="/">Dashboard 1
                                                <span className="badge badge-pill badge-success">Pro</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">Dashboard 2</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Dashboard 3</Link>
                                        </li>
                                    </ul>
                                </div>
                                */}
                            </li>
                            <li className="sidebar-dropdown">
                                <Link to="/orders">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Management</span>
                                 {/*   <span className="badge badge-pill badge-danger">3</span> */}
                                </Link>
                                {/*
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li><Link to="/">Products</Link></li>
                                        <li><Link to="/">Orders</Link></li>
                                        <li><Link to="/">Credit cart</Link></li>
                                    </ul>
                                </div>
                                */}
                            </li>
                            
                            <li className="sidebar-dropdown">
                                <Link to="/onboard">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>On Board</span>                              
                                </Link>                               
                            </li>
                            <li className="sidebar-dropdown">
                                <Link to="/product">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Product Management</span>                              
                                </Link>                               
                            </li>
                            
                            <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Document Management</span>
                                
                                </Link>                               
                            </li>
							 <li className="sidebar-dropdown">
                  <Link to="/">
                  <i className="fa fa-shopping-cart"></i>
                  <span>Management</span>
                  </Link>
                  <div className="">
                     <ul>
                        <li  className="sidebar-dropdown">
                           <Link to="/">
                           <span>Project Management</span>
                           </Link>
                        </li>
                        <li className="sidebar-dropdown">
                           <Link to="/">
                           <span>Proposal Management</span>
                           </Link>
                           <div className="sidebar-submenu">
                              <ul>
                                 <li>
                                    <Link to="/add-rfq">
                                    RFQ</Link>
                                 </li>
                                 <li>
                                    <Link to="/Indicative-order">
                                    Indicative Order</Link>
                                 </li>
                                 <li>
                                    <Link to="/contract">
                                    Contract</Link>
                                 </li>
                              </ul>
                           </div>
                        </li>
                     </ul>
                  </div>
               </li>
                            <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Volumetric</span>                                
                                </Link>                              
                            </li>
                            <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Status</span>                               
                                </Link>                              
                            </li>
                            <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Reports</span>
                                
                                </Link>                               
                            </li>
                            <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Tracking</span>                                
                                </Link>                                
                            </li>
                        </ul>
                    </div>
                    {/* <!-- sidebar-menu  --> */}
                </div>
                {/* <!-- sidebar-content  --> */}
                <div className="sidebar-footer">
                    <Link to="/">
                        <i className="fa fa-bell"></i>
                        <span className="badge badge-pill badge-warning notification">3</span>
                    </Link>
                    <Link to="/">
                        <i className="fa fa-envelope"></i>
                        <span className="badge badge-pill badge-success notification">7</span>
                    </Link>
                    <Link to="/">
                        <i className="fa fa-cog"></i>
                        <span className="badge-sonar"></span>
                    </Link>
                    <Link to="/login">
                        <i className="fa fa-power-off text-danger"></i>
                    </Link>
                </div>
            </nav>
            </div>
        )
    }
}

export { Sidebar }