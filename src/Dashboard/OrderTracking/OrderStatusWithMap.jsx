import React from 'react';
import { connect } from 'react-redux';
import { Locations } from '../../_components/Location/Location';
import { OrderProgressBar } from './ProgressBar';
import { orderTrackingReqActions } from '../../_actions';

class OrderStatusWithMap extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(orderTrackingReqActions.getOrderTrackingProgress());
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.props.orderTrackingReqDetails.orders && this.props.orderTrackingReqDetails.orders.length) {
            this.setState({orders});
        }
    }

    render() {
        const orders = [
            {
                "orderno": 201333,
                "txno": "1756422245648721",
                "eta": "08/20/219 04:00 PM",
                "orderPercentage":45
            },
            {
                "orderno": 201334,
                "txno": "1756422245648722",
                "eta": "12/20/219 09:00 AM",
                "orderPercentage":78
            },
            {
                "orderno": 201335,
                "txno": "1756422245648723",
                "eta": "09/20/219 11:00 AM",
                "orderPercentage":65

            }]
        return <div>
            <div className='col-lg-9 add-rfq-main progress-main'>
                <div className="row order-track-status-map">
                    <div className="col-md-4">
                        <p className="progress-headText">Customer: </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <p className="progress-headText ">Order #: </p>
                    </div>
                </div>
                <div className='gps-google-map'>
                    <Locations />
                </div>

            </div>
            {orders.map((order, idx) => (
                <React.Fragment key={idx}>
                    <br />
                    <OrderProgressBar order={order} />
                </React.Fragment>
            ))}
        </div>
    }
}

function mapStateToProps(state) {
    const { orderTrackingReqDetails={} } = state;
    return { orderTrackingReqDetails };
}

const connectedHomePage = connect(mapStateToProps)(OrderStatusWithMap);
export { connectedHomePage as OrderStatusWithMap };