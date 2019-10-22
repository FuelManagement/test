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

class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.newRFQSubmit=this.submitForm.bind(this);
        this.addLineItem = this.addLineItem.bind(this);
        this.removeLineItem = this.removeLineItem.bind(this);
        this.handleLineItemChange = this.handleLineItemChange.bind(this);
        this.state = {
            formData : props.row && Object.keys(props.row).length ? props.row : { 
                products: [
                    {
                        "productCategory": "",
                        "subCategory": "",
                        "productName": "",
                        "quantity": "",
                        "price": "",
                        "priceAdjustment": "",
                        "quantityUnit": ""
                    }
                ] 
            }
        }
    }
    
    submitForm(){
    }
    handleDateChange(date, key) {
        let formData = { ...this.state.formData };
        formData[key] = date;
        this.setState({formData});
    }
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        let formData = { ...this.state.formData };
        formData[key] = value;
        this.setState({formData});
    }
    handleLineItemChange(product, index){
        let formData = { ...this.state.formData };
        formData.products[index] = product;
        this.setState({formData});
    }
    addLineItem(){
        let formData = this.state.formData;
        formData.products.push({
            "productCategory": "",
            "subCategory": "",
            "productName": "",
            "quantity": "",
            "price": "",
            "priceAdjustment": "",
            "quantityUnit": ""
        })
        this.setState({formData})
    }
    removeLineItem(idx){
        if(!idx) return;
        let formData = this.state.formData;
        if(formData.products[idx]){
            formData.products.splice(idx,1);
        }
        this.setState({formData});

    }
    render() {
        const { row=[], mode="edit" } = this.props;
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

        let lineItems = () => {
            let items = [];
            this.state.formData.products && this.state.formData.products.map((data, idx) => {
                items.push(
                    <LineItem 
                        handleLineItemChange={this.handleLineItemChange} 
                        lineItem={data} 
                        removeLineItem={this.removeLineItem}
                        index={idx} 
                        key={idx}/>)
            })
            return items;
        }

        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3><Link to="/rfq"> <FontAwesomeIcon icon="angle-left"/></Link> &nbsp;&nbsp;&nbsp;Add RFQ</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row">
                                <div className="form-row">
                                    <div className="col-md-3 mb-3 m25">
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
                                    <div className="col-md-3 mb-3 m25">
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
                                    <div className="col-md-3 mb-3 m25">
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
                                    <div className="col-md-3 mb-3 m25">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker style={{ width: '100%' }}
                                                clearable
                                                inputProps={{
                                                    name: 'startTime',
                                                    id: 'startTime',
                                                }}
                                                inputVariant="outlined"
                                                value={this.state.formData.startTime || ""}
                                                onChange={(date) => { this.handleDateChange(date, 'startTime') }}
                                                margin="dense"
                                                label="Start Time"
                                                format="MM/dd/yyyy"
                                                disabled={false}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker style={{ width: '100%' }}
                                                clearable
                                                inputProps={{
                                                    name: 'endTime',
                                                    id: 'endTime',
                                                }}
                                                onChange={(date) => { this.handleDateChange(date, 'endTime') }}
                                                value={this.state.formData.endTime || ""}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="End Time"
                                                format="MM/dd/yyyy"
                                                disabled={false}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
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
                                    <div className="col-md-3 mb-3 m25">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker style={{ width: '100%' }}
                                                clearable
                                                inputProps={{
                                                    name: 'activationTime',
                                                    id: 'activationTime',
                                                }}
                                                value={this.state.formData.activationTime || ""}
                                                onChange={(date) => { this.handleDateChange(date, 'activationTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="Activation Time"
                                                format="MM/dd/yyyy"
                                                disabled={false}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker style={{ width: '100%' }}
                                                clearable
                                                inputProps={{
                                                    name: 'closerTime',
                                                    id: 'closerTime',
                                                }}
                                                value={this.state.formData.closerTime || ""}
                                                onChange={(date) => { this.handleDateChange(date, 'closerTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="Closer Time"
                                                format="MM/dd/yyyy"
                                                disabled={false}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    {lineItems()}
                                    <button className="btn btn-outline" onClick={this.addLineItem}>
                                        <FontAwesomeIcon icon="plus"/>
                                    </button>
                                </div>
                                <div className="col-md-12 mb-3 mb25">
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

export {AddRFQ};