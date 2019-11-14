import React from 'react';
import { connect } from 'react-redux';
import { Table_Config, history, dateutility, formatutility } from '../../_helpers';
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
import { OrderTrackingShowLedgerPop } from './OrderTrackingShowLedgerPop'
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { TextField, Typography, Tab, IconButton, Tabs, InputBase, Paper, InputAdornment } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
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
            OTRStatusId: "",
            orderList: [],
            selectedOrderDate: new Date(),
            showLedgerPopUp: false
        }
        this.trackBtnClk = this.trackBtnClk.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.getEnteredOTP = this.getEnteredOTP.bind(this);
        this.postReSendOTP = this.postReSendOTP.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.showLedgerTransHistory = this.showLedgerTransHistory.bind(this);
        this.showLedgerPopUpClose=this.showLedgerPopUpClose.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(orderTrackingActions.listOrderTracking());
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.props.orderTracking.orderTrackingList && this.props.orderTracking.orderTrackingList && this.props.orderTracking.orderTrackingList.length) {
            this.setState({ orderList: this.props.orderTracking.orderTrackingList })
        }
    }
    showLedgerTransHistory(type) {
        console.log(type);
        this.setState({ showLedgerPopUp: true });
    }
    handleDateChange(date) {
        if (date == null) {
            date = new Date();
        }
        this.setState({ selectedOrderDate: date });
    }

    getEnteredOTP(OTPValue, OTRStatusId) {
        let collection = {};
        collection.OTP = OTPValue;
        collection.requestId = this.state.OTRStatusId;
        this.props.dispatch(orderTrackingActions.submitOTPRequest(collection));
        this.setState({ showModel: false });
    }
    postReSendOTP() {
        console.log("requestId");
        console.log(this.state.OTRStatusId);
        this.props.dispatch(orderTrackingActions.postOTPResendRequest(this.state.OTRStatusId));
        // let data={
        // }
        // this.props.dispatch(orderTrackingActions.submitTrackRequest(data,this.state.orderList));
    }

    trackBtnClk(event, data, status, showModel = true) {

        if (data.orderTrackingStatus === "Approved" || data.orderTrackingStatus === "Auto Approved") {
            this.setState({ showModel: true, OrderStatus: status, OTRStatusId: data.OTRStatusId });
        }
        else if ((data.orderTrackingStatus === "Request Submitted") || (data.orderTrackingStatus === "New Request")) {
            this.setState({ showModel: true, OrderStatus: status });
        }
        else if (data.orderTrackingStatus === "") {
            this.props.dispatch(orderTrackingActions.submitTrackRequest(data, this.state.orderList));
        }

    }

    tabChange(event, newValue) {
        //this.setState({ tabValue: newValue,selectedOrderDate: new Date(),search:'' })
        this.setState({ tabValue: newValue, selectedOrderDate: "", search: '' })
    };
    closeModel() {
        this.setState({ showModel: false, OTRStatusId: "" })
    }
    showLedgerPopUpClose(){
        this.setState({showLedgerPopUp:false});
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
                <div className='float-right legend-icons'>
                    <span><i className="material-icons show-history-legends">speaker_phone</i>
                        <span className='text-under'>Connect</span></span>
                    <span><i className="material-icons  show-history-legends">save</i>
                        <span className='text-under' onClick={() => this.showLedgerTransHistory('Show_Ledger_Tran_History')}>Show Ledger Trans History</span></span>
                </div>
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
                                    value={this.state.search}
                                    onChange={e => this.setState({ search: e.target.value })}
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
                                data={this.state.search.trim() !== "" ? (this.state.orderList || []).filter(
                                    f => f.poNumber !== undefined &&
                                        f.poNumber.toString()
                                            .toLowerCase()
                                            .includes(
                                                this.state.search.toLowerCase()
                                            )) : (this.state.orderList || [])}
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
                                        value={dateutility.datefunction(this.state.selectedOrderDate, formatutility.MMDDYYYY)}
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
                                data={this.state.selectedOrderDate.toString().trim() !== "" ? (this.state.orderList || []).filter(
                                    f => f.poDate !== undefined &&
                                        dateutility.datefunction(f.poDate, formatutility.MMDDYYYY).toString()
                                            .toLowerCase()
                                            .includes(
                                                dateutility.datefunction(this.state.selectedOrderDate, formatutility.MMDDYYYY).toString().toLowerCase()
                                            )) : (this.state.orderList || [])}
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
                                        value={new Date(this.state.selectedOrderDate)}
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
                                data={this.state.selectedOrderDate.toString().trim() !== "" ? (this.state.orderList || []).filter(
                                    f => f.deliveryDate !== undefined &&
                                        dateutility.datefunction(f.deliveryDate, formatutility.MMDDYYYY).toString()
                                            .toLowerCase()
                                            .includes(
                                                dateutility.datefunction(this.state.selectedOrderDate, formatutility.MMDDYYYY).toString().toLowerCase()
                                            )) : (this.state.orderList || [])}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                </Paper>
                <OTPModel
                    showModel={this.state.showModel}
                    closeModel={this.closeModel}
                    getEnteredOTP={this.getEnteredOTP}
                    OrderStatus={this.state.OrderStatus}
                    OTRStatusId={this.state.OTRStatusId}
                    postReSendOTP={this.postReSendOTP}
                />
                <OrderTrackingShowLedgerPop
                    showModel={this.state.showLedgerPopUp}
                    closeModel={this.showLedgerPopUpClose} />

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
