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
class AddRFQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                rfqStartTime: {
                    value: props !== undefined && props.rfqStartTime !== undefined ? props.rfqStartTime : new Date(),
                    value: new Date(),
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
                rfqEndTime: {
                    value: props !== undefined && props.rfqEndTime !== undefined ? props.rfqEndTime : new Date(),
                    value: new Date(),
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
                rfqActivationTime: {
                    value: props !== undefined && props.rfqActivationTime !== undefined ? props.rfqActivationTime : new Date(),
                    value: new Date(),
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
                rfqCloserTime: {
                    value: props !== undefined && props.rfqCloserTime !== undefined ? props.rfqCloserTime : new Date(),
                    value: new Date(),
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


                rfqProjectId: {
                    value: props !== undefined && props.rfqProjectId !== undefined ? props.rfqProjectId : '',

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
                rfqEntityType: {
                    value: props !== undefined && props.rfqEntityType !== undefined ? props.rfqEntityType : '',

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
                rfqProductDetails: {
                    value: props !== undefined && props.rfqProductDetails !== undefined ? props.rfqProductDetails : '',

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
                rfqStatus: {
                    value: props !== undefined && props.rfqStatus !== undefined ? props.rfqStatus : '',

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
                rfqCategory: {
                    value: props !== undefined && props.rfqCategory !== undefined ? props.rfqCategory : '',

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
                rfqSubCategory: {
                    value: props !== undefined && props.rfqSubCategory !== undefined ? props.rfqSubCategory : '',

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
                rfqProduct: {
                    value: props !== undefined && props.rfqProduct !== undefined ? props.rfqProduct : '',

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
                rfqQuantity: {
                    value: props !== undefined && props.rfqQuantity !== undefined ? props.rfqQuantity : '',

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
                rfqPrice: {
                    value: props !== undefined && props.rfqPrice !== undefined ? props.rfqPrice : '',

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
                rfqPriceAdjustment: {
                    value: props !== undefined && props.rfqPriceAdjustment !== undefined ? props.rfqPriceAdjustment : '',

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
                rfqCurrency: {
                    value: props !== undefined && props.rfqCurrency !== undefined ? props.rfqCurrency : '',

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
                rfqQuantityUnit: {
                    value: props !== undefined && props.rfqQuantityUnit !== undefined ? props.rfqQuantityUnit : '',

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
        console.log(event.target);
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
                        <h3>RFQ</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row">
                                <div className="form-row">
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="rfqProjectId"
                                            label="Projet ID"
                                            value={this.state.controls.rfqProjectId.value}
                                            onChange={this.handleChange}
                                            name="rfqProjectId"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="rfqEntityType"
                                            label="Entity Type"
                                            value={this.state.controls.rfqEntityType.value}
                                            onChange={this.handleChange}
                                            name="rfqEntityType"
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
                                            id="rfqProductDetails"
                                            label="Project Details"
                                            value={this.state.controls.rfqProductDetails.value}
                                            onChange={this.handleChange}
                                            name="rfqProductDetails"
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
                                                    name: 'rfqStartTime',
                                                    id: 'rfqStartTime',
                                                }}
                                                inputVariant="outlined"
                                                value={this.state.controls.rfqStartTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'rfqStartTime') }}
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
                                                    name: 'rfqEndTime',
                                                    id: 'rfqEndTime',
                                                }}
                                                value={this.state.controls.rfqEndTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'rfqEndTime') }}
                                                inputVariant="outlined"
                                                margin="dense"
                                                label="End Time"
                                                format="MM/dd/yyyy"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="rfqStatus"
                                            label="Status"
                                            value={this.state.controls.rfqStatus.value}
                                            onChange={this.handleChange}
                                            name="rfqStatus"
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
                                                    name: 'rfqActivationTime',
                                                    id: 'rfqActivationTime',
                                                }}
                                                value={this.state.controls.rfqActivationTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'rfqActivationTime') }}
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
                                                    name: 'rfqCloserTime',
                                                    id: 'rfqCloserTime',
                                                }}
                                                value={this.state.controls.rfqCloserTime.value}
                                                onChange={(date) => { this.handleDateChange(date, 'rfqCloserTime') }}
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
                                            id="rfqCategory"
                                            label="Category"
                                            value={this.state.controls.rfqCategory.value}
                                            onChange={this.handleChange}
                                            name="rfqCategory"
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
                                            id="rfqSubCategory"
                                            label="Sub Category"
                                            value={this.state.controls.rfqSubCategory.value}
                                            onChange={this.handleChange}
                                            name="rfqSubCategory"
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
                                            id="rfqProduct"
                                            label="Product"
                                            value={this.state.controls.rfqProduct.value}
                                            onChange={this.handleChange}
                                            name="rfqProduct"
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
                                            id="rfqQuantity"
                                            label="Quantity"
                                            value={this.state.controls.rfqQuantity.value}
                                            onChange={this.handleChange}
                                            name="rfqQuantity"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="rfqPrice"
                                            label="Price"
                                            value={this.state.controls.rfqPrice.value}
                                            onChange={this.handleChange}
                                            name="rfqPrice"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            id="rfqPriceAdjustment"
                                            label="Price Adjustment"
                                            value={this.state.controls.rfqPriceAdjustment.value}
                                            onChange={this.handleChange}
                                            name="rfqPriceAdjustment"
                                            variant="outlined"
                                            className="form-control"
                                            autoComplete="off"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3 m25">
                                        <TextField
                                            select
                                            id="rfqCurrency"
                                            label="Currency"
                                            value={this.state.controls.rfqCurrency.value}
                                            onChange={this.handleChange}
                                            name="rfqCurrency"
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
                                            id="rfqQuantityUnit"
                                            label="Quantity Unit"
                                            value={this.state.controls.rfqQuantityUnit.value}
                                            onChange={this.handleChange}
                                            name="rfqQuantityUnit"
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
                                    <button className="btn btn-success rfq-submit-btn float-right">Submit</button>
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