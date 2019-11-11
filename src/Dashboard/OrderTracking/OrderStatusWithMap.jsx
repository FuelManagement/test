import React from 'react';
import { connect } from 'react-redux';
import { Locations } from '../../_components/Location/Location';
import { OrderProgressBar } from './ProgressBar';
import { orderTrackingActions } from '../../_actions';
import { formatutility } from '../../_helpers';

class OrderStatusWithMap extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orders:{
                gps: formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.gps_details,
                po_details: formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.po_details,
                requestId:formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.requestId
            }
        }
    }
    componentDidMount(){
       
       this.props.dispatch(orderTrackingActions.getOrderTrackingProgress());
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
       if(!formatutility.isEmpty(prevProps.orderTracking.orders) && JSON.stringify(prevProps.orderTracking.orders)!==JSON.stringify(this.props.orderTracking.orders))
    {
        this.setState({orders:{
            gps: prevProps.orderTracking.orders.gps_details,
            po_details: prevProps.orderTracking.orders.po_details,
            requestId:prevProps.orderTracking.orders.requestId
        
        }})
    }
    }
    

    render() {
        
        return <div>
            <div className='col-lg-9 add-rfq-main progress-main'>
                <div className="row order-track-status-map">
                    <div className="col-md-4">
                        <p className="progress-headText">Customer: {this.state.orders['po_details'].supplierName!==undefined?this.state.orders['po_details'].supplierName:''} </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <p className="progress-headText ">Order #: {this.state.orders['po_details'].poID!==undefined?this.state.orders['po_details'].poID:''}</p>
                    </div>
                </div>
                <div className='gps-google-map'>
                   <Locations location={this.state.orders['gps_details']} orderID={this.state.orders['po_details'].poID!==undefined?this.state.orders['po_details'].poID:''}/> 
                </div>

            </div>
            
          
                <React.Fragment>
                    <br />
                    <OrderProgressBar order={this.state.orders['po_details']} /> 
                </React.Fragment>
            
        </div>
    }
}

function mapStateToProps(state) {
    console.log(state.orderTracking);
    return { orderTracking:state.orderTracking };
}

const connectedHomePage = connect(mapStateToProps)(OrderStatusWithMap);
export { connectedHomePage as OrderStatusWithMap };