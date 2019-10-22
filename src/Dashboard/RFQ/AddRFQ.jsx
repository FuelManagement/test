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
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { rfqActions } from '../../_actions';

library.add(faAngleLeft);

class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.newRFQSubmit=this.newRFQSubmit.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                startTime: {
                    value: props !== undefined && props.startTime !== undefined ? props.startTime : new Date().toLocaleDateString(),
                    value: new Date().toLocaleDateString(),
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Start Time",
                    placeholder: "Date Of Start Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                endTime: {
                    value: props !== undefined && props.endTime !== undefined ? props.endTime : new Date().toLocaleDateString(),
                    value: new Date().toLocaleDateString(),
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of End Time",
                    placeholder: "Date Of End Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                activationTime: {
                    value: props !== undefined && props.activationTime !== undefined ? props.activationTime : new Date().toLocaleDateString(),
                    value: new Date().toLocaleDateString(),
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Activation Time",
                    placeholder: "Date Of Activation Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                closerTime: {
                    value: props !== undefined && props.closerTime !== undefined ? props.closerTime : new Date().toLocaleDateString(),
                    value: new Date().toLocaleDateString(),
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },


                projectid: {
                    value: props !== undefined && props.projectid !== undefined ? props.projectid : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Project ID",
                    placeholder: "Project ID",
                    touched: false,
                    visible: true,
                    disable: false
                },
                entityType: {
                    value: props !== undefined && props.entityType !== undefined ? props.entityType : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please select entity type",
                    placeholder: "Select Entity",
                    touched: false,
                    visible: true,
                    disable: false
                },
                projectDetails: {
                    value: props !== undefined && props.projectDetails !== undefined ? props.projectDetails : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                status: {
                    value: props !== undefined && props.status !== undefined ? props.status : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                category: {
                    value: props !== undefined && props.category !== undefined ? props.category : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                subCategory: {
                    value: props !== undefined && props.subCategory !== undefined ? props.subCategory : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                product: {
                    value: props !== undefined && props.product !== undefined ? props.product : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                quantity: {
                    value: props !== undefined && props.quantity !== undefined ? props.quantity : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                price: {
                    value: props !== undefined && props.price !== undefined ? props.price : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                priceAdjustment: {
                    value: props !== undefined && props.priceAdjustment !== undefined ? props.priceAdjustment : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                currency: {
                    value: props !== undefined && props.currency !== undefined ? props.currency : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                },
                quantityUnit: {
                    value: props !== undefined && props.quantityUnit !== undefined ? props.quantityUnit : '',

                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of Closer Time",
                    placeholder: "Date Of Closer Time",
                    touched: false,
                    visible: true,
                    disable: false
                }

            }
        }
        return state;
    }
    newRFQSubmit(){
        let reqData={};
        Object.keys(this.state.controls).map(contr=>{
            reqData[contr]=this.state.controls[contr].value;
        });
      this.props.history.push('/rfq');
        
    }
    handleDateChange(date, key) {
        let connectedValue = {};
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: date,
                        touched: true
                    }
                }
            };
        });
    }
    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        let connectedValue = {};
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true
                    }
                }
            };
        });
    }
    render() {
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
        const currencytype = [
            {
                value: "",
                label: "None"
            },
            {
                value: "USD $",
                label: "USD $"
            },
            {
                value: "MEX $",
                label: "MEX $"
            }];
        const quantityunit = [
            {
                value: "",
                label: "None"
            },
            {
                value: "Barrel",
                label: "Barrel"
            },
            {
                value: "Gallon",
                label: "Gallon"
            },
            {
                value: "Litre",
                label: "Litre"
            }];
        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 login-section add-rfq-main'>
                        <h3><Link to="/rfq"> <FontAwesomeIcon icon="angle-left"/></Link> &nbsp;&nbsp;&nbsp;Add RFQ</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row">
                                <div className="form-row">
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="projectid"
                                            label="Projet ID"
                                            value={this.state.controls.projectid.value}
                                            onChange={this.handleChange}
                                            name="projectid"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="entityType"
                                            label="Entity Type"
                                            value={this.state.controls.entityType.value}
                                            onChange={this.handleChange}
                                            name="entityType"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                            value={this.state.controls.projectDetails.value}
                                            onChange={this.handleChange}
                                            name="projectDetails"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                                value={this.state.controls.startTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'startTime') }}
                                                margin="dense"
                                                label="Start Time"
                                                format="MM/dd/yyyy"
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
                                                value={this.state.controls.endTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'endTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="End Time"
                                                format="MM/dd/yyyy"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="status"
                                            label="Status"
                                            value={this.state.controls.status.value}
                                            onChange={this.handleChange}
                                            name="status"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                                value={this.state.controls.activationTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'activationTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="Activation Time"
                                                format="MM/dd/yyyy"
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
                                                value={this.state.controls.closerTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'closerTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="Closer Time"
                                                format="MM/dd/yyyy"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="category"
                                            label="Category"
                                            value={this.state.controls.category.value}
                                            onChange={this.handleChange}
                                            name="category"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                            select
                                            id="subCategory"
                                            label="Sub Category"
                                            value={this.state.controls.subCategory.value}
                                            onChange={this.handleChange}
                                            name="subCategory"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                            select
                                            id="product"
                                            label="Product"
                                            value={this.state.controls.product.value}
                                            onChange={this.handleChange}
                                            name="product"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
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
                                            id="quantity"
                                            label="Quantity"
                                            value={this.state.controls.quantity.value}
                                            onChange={this.handleChange}
                                            name="quantity"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="price"
                                            label="Price"
                                            value={this.state.controls.price.value}
                                            onChange={this.handleChange}
                                            name="price"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="priceAdjustment"
                                            label="Price Adjustment"
                                            value={this.state.controls.priceAdjustment.value}
                                            onChange={this.handleChange}
                                            name="priceAdjustment"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="currency"
                                            label="Currency"
                                            value={this.state.controls.currency.value}
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
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="quantityUnit"
                                            label="Quantity Unit"
                                            value={this.state.controls.quantityUnit.value}
                                            onChange={this.handleChange}
                                            name="quantityUnit"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        >
                                            {quantityunit.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
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