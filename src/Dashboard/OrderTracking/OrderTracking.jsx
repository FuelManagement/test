import React from 'react';
import { connect } from 'react-redux';
import { API_Helpers, Utils, Table_Config, history } from '../../_helpers';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { OTPModel } from './OTPModel';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
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
const recordsData = [
    {
        "orderid": 20133,
        "productName": "Oil",
        "customerName": "CFEnergia power",
        "status": "",
        "trackRequest": ""

    },
    {
        "orderid": 20134,
        "productName": "Gas",
        "customerName": "CFEnergia power",
        "status": "",
        "trackRequest": ""

    }
]
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
        }
        this.trackBtnClk = this.trackBtnClk.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.getEnteredOTP = this.getEnteredOTP.bind(this);
    }
    componentDidMount() {

    }
    getEnteredOTP(OTPValue) {
        console.log('OTP Submitted Successfully',OTPValue);
        this.setState({ showModel: false });
    }
    trackBtnClk(event, showModel = true) {
        this.setState({ showModel: true });
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
                        <Tab label="Order id" />
                        <Tab label="Order Date" />
                        <Tab label="Delivery Date" />
                    </Tabs>
                    <TabPanel value={this.state.tabValue} index={0}>
                        <div>
                            <div className="clearDiv"></div>
                            <br />
                            <div className='col-md-12 p0 order-tracking-peper'>
                                <Paper className={OrderTrackingStyles.root}>
                                    <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Order #"
                                        inputProps={{ 'aria-label': 'Search by Order' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <ReactTable
                                data={recordsData || []}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <div>
                            <div className="clearDiv"></div>
                            <br />
                            <div className='col-md-12 p0 order-tracking-peper'>
                                <Paper className={OrderTrackingStyles.root}>
                                    <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Order Date"
                                        inputProps={{ 'aria-label': 'Search by Order Date' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <ReactTable
                                data={recordsData || []}
                                columns={Table_Config.OrderTrackingRecords.OrderTrackingRecord.columns({ trackBtnClk: this.trackBtnClk.bind(this) })}
                                {...Table_Config.OrderTrackingRecords.OrderTrackingRecord.options}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <div>
                            <div className="clearDiv"></div>
                            <br />
                            <div className='col-md-12 p0 order-tracking-peper'>
                                <Paper className={OrderTrackingStyles.root}>
                                    <InputBase
                                        className={OrderTrackingStyles.input}
                                        placeholder="Search by Delivery Date"
                                        inputProps={{ 'aria-label': 'Search by Delivery Date' }}
                                    />
                                    <IconButton className={OrderTrackingStyles.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <ReactTable
                                data={recordsData || []}
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
    const { rfq } = state;
    return { rfq };
}

const connectedOrderTracking = connect(mapStateToProps)(OrderTracking);
export { connectedOrderTracking as OrderTracking };
