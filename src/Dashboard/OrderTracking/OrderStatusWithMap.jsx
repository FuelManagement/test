import React from 'react';
import { connect } from 'react-redux';
import { Locations } from '../../_components/Location/Location';
import { OrderProgressBar } from './ProgressBar';
import { orderTrackingActions } from '../../_actions';
import { formatutility } from '../../_helpers';
import { OrderStatusDoc } from './OrderStatusDoc';

class OrderStatusWithMap extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orders:{
                gps: formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.gps_details,
                po_details: formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.po_details,
                requestId:formatutility.isEmpty(this.props.orderTracking.orders)?{}:this.props.orderTracking.orders.requestId,
                documents:formatutility.isEmpty(this.props.orderTracking.orders)?[]:this.props.orderTracking.orders.documents
            }
        }
    }
    componentDidMount(){
       
       //this.props.dispatch(orderTrackingActions.getOrderTrackingProgress());
    }
    UNSAFE_componentWillReceiveProps(prevProps) {
       if(!formatutility.isEmpty(prevProps.orderTracking.orders) && JSON.stringify(prevProps.orderTracking.orders)!==JSON.stringify(this.props.orderTracking.orders))
    {
        this.setState({orders:{
            gps: prevProps.orderTracking.orders.gps_details,
            po_details: prevProps.orderTracking.orders.po_details,
            requestId:prevProps.orderTracking.orders.requestId,
            documents:prevProps.orderTracking.orders.documents
        
        }})
    }
    }
    

    render() {
        console.log("location gps details");
        console.log(this.state);
        return <div>
                 
            <div className='col-lg-9 add-rfq-main progress-main'>
                <div className="row order-track-status-map">
                    <div className="col-md-4">
                        <p className="progress-headText">Supplier: {this.state.orders['po_details'].supplierName!==undefined?this.state.orders['po_details'].supplierName:''} </p>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3" >
                        <p className="progress-headText" style={{float:"right"}}>Order #: {this.state.orders['po_details'].poID!==undefined?this.state.orders['po_details'].poID:''}</p>
                    </div>
                </div>
                <div className='gps-google-map'>
                  {!formatutility.isEmpty(this.state.orders['gps'])? <Locations location={this.state.orders['gps']} /> :null}
                  {/* <div>
                  <OrderStatusDoc document={JSON.parse("[{\"fieldname\":\"file\",\"originalname\":\"endbuyer.PNG\",\"encoding\":\"7bit\",\"mimetype\":\"image/png\",\"destination\":\"uploads/file/endbuyer/\",\"filename\":\"1573715130240.PNG\",\"path\":\"uploads\\\\file\\\\endbuyer\\\\1573715130240.PNG\",\"size\":931,\"hash\":\"2ed6fa6d34910f1475ad6f83303397d0e798585e56ebe84fd066d807a7489d1c\"}]")} />
                </div> */}
                </div>
            </div>
            <React.Fragment>
                <br />
                <OrderProgressBar order={this.state.orders['po_details']} gps={this.state.orders['gps']} documents = {this.state.orders['documents']}
                />
                  <br />
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