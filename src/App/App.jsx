import React from 'react';
import { Router, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import * as Components from '../_components';
import * as Dashboard from '../Dashboard';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';  
import OrderTracking from '../_components/OrderTracking/OrderTracking';

import { LandingPage } from '../LandingPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/style.css';   
import { config } from '@fortawesome/fontawesome-svg-core';

// Make sure this is before any other `fontawesome` API calls
config.autoAddCss = false

toast.configure({
    autoClose: 1000,
    draggable: false,
})

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    notify(type, msg) {
        switch(type){
            case 'alert-success':
                msg = msg || 'Sucess !'
                toast.success(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'alert-warning':
                msg = msg || 'Warning !'
                toast.warn(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            case 'alert-danger':
                msg = msg || 'Error !!'
                toast.error(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                break;
            default:
                msg = msg || 'Alert !'
                toast(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
        }
    }

    render() {
        const { alert, authentication } = this.props;
        if(Object.keys(alert).length){
            if(alert.type) this.notify(alert.type, alert.message);
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="w-100">
                        <Router history={history}>
                            <React.Fragment>
                                <Components.Overlay loading={alert.loading}/>
                                <ToastContainer />
                                { authentication.loggedIn ? <Components.Header user={authentication.user}/> : "" }
                                { authentication.loggedIn ? <Components.Sidebar user={authentication.user}/>: "" }
                                <Components.Route_Dashboard exact path="/" 
                                        component_imp={Dashboard.Dashboard_Importer} 
                                        component_exp={Dashboard.Dashboard_Exporter}
                                        component_ref={Dashboard.Dashboard_Refinery}
                                        component_adm={Dashboard.Dashboard_Importer}  />
                                
                                <Components.Route_Orders exact path="/orders" 
                                        component_imp={Dashboard.HomePage_Importer} 
                                        component_exp={Dashboard.HomePage_Exporter}
                                        component_ref={Dashboard.HomePage_Refinery} 
                                        />
                                <Route path="/onboard" exact component={Dashboard.OnBoard_Admin} />
                                <Route path="/profile" exact component={Dashboard.OnBoardProfile} />      
                                <Route path="/onboard/add" exact component={Dashboard.AddOnBoardProfile} />
                                <Route path="/onboard/edit" exact component={Dashboard.AddOnBoardProfile} />
                                <Route path="/product" component={Dashboard.Product} />  
                                <Route path="/login" render={(props) => <LoginPage {...props} role = {"importer"}/>} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/home" component={LandingPage} />
                               
                                <Route path="/userProfile" exact component={Dashboard.UserProfile} />
                                <Route path="/rfq" exact component={Dashboard.RFQ} />
							    <Route path="/userProfile/add" exact component={Dashboard.AddUserProfile} /> 
							    <Route path="/rfq/add" exact component={Dashboard.AddRFQ} />
                                <Route path="/rfq/edit" exact component={Dashboard.AddRFQ} />
                                <Route path="/rfq/view" exact component={Dashboard.AddRFQ} />
                                <Route path="/indicative-offer" exact component={Dashboard.IndicativeOffer} />
                                <Route path="/indicative-offer/edit" exact component={Dashboard.IndicativeOfferEdit} />
                                <Route path="/indicative-offer/view" exact component={Dashboard.IndicativeOfferEdit} />
                                <Route path="/order-tracking" exact component={Dashboard.OrderTracking} />
                                <Route path="/order-progress" exact component={Dashboard.OrderStatusWithMap} />
                                <Route path="/orderTracking-request" exact component={Dashboard.OrderTrackingRequest} />
                            </React.Fragment>
                        </ Router>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
