import React from 'react';
import {connect} from 'react-redux';
import { Table_Config } from '../../_helpers';
import { ConfirmDialog } from '../../_components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { orderTrackingRequestActions } from '../../_actions';

import {SendAuthentication} from './SendAuthentication';
 
class OrderTrackingRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isApprove: false,
            confirmDialog: false,
            selectedRow: {},
            data:[
                // {CustomerName:'BP Gas Station',RequestedBy:'Dan Nelson',Owner:'Yes',Status:'New Request',RequestTimings:"10/08/2019 10:15AM"}
            ]
        }
        this.approveSubmit = this.approveSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.confirmReject = this.confirmReject.bind(this);
    }
    approveSubmit(event, rowData) {
        
        if(event.target.value === "Approve"){
            this.setState({isApprove:true, confirmDialog:false, selectedRow:rowData}); 
            let collection={};
        collection.customerParticipantID=rowData.customerParticipantID;
        collection.customerID=rowData.customerID;
        collection.status="Approve";
        collection.CreatedOn=new Date();
        this.props.dispatch(orderTrackingRequestActions.postOTRAuthDetailsForCustomer(collection));          
        }
        else if(event.target.value === "Reject"){
            this.setState({isApprove:false, confirmDialog:true, selectedRow:rowData});
        }
        }
    handleClose(){
        this.setState({isApprove:false, confirmDialog:false, selectedRow:{}});
    }
    confirmReject(){
        let collection={};
        collection.customerParticipantID=this.selectedRow.customerParticipantID;
        collection.customerID=this.selectedRow.customerID;
        collection.status="Reject";
        collection.CreatedOn=new Date();
        this.props.dispatch(orderTrackingRequestActions.postOTRAuthDetailsForCustomer(collection));
   
        console.log("todo reject selected row: ", this.state.selectedRow);
        this.setState({isApprove:false, confirmDialog:false, selectedRow:{}});
    }
    componentDidMount() {
        this.props.dispatch(orderTrackingRequestActions.getOTRDetailsBysupplier());
       
    }
   render() {
       let orderTrackingReqDetails = this.props.orderTrackingRequest.orderTrackingReqDetails;
       //let orderTrackingReqDetails = [];
       return (
            <div>
                <div className="mx-auto">
                    <div className="row mrg-tp40px">
                        <div className='col-lg-9 add-rfq-main'>
                            <h2 style={{ display: "inline-block" }} className="table-heading">Order Tracking Request</h2>
                            <div className="table-data order-request-table">
                                <div className="clearDiv"></div>
                                <ReactTable
                                    data={orderTrackingReqDetails || []}
                                    columns={Table_Config.OrderTrackingRequestRecords.OrderTrackingRequestRecord.columns({ approveSubmit: this.approveSubmit.bind(this) })}
                                    {...Table_Config.OrderTrackingRequestRecords.OrderTrackingRequestRecord.options}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <SendAuthentication isApprove={this.state.isApprove} handleClose={this.handleClose} />
                <ConfirmDialog
                    open={this.state.confirmDialog}
                    confirmAction={this.confirmReject}
                    handleClose={this.handleClose} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { orderTrackingRequest } = state;
    console.log("orderTrackingRequest",orderTrackingRequest);
    return { orderTrackingRequest };
}
const connectedOrderTrackingRequest = connect(mapStateToProps)(OrderTrackingRequest);
export { connectedOrderTrackingRequest as OrderTrackingRequest };