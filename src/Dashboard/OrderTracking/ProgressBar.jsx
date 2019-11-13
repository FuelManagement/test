import React, { Fragment } from 'react';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { connect } from 'react-redux';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ConfirmDialog } from '../../_components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class OrderProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: [
                {
                    Device:"",
                    TxnCode:"AA01",
                    TxnId:"0x10df4ae376424b6",
                    TxnHash:"0x10df4ae376424b6",
                    ChannelId:"com-buy-01",
                    Block:858780,
                    CreateTime:"08/26/2019 12:25 PM",
                    Age:"30 secs ago",
                    From:"Energroup",
                    To:"CFenergia"
                },
                {
                    Device:"",
                    TxnCode:"BB23",
                    TxnId:"0x10df4ae376424b6",
                    TxnHash:"0x10df4ae376424b6",
                    ChannelId:"imp-com-01",
                    Block:858780,
                    CreateTime:"08/26/2019 12:25 PM",
                    Age:"8 hours ago",
                    From:"Certum",
                    To:"Energroup"
                }
            ],
        }
        this.openModal = this.openModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openModal(){
        this.setState({modal:true});
    }

    handleClose(){
        this.setState({modal:false});
    }

    render() {
        console.log("progress bar",this.props);
        const { txno } = { ...this.props.order };
        let progressPercent = this.props.order.status === "Dispatched" ? 34
                                : this.props.order.status === "In transit" ? 66.5
                                : this.props.order.status === "In Transit" ? 66.5
                                : this.props.order.status === "Delivered" ? 100
                                : 0;
        return (
            <div className="mx-auto">
                <div className="">
                    <div className='col-lg-9 add-rfq-main progress-main'>
                       <div className="progress-expand-pannel">
                            <ExpansionPanel defaultExpanded={true}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-label="Expand"
                                    aria-controls="additional-actions1-content"
                                    id="additional-actions1-header"
                                >
                                    <div className="col-md-4">Order #: {this.props.order.poID} </div>
                                    <div className="col-md-4" >Tx No #:
                                        <span className="tax-no">{txno}</span></div>
                                    <div className="col-md-4">ETA :{ dateutility.datefunction(this.props.order.reqDelivaryDate,formatutility.MMDDYYYYHHMMSS)}</div>


                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {/* <Typography color="textSecondary"> */}
                                    <div className="row progress-bar">
                                        <div className="col-md-12">
                                            <ProgressBar
                                                filledBackground="linear-gradient(to right, green, green)"
                                                percent={progressPercent}
                                            >
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                        >
                                                            <p className="acomplished-text text1">Under Fulfillment</p>
                                                        </div>
                                                    )}
                                                </Step>
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                        >
                                                            <p className="acomplished-text text2">Dispatched</p>
                                                        </div>
                                                    )}
                                                </Step>
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                        >
                                                            <p className="acomplished-text text3">In-Transit</p>
                                                        </div>
                                                    )}
                                                </Step>
                                                <Step transition="scale">
                                                    {({ accomplished, index }) => (
                                                        <div
                                                            className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                        >

                                                            <p className="acomplished-text text4">Delivered</p>
                                                        </div>
                                                    )}
                                                </Step>
                                            </ProgressBar>
                                        </div>
                                    </div>
                                    {/* </Typography> */}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </div>
                <ConfirmDialog
                    open={this.state.modal}
                    confirmAction={this.handleClose}
                    handleClose={this.handleClose}
                    accept="Ok"
                    decline="" 
                    message={Table({data: this.state.data})}
                    header="Details"
                    fullWidth={true}
                    maxWidth="lg"/>
            </div>
        )
    }
}

export { OrderProgressBar };


import { Table_Config, dateutility, formatutility } from '../../_helpers';
let Table = (props) => (
    <ReactTable
        data={props.data || []}
        columns={Table_Config.ProgressBar.ProgressBarRecords.columns()}
        {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
    />

    
)
