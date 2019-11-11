import React from 'react';
import {connect} from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { ManageGPSTable } from './ManageGPSTable';
import { gpsAuthActions } from '../../_actions';

class ManageGPSAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getDataAddedCallback = this.getDataAddedCallback.bind(this);
        this.getClickedData = this.getClickedData.bind(this);
    }
    onSubmit() {
        let validate = true;
        if (this.state.formData.customername.value == "" || undefined) {
            this.setState({ customerError: true })
            validate = false;
        }
        if (this.state.formData.orderId.value == "" || undefined) {
            this.setState({ orderError: true })
            validate = false;
        }
        if (this.state.formData.action.value == "" || undefined) {
            this.setState({ actionError: true })
            validate = false;
        }
        if (validate) {
            this.setState({ showTable: true });
            // let randomVal = Math.random();
            // this.setState({ randomId: randomVal });
            let poNumber = this.state.formData.orderId.value;
            let orderIdFilteredData = this.state.dataItem.filter(option => option.orderId == poNumber);
            let participantCustomerId = orderIdFilteredData[0].customerParticipantId;
            let status = this.state.formData.action.value;
            if(status == 'Approve'){
                status = 'Approved'
            }else{
                status = 'Rejected'
            }

            let obj = {
                participantCustomerId:participantCustomerId,
                poNumber : poNumber,
                status : this.state.formData.action.value
            }
            this.props.dispatch(gpsAuthActions.otrGpsAuthForCustomer(obj));
            
        }
    }

    getDataAddedCallback(msg) {
        const { formData } = { ...this.state };
        const currentState = formData;
        currentState.customername.value = "";
        currentState.orderId.value = "";
        currentState.action.value = "";
        this.setState({ formData: currentState }, () => console.log("callback", this.state));
    }

    getClickedData(data) {
        const { formData } = { ...this.state };
        const currentState = formData;
        currentState.customername.value = data.customerName;
        currentState.orderId.value = data.orderId;
        currentState.action.value = data.status;

        this.setState({ formData: currentState }, () => console.log("callback", this.state));
    }

    handleChange(event) {
        let key = event.target.name,
            value = event.target.value;
        this.setState(prevState => {
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
        if (key == 'customername') {
            //this.props.dispatch(gpsAuthActions.getCustomerOrders(value));
            this.setState({ customerError: false })

            let orderData = this.state.dataItem.filter(option => option.customerParticipantName == value && option.status == "");
            console.log("filtered order data",orderData);
            this.setState({orderData:orderData});
            
        }
        if (key == 'orderId') {
            this.setState({ orderError: false })
        }
        if (key == 'action') {
            this.setState({ actionError: false })
        }
    }
    initialState(mode, props) {
        let state = {};
        state = {
            showTable: true,
            randomId: null,
            customerError: false,
            orderError: false,
            actionError: false,
            dataItem : [],
            dataItemWithoutDuplicate : [],
            orderData : [],
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
                orderId: {
                    value: props !== undefined && props.orderId !== undefined ? props.orderId : '',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please select order #",
                    placeholder: "Order #",
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
            },
            customers: []
        }
        return state;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps Manage Gps Auth",nextProps);
        let dataItem = nextProps.gpsAuth.customers.data;  
        let addedDataItem = nextProps.gpsAuth.addedData.data;
        if(dataItem == undefined)
            return null;
         let dataItemWithoutDuplicate = [];

             dataItemWithoutDuplicate = [
                ...new Set(
                    dataItem.map((item) => { return item.customerParticipantName; })
                ),
              ];
          if(addedDataItem != undefined){
                console.log("addedDataItem",addedDataItem);
                let obj = {
                    customerParticipantId: addedDataItem.customerParticipantId,
                    customerParticipantName : addedDataItem.customerParticipantName,
                    orderId : addedDataItem.poNumber,
                    status : addedDataItem.status
                }

             let objIndex = dataItem.findIndex((obj => obj.orderId == addedDataItem.poNumber));
             dataItem[objIndex].status = addedDataItem.status;
                let dataVal = {data:[]};
                
            }    
        return {dataItem:dataItem,dataItemWithoutDuplicate:dataItemWithoutDuplicate}; 

    }

    componentDidMount(){
        this.props.dispatch(gpsAuthActions.getCustomerByCarrierId());
    }

    render() {
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
                <h2 className="table-main-heading">Manage GPS Authorizations</h2>
                <div className="row drop-down-sec">
                    <div className="col-12 col-md-12 form-wrapper">
                        <div className="row form-row">
                            <div className="col-md-4 ">
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
                                    {/* <MenuItem value={false}>None</MenuItem> */}
                                    {this.state.dataItemWithoutDuplicate && this.state.dataItemWithoutDuplicate.map(item => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    ))}
                                    {/* {this.props.gpsAuth.customers.data && this.props.gpsAuth.customers.data.map(option => (
                                        <MenuItem key={option.customerParticipantName} value={option.customerParticipantName}>{option.customerParticipantName}</MenuItem>
                                    ))} */}
                                </TextField>
                            </div>
                            <div className="col-md-4  ">
                                <TextField
                                    select
                                    id="orderId"
                                    label="Order #"
                                    value={this.state.formData.orderId.value}
                                    onChange={this.handleChange}
                                    name="orderId"
                                    variant="outlined"
                                    className="form-control"
                                    autoComplete="off"
                                    margin="dense"
                                    disabled={false}
                                    error={this.state.orderError}
                                >
                                    <MenuItem value={false}>None</MenuItem>
                                    {/* {this.props.gpsAuth.customerOrders?<MenuItem value="All">All</MenuItem>:""} */}
                                    {this.state.orderData && this.state.orderData.map(option => (
                                    
                                        <MenuItem key={option.orderId} value={option.orderId}>{option.orderId}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-md-4  ">
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
                    {this.state.showTable && <ManageGPSTable dataItem={this.state.dataItem} getAddedCallback={this.getDataAddedCallback} getClickedItem={this.getClickedData} />}
                </div>

            </div>


        </div>


    }
}

function mapStateToProps(state) {
    const { gpsAuth } = state;
    console.log("gpsAuth data",gpsAuth);
    return { gpsAuth };

}

const connectedGpsAuthRequest = connect(mapStateToProps)(ManageGPSAuth);

export { connectedGpsAuthRequest as ManageGPSAuth };