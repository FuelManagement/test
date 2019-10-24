import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { validate } from '../../_helpers';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { CarouselComponent } from "../../CarouselComponent";
import { LandingPageHeader } from '../../_components/LandingPageHeader';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
// import {Usericon} from '../../../assets/img/UserIcon.png';
import { height } from '@material-ui/system';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);


const businessRange = [
    {
        value: "",
        label: "None"
    },
    {
        value: "10",
        label: "Ten"
    },
    {
        value: "20",
        label: "Twenty"
    },
    {
        value: "30",
        label: "Thirty"
    }
];
class AddUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, null);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                ddlOrganisationName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Organisation Name",
                    placeholder: "Organisation Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                ddlRollType: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Roll Type",
                    placeholder: "Roll Type",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtDesignation: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Designation",
                    placeholder: "Designation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtFirstname: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter First Name",
                    placeholder: "First Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtMiddlename: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Middle Name",
                    placeholder: "Middle Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtLastname: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Last Name",
                    placeholder: "Last Name",
                    touched: false,
                    visible: true,
                    disable: false
                },

                txtFirstTelephoneNo: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter first telephone number",
                    placeholder: "First Telephone Number",
                    touched: false,
                    visible: true,
                    disable: false
                },
                radioFirstTelephoneNo: {
                    value: "mobile",
                    valid: false,
                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter first telephone number",
                    // placeholder: "First Telephone Number",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtSecondTelephoneNumber: {
                    value: "",
                    valid: false,
                    validationRules: {
                        // notEmpty: true,
                        // minLength: true,
                        isName: true
                    },
                    error: "Please enter second telephone number",
                    touched: false,
                    visible: true,
                    disable: true
                },
                radioSecondTelephoneNumber: {
                    value: "telephone",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter second telephone number",
                    touched: false,
                    visible: false,
                    disable: true
                },
                txtemailaddress: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Email Address",
                    placeholder: "Email Address ",
                    touched: false,
                    visible: true,
                    disable: false
                },

                txtAddressline1: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Address line 1",
                    placeholder: "Address Line1 ",
                    touched: false,
                    visible: true,
                    disable: false
                },

                txtAddressline2: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Address line 2",
                    placeholder: "Address Line2",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtCity: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter State",
                    placeholder: "State",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtstate: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter State",
                    placeholder: "State",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtcountry: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Country",
                    placeholder: "Country",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtzipcode: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter Zipcode",
                    placeholder: "Zipcode",
                    touched: false,
                    visible: true,
                    disable: false
                },


            },
            errors: {}
        };
        return state;
    }
    handleChange(event) {
        console.log(event.target);
        let key = event.target.name, value = event.target.value;
        let connectedValue = {};
        this.setState(prevState => {
            return {
                submitted:false,
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                          value,
                          prevState.controls[key].validationRules,
                          connectedValue,
                          key
                        ),
                        touched: true
                    }
                }
            };
        });
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
    handleSubmit(){ 
     let isFormVaild=true;
     if (this.state.controls !== undefined) {
        ["ddlOrganisationName","ddlRollType","txtDesignation","txtFirstname","txtMiddlename","txtLastname","txtFirstTelephoneNo","radioFirstTelephoneNo","txtSecondTelephoneNumber","radioSecondTelephoneNumber","txtemailaddress","txtAddressline1","txtAddressline2","txtCity","txtstate","txtzipcode","txtcountry"].forEach(name => {
            let value = this.state.controls[name].valid, touched = this.state.controls[name].touched; 
            console.log(this.state.controls[name].value); 
            
          });
     }

    }

    render() {

        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3><Link to="/rfq"> <FontAwesomeIcon icon="angle-left" /></Link> &nbsp;&nbsp;&nbsp;User Information</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id='ddlOrganisationName'
                                        variant="outlined"
                                        name='ddlOrganisationName'
                                        label="Organisation Name"
                                        value={this.state.controls.ddlOrganisationName.value}
                                        className="form-control"
                                        onChange={this.handleChange}
                                        margin="dense"

                                    >
                                        {businessRange.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        id='ddlRollType'
                                        variant="outlined"
                                        name='ddlRollType'
                                        label="Roll Type"
                                        value={this.state.controls.ddlRollType.value}
                                        className="form-control"
                                        onChange={this.handleChange}
                                        margin="dense"

                                    >
                                        {businessRange.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="txtDesignation"
                                        label="Test"
                                        name="txtDesignation"
                                        value={this.state.controls.txtDesignation.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>

                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="txtFirstname"
                                        label="First Name"
                                        name="txtFirstname"
                                        value={this.state.controls.txtFirstname.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="txtMiddlename"
                                        label="Middle Name"
                                        name="txtMiddlename"
                                        value={this.state.controls.txtMiddlename.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        id="txtLastname"
                                        label="Last Name"
                                        name="txtLastname"
                                        value={this.state.controls.txtLastname.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="reg-heading"> <ContactPhoneIcon /> Contact Information</h2>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="txtFirstTelephoneNo"
                                        label="First Telephone Number"
                                        name="txtFirstTelephoneNo"
                                        value={this.state.controls.txtFirstTelephoneNo.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="radioFirstTelephoneNo" name="radioFirstTelephoneNo" value={this.state.controls.radioFirstTelephoneNo.value} onChange={this.handleChange} row>
                                            <FormControlLabel
                                                value="mobile"
                                                control={<GreenRadio />}
                                                label="Mobile"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="telephone"
                                                control={<GreenRadio />}
                                                label="Telephone"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="col-md-4 mb-3 addrfq-dateTime ">
                                    <TextField
                                        id="txtSecondTelephoneNumber"
                                        margin="dense"
                                        name="txtSecondTelephoneNumber"
                                        label="Second Telephone Number"
                                        value={this.state.controls.txtSecondTelephoneNumber.value}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="radioFirstTelephoneNumber" name="radioSecondTelephoneNumber" value={this.state.controls.radioSecondTelephoneNumber.value} onChange={this.handleChange} row>
                                            <FormControlLabel
                                                value="mobile"
                                                control={<GreenRadio />}
                                                label="Mobile"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="telephone"
                                                control={<GreenRadio />}
                                                label="Telephone"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtemailaddress"
                                        label="Email Address"
                                        name="txtemailaddress"
                                        value={this.state.controls.txtemailaddress.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-12">
                                    <h2 className="reg-heading"><ContactsIcon /> Address Information</h2>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtAddressline1"
                                        label="Address line 1"
                                        name="txtAddressline1"
                                        value={this.state.controls.txtAddressline1.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtAddressline2"
                                        label="Address line 2"
                                        name="txtAddressline2"
                                        value={this.state.controls.txtAddressline2.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtcity"
                                        label="City"
                                        name="txtCity"
                                        value={this.state.controls.txtCity.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtstate"
                                        label="State"
                                        name="txtstate"
                                        value={this.state.controls.txtstate.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtzipcode"
                                        label="Zipcode"
                                        name="txtzipcode"
                                        value={this.state.controls.txtzipcode.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="txtcountry"
                                        label="Country"
                                        name="txtcountry"
                                        value={this.state.controls.txtcountry.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3 mb-3 ">
                                    <button className="btn btn-primary create-btn link-bg button-style float-right mb10" onClick={this.handleSubmit}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

const connectedUserProfileForm = connect(mapStateToProps)(AddUserProfile);
export { connectedUserProfileForm as AddUserProfile };
