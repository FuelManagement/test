import React from 'react';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { ManageGPSTable } from './ManageGPSTable';

class ManageGPSAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getDataAddedCallback  = this.getDataAddedCallback.bind(this);
        this.getClickedData = this.getClickedData.bind(this);
        console.log("states", this.state);
    }
    onSubmit() {
        
        let validate = false;
        if(this.state.formData.customername.value == ""||undefined){
            this.setState({customerError:true})
            validate = true;
        }
        if(this.state.formData.orderid.value == ""||undefined){
            this.setState({orderError:true})
            validate = true;
        }
        if(this.state.formData.action.value == ""||undefined){
            this.setState({actionError:true})
            validate = true;
        }

        if(!validate){
            this.setState({ showTable: true });
            let randomVal = Math.random();
            console.log(randomVal);
            this.setState({ randomId: randomVal });
            
        }

    }

    getDataAddedCallback(msg){
        console.log("added data status",msg)
        const { formData } = { ...this.state };
        const currentState = formData;
        currentState.customername.value = "";
        currentState.orderid.value = "";
        currentState.action.value = "";

        this.setState({ formData: currentState },() => console.log("callback",this.state));
    }

    getClickedData(data){
            console.log("clicked item",data);
            const { formData } = { ...this.state };
            const currentState = formData;
            currentState.customername.value = data.customerName;
            currentState.orderid.value = data.orderid;
            currentState.action.value = data.status;
    
            this.setState({ formData: currentState },() => console.log("callback",this.state));
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
        if(event.target.name == 'customername'){
            this.setState({customerError:false})
        }
        if(event.target.name == 'orderid'){
            this.setState({orderError:false})
        }
        if(event.target.name == 'action'){
            this.setState({actionError:false})
        }
        
        console.log("state", this.state)
    }
    initialState(mode, props) {
        let state = {};
        state = {
            showTable: false,
            randomId: null,
            customerError:false,
            orderError:false,
            actionError:false,
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
                value: '20133',
                label: '20133'
            },
            {
                value: '20134',
                label: '20134'
            }];
        const CustomerNames = [
            
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
                <h2 className='manage-gps-title'>Manage GPS Authorizations</h2>
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
                                    error={this.state.customerError}
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
                                    error={this.state.orderError}
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
                                    error={this.state.actionError}
                                >

                                    {Actions.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            {/* <div className="col-md-3 manage-submit-button">
                                <button type='button' onClick={this.onSubmit} className='btn btn-success'>Submit</button>
                            </div> */}
                        </div>

                    </div>
                    <div className='col-lg-12 set-center form-wrapper'>
                        <button type='button' onClick={this.onSubmit} className='btn btn-success'>Submit</button>
                    </div>
                </div>
                <div className='react-table-sec'>
                    {this.state.showTable && <ManageGPSTable dataItem={this.state} getAddedCallback = {this.getDataAddedCallback} getClickedItem = {this.getClickedData}/>}
                </div>

            </div>


        </div>


    }
}
export { ManageGPSAuth };