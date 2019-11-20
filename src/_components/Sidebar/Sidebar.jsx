import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 

import './sidebar.css';
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        jQuery(function ($) {
            $(".sidebar-dropdown > a").click(function () {
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

            $("#close-sidebar").click(function () {
                $(".page-wrapper").removeClass("toggled");
            });
            $("#show-sidebar").click(function () {
                $(".page-wrapper").addClass("toggled");
            });
        });
    }

    render() {
        const { user = {} } = this.props;
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
                            <div className="user-info" >
                            <span className="user-status">
                                    {/* <i className="fa fa-circle"></i>
                                    <span>Online</span> */}
                                </span>
                                <span className="user-name">{user.firstName}{' '}{user.lastName}{user.first_Name}{' '}{user.last_Name}{user.first_name}{' '}{user.last_name}
                                    
                                </span>
                                <span className="user-role">{user.role != undefined ? user.role :user.participantType}{' : '}{user.domain}{user.participantName}</span>
                                
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

                                </li>
                                
                                { user.role == 'Admin' ?(
                                    <div>
                                <li className="sidebar-dropdown">
                                    <Link to="/profile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>On-boarding</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            {/* <li><Link to="/">Registration</Link></li> */}
                                            <li><Link to="/profile">Participant Setup</Link></li>
                                            <li><Link to="#">Invite Participants</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>User Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                        {/* <i className="fa fa-shopping-cart"></i> */}
                                            <li><Link to="/userProfile">User Profile</Link></li>
                                            <li><Link to="#">Setup Roles </Link></li>
                                            <li><Link to="#">Assign Privileges</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Product Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                                <li><Link to="/product">Manage Products</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Document Management</span>

                                    </Link>
                                </li>
                                <li className>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Alerts & Notifications</span>

                                    </Link>
                                </li>

                                
                                </div>
                                ):(user.participantType == 'End Buyer' ||  
                                user.participantType == 'Commercial')?
                                (<div>
                                <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>User Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                       
                                            <li><Link to="/userProfile">User Profile</Link></li>
                                            <li><Link to="#">Setup Roles </Link></li>
                                            <li><Link to="#">Assign Privileges</Link></li>
                                        </ul>
                                    </div>
                                </li> 
                                <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Management</span>
                                </Link>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li><Link to="#">Quotes</Link></li>
                                        <li><Link to="#">Proposals</Link></li>
                                        <li><Link to="#">Purchase Orders </Link></li> 
                                        {user.participantType == 'End Buyer' ?  <div style={{display:'inline-block'}}>
                                            <li><Link to="/order-tracking">Order Tracking</Link></li>
                                            <li><Link to="/order-tracking/blockchain-transaction">Blockchain Transaction</Link></li>
                                            </div>
                                        :null
                                        }
                                        
                                        {user.participantType == 'Commercial' ?  
                                        <li><Link to="/orderTracking-request">Order Tracking Request</Link></li>:null
                                        }
                                    </ul>
                                </div>
                            </li> 
                            <li className>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Document Management</span>

                                    </Link>
                            </li>             
                            {user.participantType == 'End Buyer' ? (        
                            <li className="sidebar-dropdown">
                                <Link to="/volumetric">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Volumetric</span>
                                </Link>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li><Link to="#">By Volume</Link></li>
                                        <li><Link to="#">By Sales</Link></li>
                                        <li><Link to="#">By Site </Link></li>
                                  
                                    </ul>
                                </div>
                            </li> ):null
                           }
                            <li className>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Alerts & Notifications</span>

                                    </Link>
                                </li> 

                                </div>
                                )     
                                
                                : (user.participantType == 'Carrier (Mex)') ?
                                (<div>
                                <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>User Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                       
                                            <li><Link to="/userProfile">User Profile</Link></li>
                                            <li><Link to="#">Setup Roles </Link></li>
                                            <li><Link to="#">Assign Privileges</Link></li>
                                        </ul>
                                    </div>
                                </li> 
                                <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Management</span>
                                </Link>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li><Link to="#">Dispatch Orders</Link></li>
                                        <li><Link to="/order-tracking/manage-gps-auth">Manage GPS Authorizations</Link></li>                                 
                                    </ul>
                                </div>
                                
                            </li> 
                            <li>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Document Management</span>

                                    </Link>
                            </li>      

                            <li>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Alerts & Notifications</span>

                                    </Link>
                            </li>
                            
                                </div>
                                )
                                : (user.participantType == 'Oil Well') ? (
                                <div>
                                    <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>User Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                       
                                            <li><Link to="/userProfile">User Profile</Link></li>
                                            <li><Link to="#">Setup Roles </Link></li>
                                            <li><Link to="#">Assign Privileges</Link></li>
                                        </ul>
                                    </div>
                                </li> 
                                <li className="sidebar-dropdown">
                                <Link to="#">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Order Management</span>
                                </Link>
                                <div className="sidebar-submenu">
                                    <ul>
                                        <li><Link to="#">Quotes</Link></li>
                                        <li><Link to="#">Proposals</Link></li>
                                        <li><Link to="#">Purchase Orders </Link></li>                                          
                                        <li><Link to="/order-tracking">Tracking</Link></li>:null
                                        
                                    </ul>
                                </div>
                            </li> 
                            <li>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Document Management</span>

                                    </Link>
                            </li>     
                            <li>
                                <Link to="/volumetric">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Volumetric</span>
                                </Link>
                                
                            </li> 
                            <li>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Alerts & Notifications</span>

                                    </Link>
                            </li>
                                </div>
                                ) : null
    }
                                {/* { user.role != 'Admin' ?( 
                                    <div>
                                <li className="sidebar-dropdown">
                                    <Link to="/userProfile">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>User Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                        
                                            <li><Link to="/userProfile"> User Profile</Link></li>
                                            <li><Link to="#">Setup Roles </Link></li>
                                            <li><Link to="#"> Assign Privileges</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link to="/">
                                        <span>Management</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                           
                                            <li className="sidebar-dropdown">
                                                <Link to="/">
                                                    <span>Project Management</span>
                                                </Link>
                                            </li>
                                            <li className="sidebar-dropdown">
                                                <Link to="/rfq">
                                                    <span>Proposal Management</span>
                                                </Link>
                                                <div className="sidebar-dropdown">
                                                    <ul>
                                                        <li>
                                                            <Link to="/rfq">
                                                                RFQ</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/indicative-offer">
                                                                Indicative Offer</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/contract">
                                                                Contract</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="sidebar-dropdown">
                                                <Link to="/purchaseOrder">
                                                    <span>Order Management</span>
                                                </Link>
                                                <div className="sidebar-dropdown">
                                                    <ul>
                                                        <li>
                                                            <Link to="/purchaseOrder">
                                                            Purchase Order </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/salesOrder">
                                                            Sales Order</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/dispatchOrder">
                                                            Dispatch Order</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* <li className="sidebar-dropdown">
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
                                    <Link to="/volumetric">
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
                                    <Link to="/order-tracking">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Order Tracking</span>
                                    </Link>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <Link to="/order-tracking/manage-gps-auth">
                                                    <span>Manage GPS Authorizations</span></Link>
                                            </li>
                                            
                                             <li>     
                                                <Link to="/orderTracking-request">
                                                    <span>Order Tracking Request</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sidebar-submenu">
                                        <ul>

                                        </ul>
                                    </div>
                                </li>
                                </div>):null} */}
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