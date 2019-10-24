import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { LineItem } from '../../_components/LineItem';
library.add(faAngleLeft, faPlus);
const currencytype = [
    {
        value: "",
        label: "None"
    },
    {
        value: "LLC",
        label: "LLC"
    },
    {
        value: "LLP",
        label: "LLP"
    },
    {
        value: "30",
        label: "Thirty"
    }
];
class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.newRFQSubmit = this.submitForm.bind(this);
        // this.addLineItem = this.addLineItem.bind(this);
        // this.removeLineItem = this.removeLineItem.bind(this);
        this.handleLineItemChange = this.handleLineItemChange.bind(this);
        this.state = {
            formData: props.row && Object.keys(props.row).length ? props.row : {
                // products: [
                //     {
                //         "productCategory": "",
                //         "subCategory": "",
                //         "productName": "",
                //         "quantity": "",
                //         "price": "",
                //         "priceAdjustment": "",
                //         "quantityUnit": ""
                //     }
                // ]
            }
        }
    }

    submitForm() {
    }
    handleDateChange(date, key) {
        let formData = { ...this.state.formData };
        formData[key] = date;
        this.setState({ formData });
    }
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        let formData = { ...this.state.formData };
        formData[key] = value;
        this.setState({ formData });
    }
    handleLineItemChange(product, index) {
        let formData = { ...this.state.formData };
        // formData.products[index] = product;
        this.setState({ formData });
    }
    // addLineItem() {
    //     let formData = this.state.formData;
    //     formData.products.push({
    //         "productCategory": "",
    //         "subCategory": "",
    //         "productName": "",
    //         "quantity": "",
    //         "price": "",
    //         "priceAdjustment": "",
    //         "quantityUnit": ""
    //     })
    //     this.setState({ formData })
    // }
    // removeLineItem(idx) {
    //     if (!idx) return;
    //     let formData = this.state.formData;
    //     if (formData.products[idx]) {
    //         formData.products.splice(idx, 1);
    //     }
    //     this.setState({ formData });

    // }
    render() {
        const { row = [], mode = "edit" } = this.props;
        const entitryType = [{
            value: "",
            label: "None"
        }, {
            value: "Exporter",
            label: "Exporter"
        },
        {
            value: "Importer",
            label: "Importer"
        },
        {
            value: "Refinery",
            label: "Refinery"
        }];
        const participantId=[
            {
                value: "",
                label: "None"
            }, {
                value: "1",
                label: "1"
            },
            {
                value: "2",
                label: "2"
            },
            {
                value: "3",
                label: "3"
            }
        ] 

        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3><Link to="/rfq"> <FontAwesomeIcon icon="angle-left" /></Link> &nbsp;&nbsp;&nbsp;Add RFQ</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-row">
                                {/* <div className="form-row"> */}
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="projectId"
                                        label="Projet ID"
                                        value={this.state.formData.projectId || ""}
                                        onChange={this.handleChange}
                                        name="projectId"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id="entityType"
                                        label="Entity Type"
                                        value={this.state.formData.entityType || ""}
                                        onChange={this.handleChange}
                                        name="entityType"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    >
                                        {entitryType.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id="participantId"
                                        label="participant Id"
                                        value={this.state.formData.participantId || ""}
                                        onChange={this.handleChange}
                                        name="participantId"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    >
                                        {participantId.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                
                            </div>
                            <div className="row fom-row">
                            <div className="col-md-12 mb-3  ">
                                    <TextField
                                        id="projectDetails"
                                        label="Project Details"
                                        value={this.state.formData.projectDetails || ""}
                                        onChange={this.handleChange}
                                        name="projectDetails"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="startTime"
                                        name="startTime"
                                        label="Start Time"
                                        type="datetime-local"
                                        defaultValue={this.state.formData.startTime || ""}
                                        onChange={(date) => { this.handleDateChange(date, 'startTime') }}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="endTime"
                                        name="endTime"
                                        label="End Time"
                                        type="datetime-local"
                                        defaultValue={this.state.formData.endTime || ""}
                                        onChange={(date) => { this.handleDateChange(date, 'endTime') }}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="status"
                                        label="Status"
                                        value={this.state.formData.status || ""}
                                        onChange={this.handleChange}
                                        name="status"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        disabled={false}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="activationTime"
                                        name="activationTime"
                                        label="Activation Time"
                                        type="datetime-local"
                                        defaultValue={this.state.formData.startTime || ""} 
                                        onChange={(date) => { this.handleDateChange(date, 'activationTime') }}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 addrfq-dateTime ">
                                    <TextField
                                        id="closerTime"
                                        name="closerTime"
                                        label="Closer Time"
                                        type="datetime-local"
                                        defaultValue={this.state.formData.closerTime || ""}
                                        onChange={(date) => { this.handleDateChange(date, 'closerTime') }}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        select
                                        id="currency"
                                        label="Currency"
                                        value={this.state.formData.currency || ""}

                                        // value={this.state.controls.currency.value}
                                        onChange={this.handleChange}
                                        name="currency"
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    >
                                        {currencytype.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                {/* {lineItems()} */}
                                {/* <button className="btn btn-outline" onClick={this.addLineItem}>
                                    <FontAwesomeIcon icon="plus" />
                                </button> */}

                            </div>
                            <div className="row form-row mb-3">
                                <div className="col-md-12">
                                    <LineItem />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-7"></div>
                                <div className="col-md-4 mb-3 ">
                                    <button className="btn btn-success rfq-submit-btn float-right" onClick={this.newRFQSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { AddRFQ };