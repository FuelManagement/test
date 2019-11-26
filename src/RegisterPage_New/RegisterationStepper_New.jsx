import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { userActions } from '../_actions'; 
// import the form components 
import { OrganizationDetailForm } from './OrganizationDetailForm';
import { ContactDetailForm } from './ContactDetailForm';
import { AccountDetailForm } from './AccountDetailForm';
import { TaxDetailForm } from './TaxDetailForm';
import { Upload } from './Upload';
import { SubmitBtn } from './SubmitBtn';

import { TextField, Typography, Tab, IconButton, Tabs, InputBase, Paper, InputAdornment, Box } from '@material-ui/core';


const style = {
    loginSection: {
        paddingRight: "15px",
        paddingLeft: "15px"
    }
}
const tabHeaders = ['Organizational Detail', 'Address Detail', 'Bank Detail', 'Tax Detail', "Documents And Submit"];
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
class RegisterationStepper_New extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                password: '',
                rolesRequested: ''

            },
            submitted: false,
            tabValue: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }
    tabChange(e, newValue) {
        this.setState({ tabValue: newValue });
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.password !== user.confirm_password) return;
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }
    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
    return (
        <div className="col-lg-12 col-md-12 form-wrapper">
            <div className="row order-tracking-main ">
                <div className="col-md-12 pdg-0px">
                            {/* <Fragment> */}
                <Paper>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.tabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label={tabHeaders[0]} />
                        <Tab label={tabHeaders[1]} />
                        <Tab label={tabHeaders[2]} />
                        <Tab label={tabHeaders[3]} />
                        <Tab label={tabHeaders[4]} />

                    </Tabs>
                    <TabPanel value={this.state.tabValue} index={0}>
                        <div>
                            <div className='p0'>
                                <OrganizationDetailForm />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1} className='p0'>
                        <div className='p0' >
                            <ContactDetailForm />
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={2}>
                        <div>
                            <div className='p0'>
                                <AccountDetailForm />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={3}>
                        <div>
                            <div className='p0'>
                                <TaxDetailForm />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={4}>
                        <div>
                            <div className='p0'>
                                <Upload />
                                <SubmitBtn />
                            </div>
                        </div>
                    </TabPanel>
                </Paper>
                {/* </Fragment> */}
                </div>
            </div>
        </div> 
    )
    }
}
function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}
const connectedRegisterationStepper_new = connect(mapStateToProps)(RegisterationStepper_New);
export { connectedRegisterationStepper_new as RegisterationStepper_New };
