import React from 'react';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { ManageGPSTable } from './ManageGPSTable';

class ManageGPSAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        console.log("states",this.state);
    }
    onSubmit() {
        this.setState({ showTable: true });
        let randomVal = Math.random();
        console.log(randomVal);
        this.setState({ randomId: randomVal });
    }
    handleChange(event) {
        console.log(event.target.value, event.target.name);
        let key = event.target.name,
            value = event.target.value;
        this.setState(prevState => {
            console.log(prevState.formData);
            return {
                formData: {
                    ...prevState.formData,
                    [key]: {
                        ...prevState.formData[key],
                        value: value,
                        touched: true
                    }
                }
            };
        });
        this.setState
     console.log("state",this.state)   
    }
    initialState(mode, props) {
        let state = {};
        state = {
            showTable: false,
            randomId:null,
            formData: {
                customername: {
                    value: props !== undefined && props.customerName !== undefined ? props.customerName : '',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please select customer name",
                    placeholder: "Customer Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                orderid: {
                    value: props !== undefined && props.orderid !== undefined ? props.orderid : '',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please select orderid",
                    placeholder: "Order Id",
                    touched: false,
                    visible: true,
                    disable: false
                },
                action: {
                    value: props !== undefined && props.action !== undefined ? props.action : '',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please select action",
                    placeholder: "Action",
                    touched: false,
                    visible: true,
                    disable: false
                }
            }
        }
        return state;
    }

    render() {
        const Orders = [
            {
                value: "",
                label: "None"
            },
            {
                value: '20133',
                label: '20133'
            },
            {
                value: '20134',
                label: '20134'
            }];
        const CustomerNames = [
            {
                value: "",
                label: "None"
            },
            {
                value: 'CFEnergia power',
                label: 'CFEnergia power'
            },
            {
                value: 'BP Gas station',
                label: 'BP Gas station'
            }];
        const Actions = [
        
            {
                value: 'Approve',
                label: 'Approve'
            },
            {
                value: 'Reject',
                label: 'Reject'
            }];
        return <div>
            <div className='col-lg-9 add-rfq-main progress-main manage-gps-auth'>
                <p className='manage-gps-title'>Manage GPS Authorizations</p>
                <div className="row drop-down-sec">
                    <div className="col-12 col-md-12 form-wrapper">
                        <div className="row form-row">
                            <div className="col-md-4 mb-3  ">
                                <TextField
                                    select
                                    id="customername"
                                    label="Customer Name"
                                    value={this.state.formData.customername.value}
                                    onChange={this.handleChange}
                                    name="customername"
                                    variant="outlined"
                                    className="form-control"
                                    autoComplete="off"
                                    margin="dense"
                                >
                                    {CustomerNames.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>


                            </div>
                            <div className="col-md-4 mb-3  ">
                                <TextField
                                    select
                                    id="orderid"
                                    label="Order Id"
                                    value={this.state.formData.orderid.value}
                                    onChange={this.handleChange}
                                    
                                    name="orderid"
                                    variant="outlined"
                                    className="form-control"
                                    autoComplete="off"
                                    margin="dense"
                                    disabled={false}
                                >
                                    {Orders.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-md-4 mb-3  ">
                                <TextField
                                    select
                                    id='action'
                                    variant="outlined"
                                    name='action'
                                    label="Action"
                                    value={this.state.formData.action.value || ""}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    margin="dense"
                                >
                                    
                                    {Actions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                </TextField>
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-12 set-center form-wrapper'>
                        <button type='button' onClick={this.onSubmit} className='btn btn-success'>Submit</button>
                    </div>
                </div>
                <div className='react-table-sec'>
                    {this.state.showTable && <ManageGPSTable dataItem={this.state} />}
                </div>

            </div>


        </div>


    }
}
export { ManageGPSAuth };