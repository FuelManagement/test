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


class OrderProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const{orderno,txno,eta,orderPercentage}={...this.props.order};

        return (
            <div className="mx-auto">
                <div className="">
                    <div className='col-lg-9 add-rfq-main progress-main'>
                       <div className="progress-expand-pannel">
                            <ExpansionPanel  >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-label="Expand"
                                    aria-controls="additional-actions1-content"
                                    id="additional-actions1-header"
                                >
                                    <div className="col-md-4">Order No: {orderno} </div>
                                    <div className="col-md-4">Tx No #:
                                        <span className="tax-no">{txno}</span></div>
                                    <div className="col-md-4">ETA:{eta}</div>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {/* <Typography color="textSecondary"> */}
                                    <div className="row progress-bar">
                                        <div className="col-md-12">


                                            <ProgressBar
                                                filledBackground="linear-gradient(to right, green, green)"
                                                percent={orderPercentage}
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
            </div>
        )
    }
}
export { OrderProgressBar };  