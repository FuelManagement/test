import React from 'react';
import { Table_Config } from '../../_helpers';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';

import {SendAuthentication} from './SendAuthentication';
 
class OrderTrackingRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    orderName: "CFEnergia power",
                    RequestedBy: "James Robert",
                    Owner: "yes",
                    Status: "AutoApproved",
                    RequestTimings: "08/20/2019 10:00 AM",
                    Approvereject: "Approve"
                },
                {
                    orderName: "BP Gas station",
                    RequestedBy: "JackJacob",
                    Owner: "No",
                    Status: "Rejected",
                    RequestTimings: "08/20/2019 10:10AM",
                    Approvereject: ""
                },
                {
                    orderName: "Pemex Gas station",
                    RequestedBy: "Thomas Noah",
                    Owner: "No",
                    Status: "Approved",
                    RequestTimings: "08/20/2019 11:00AM",
                    Approvereject: "Approve"
                },
                {
                    orderName: "CFEnergia power",
                    RequestedBy: "Michael William",
                    Owner: "No",
                    Status: "NewRequest",
                    RequestTimings: "08/20/2019 12:00 PM",
                    Approvereject: "Reject"
                }
            ],
            isApprove:false
        }
        this.approveSubmit = this.approveSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    approveSubmit(event) {
        this.setState({isApprove:true});
    }
    handleClose(){
        this.setState({isApprove:false});
    }
    render() {
        return (
            <div>
                <div className="mx-auto">
                    <div className="row mrg-tp40px">
                        <div className='col-lg-9 add-rfq-main'>
                            <h2 style={{ display: "inline-block" }} className="table-heading">Order Tracking Request</h2>
                            <div className="table-data">
                                <div className="clearDiv"></div>
                                <ReactTable
                                    data={this.state.data || []}
                                    columns={Table_Config.OrderTrackingRequestRecords.OrderTrackingRequestRecord.columns({ approveSubmit: this.approveSubmit.bind(this) })}
                                    {...Table_Config.OrderTrackingRequestRecords.OrderTrackingRequestRecord.options}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <SendAuthentication isApprove={this.state.isApprove} handleClose={this.handleClose} />
            </div>
        )
    }
}
export { OrderTrackingRequest };