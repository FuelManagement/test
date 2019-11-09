import React from 'react';
import { connect } from 'react-redux';
import { Table_Config, history } from '../../_helpers';
import { orderTrackingActions } from '../../_actions'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { OTPModel } from './OTPModel';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { TextField, Typography, Tab, IconButton, Tabs, InputBase, Paper, InputAdornment } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>)
}

const OrderTrackingStyles = makeStyles(theme => ({
    root: {
        padding: '1px 2px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid green',
        margin: '10px 0',
        borderRadius: '17px',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

class OrderTracking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            showModel: false,
            selectedRfq: {},
            tabValue: 0,
            OrderStatus: "otp-enabled",
            //OrderStatus:"otp-disabled"
            orderList: [],
            selectedOrderDate: new Date()
        }
        this.trackBtnClk = this.trackBtnClk.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.getEnteredOTP = this.getEnteredOTP.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(orderTrackingActions.listOrderTracking());
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.props.orderTracking.orderTrackingList && this.props.orderTracking.orderTrackingList && this.props.orderTracking.orderTrackingList.length) {
            this.setState({ orderList: this.props.orderTracking.orderTrackingList })
        }
    }
    handleDateChange(date) {
        this.setState({ selectedOrderDate: date });
    }

    getEnteredOTP(OTPValue) {
        let collection={};
        collection.OTP=OTPValue;
        this.props.dispatch(orderTrackingActions.submitOTPRequest(collection));
        this.setState({ showModel: false });
    }

    trackBtnClk(event, data, status, showModel = true) {
        if (data.status === "Approved") {
            this.setState({ showModel: true, OrderStatus: status });
        } 
        else if (data.status === "Request Submitted") {
            this.setState({ showModel: true, OrderStatus: status });
        }
        else if (data.status === "") {
            this.props.dispatch(orderTrackingActions.submitTrackRequest(data));
        }
    }

    tabChange(event, newValue) {
        this.setState({ tabValue: newValue })
    };
    closeModel() {
        this.setState({ showModel: false })
    }
    render() {
        const { rfq } = this.props;
        if (this.state.rfqModal) {
            $('#rfqModal').modal('show');
        } else {
            $('#rfqModal').modal('hide');
        }
        return (
            <div className="col-md-8 offset-md-3 contentDiv order-tracking-main">
                <Paper>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.tabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Order #" />
                        <Tab label="Order Date" />
                        <Tab label="Delivery Date" />
                    </Tabs>
                    <TabPanel value={this.state.tabValue} index={0}>
                        <div>
                            <div className="clearDiv"></div> 
                            <div className='col-md-5 p0 mb-4'>
                                {/* <Paper className={OrderTrackingStyles.root}> */}
                                {/* <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Order #"
                                        inputProps={{ 'aria-label': 'Search by Order' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton> */}
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Search by Order #"
                                    variant="outlined"
                                    className="form-control"
                                    autoComplete="off"
                                    margin="dense"
                                    // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),

                                    }}
                                />
                                {/* </Paper> */}
                            </div>
                            <ReactTable
                                data={this.state.orderList || []}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <div>
                            <div className="clearDiv"></div> 
                            <div className='col-md-5 p0 mb-4'>
                                {/* <Paper className={OrderTrackingStyles.root}>
                                    <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Order Date"
                                        inputProps={{ 'aria-label': 'Search by Order Date' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker style={{ width: '100%' }}
                                        margin="dense"
                                        id="date-picker-dialog"
                                        label="Search by Order Date"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedOrderDate}
                                        onChange={this.handleDateChange}
                                        clearable
                                        inputVariant="outlined"
                                        inputProps={{
                                            name: 'startTime',
                                            id: 'startTime',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <ReactTable
                                data={this.state.orderList || []}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <div>
                            <div className="clearDiv"></div> 
                            <div className='col-md-5 p0 mb-4'>
                                {/* <Paper className={OrderTrackingStyles.root}>
                                    <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Delivery Date"
                                        inputProps={{ 'aria-label': 'Search by Delivery Date' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper> */} 
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker style={{ width: '100%' }}
                                        margin="dense"
                                        id="date-picker-dialog"
                                        label="Search by Delivery Date"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedOrderDate}
                                        onChange={this.handleDateChange}
                                        clearable
                                        inputVariant="outlined"
                                        inputProps={{
                                            name: 'startTime',
                                            id: 'startTime',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <ReactTable
                                data={this.state.orderList || []}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                </Paper>
                <OTPModel showModel={this.state.showModel}
                    closeModel={this.closeModel}
                    getEnteredOTP={this.getEnteredOTP}
                    OrderStatus={this.state.OrderStatus}
                />

                <div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { orderTracking } = state;
    return { orderTracking };
}

const connectedOrderTracking = connect(mapStateToProps)(OrderTracking);
export { connectedOrderTracking as OrderTracking };
