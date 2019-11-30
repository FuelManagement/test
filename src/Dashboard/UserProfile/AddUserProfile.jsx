import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { validate } from '../../_helpers';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { height } from '@material-ui/system';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { userProfileActions, alertActions } from '../../_actions';
import MuiPhoneInput from 'material-ui-phone-number';
import {Common_JsonData} from '../../_helpers';
import { userRolesActions } from '../../_actions/userRoles.actions'


const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);



class AddUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(this.props.userProfile.mode, this.props.userProfile.userProfile);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextprops) {
        if (JSON.stringify(this.props.userProfile.userProfile) !== JSON.stringify(nextprops.userProfile.userProfile)) {
            ["participantID", "roleId", "designation", "first_Name", "middle_Name", "last_Name", "firstContactNo", "firstContactNoType", "secondContactNo", "secondContactNoType", "email","password", "address1", "address2", "city", "state", "zip", "country"].forEach(name => {
                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,
                            [name]: {
                                ...prevState.controls[name],
                                value: nextprops.userProfile.userProfile[name],
                               
                            }
                        }
                    }
                });
            });

        }

        if (this.props.userRole.userRole != undefined) {
            console.log("this.props.userRole enter",this.props.userRole);
            this.setState({ userRoleData: this.props.userRole.userRoles },e => {
                console.log("updated State",this.state.userRoleData)
            })
        }
    }

    componentDidMount(){
        this.props.dispatch(userRolesActions.getUserRolesByParticipant());
    }

    initialState(mode, props) {
        let state = {};
        state = {
            data: "",
            userRoleData:[],
            controls: {
                participantID: {
                    value: props !== undefined && props.participantID !== undefined ? props.participantID : '',
                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Organisation Name",
                    placeholder: "Organisation Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                roleId: {
                    value: props !== undefined && props.roleId !== undefined ? props.roleId : '',

                    valid: true,
                    validationRules: {
                        notEmpty: false,
                    },
                    error: "Please enter Roll Type",
                    placeholder: "Roll Type",
                    touched: true,
                    visible: true,
                    disable: false
                },
                designation: {
                    value: props !== undefined && props.designation !== undefined ? props.designation : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,
                        minLength:true,
                        maxLength:true
                    },
                    error: "Please enter Designation",
                    placeholder: "Designation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                first_Name: {
                    value: props !== undefined && props.first_Name !== undefined ? props.first_Name : '',

                    valid: mode !== 'create' ? true : false,
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
                middle_Name: {
                    value: props !== undefined && props.middle_Name !== undefined ? props.middle_Name : '',

                    valid: true,
                    validationRules: {

                    },
                    error: "Please enter Middle Name",
                    placeholder: "Middle Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                last_Name: {
                    value: props !== undefined && props.last_Name !== undefined ? props.last_Name : '',

                    valid: mode !== 'create' ? true : false,
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

                firstContactNo: {
                    value: props !== undefined && props.firstContactNo !== undefined ? props.firstContactNo : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter first telephone number",
                    placeholder: "First Telephone Number",
                    touched: false,
                    visible: true,
                    disable: false
                },
                firstContactNoType: {
                    value: props !== undefined && props.firstContactNoType !== undefined ? props.firstContactNoType : 'mobile',

                    valid: true,
                    validationRules: {
                        //notEmpty: true,

                    },
                    error: "Please enter first telephone number",
                    // placeholder: "First Telephone Number",
                    touched: false,
                    visible: true,
                    disable: false
                },
                secondContactNo: {
                    value: props !== undefined && props.secondContactNo !== undefined ? props.secondContactNo : '',

                    valid: true,
                    validationRules: {
                        // notEmpty: true,
                        // minLength: true,
                        //isName: true
                    },
                    error: "Please enter second telephone number",
                    touched: false,
                    visible: true,
                    disable: true
                },
                secondContactNoType: {
                    value: props !== undefined && props.secondContactNoType !== undefined ? props.secondContactNoType : 'mobile',

                    valid: true,
                    validationRules: {
                        // notEmpty: true,
                    },
                    error: "Please enter second telephone number",
                    touched: false,
                    visible: false,
                    disable: true
                },
                email: {
                    value: props !== undefined && props.email !== undefined ? props.email : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,
                        isEmail: true
                    },
                    error: "Please enter Email Address",
                    placeholder: "Email Address ",
                    touched: false,
                    visible: true,
                    disable: false
                },
                password: {
                    value: props !== undefined && props.password !== undefined ? props.password : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Email Address",
                    placeholder: "Email Address ",
                    touched: false,
                    visible: true,
                    disable: false
                },
                address1: {
                    value: props !== undefined && props.address1 !== undefined ? props.address1 : '',

                    valid: mode !== 'create' ? true : false,
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

                address2: {
                    value: props !== undefined && props.address2 !== undefined ? props.address2 : '',

                    valid: true,
                    validationRules: {
                        //notEmpty: true,
                        //isName: true
                    },
                    error: "Please enter Address line 2",
                    placeholder: "Address Line2",
                    touched: false,
                    visible: true,
                    disable: false
                },
                city: {
                    value: props !== undefined && props.city !== undefined ? props.city : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter City",
                    placeholder: "City",
                    touched: false,
                    visible: true,
                    disable: false
                },
                state: {
                    value: props !== undefined && props.state !== undefined ? props.state : '',

                    valid: mode !== 'create' ? true : false,
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
                country: {
                    value: props !== undefined && props.country !== undefined ? props.country : '',

                    valid: mode !== 'create' ? true : false,
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
                zip: {
                    value: props !== undefined && props.zip !== undefined ? props.zip : '',

                    valid: mode !== 'create' ? true : false,
                    validationRules: {
                        notEmpty: true,

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
        let key = event.target.name, value = event.target.value;
        if (event.target.name === "participantID") {

            let role = this.props.participants.find(f => f.registerId.toLowerCase() === event.target.value.toLowerCase()).participantType;
            let participantName = this.props.participants.find(f => f.registerId.toLowerCase() === event.target.value.toLowerCase()).domain;
            let participantType = this.props.participants.find(f => f.registerId.toLowerCase() === event.target.value.toLowerCase()).entityType;
            
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        ['role']: {
                            ...prevState.controls['role'],
                            value: role,
                           
                        }
                    }
                };
            });
           // this.props.dispatch(userProfileActions.changeUserProfile('role', role));
            this.props.dispatch(userProfileActions.changeUserProfile('participantName', participantName));
            this.props.dispatch(userProfileActions.changeUserProfile('participantType', role));
        }

        let connectedValue = {
            designation:{minLength:2,maxLength:50},
        };
        this.setState(prevState => {
            return {
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
                        valid:true,
                        touched: true
                    }
                }
            };
        });
         this.props.dispatch(userProfileActions.changeUserProfile(key, value));
    }
    handleOnChange(value,key) {
        let connectedValue = {};
        this.setState(prevState => {
          return {
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
                valid:true,
                touched: true
              }
            }
          };
        }); 
         this.props.dispatch(userProfileActions.changeUserProfile(key, value));
      }

    handleSubmit() {
        let isFormVaild = true;
        if (this.state.controls !== undefined) {
            ["participantID", "designation", "first_Name", "middle_Name", "last_Name", "firstContactNo", "firstContactNoType", "secondContactNo","roleId", "password", "secondContactNoType", "email", "address1", "address2", "city", "state", "zip", "country"].forEach(name => {
                let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
                
                if (!value && this.props.userProfile.mode === 'create') {
                    this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
                    isFormVaild = false;
                }
                else if (!value && touched && this.props.userProfile.mode !== 'create') {
                    this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
                    isFormVaild = false;
                }

            });
            if (isFormVaild) {
                if (this.props.userProfile.mode === 'create') {
                    this.props.dispatch(userProfileActions.createUserProfile(this.props.userProfile.userProfile));
                } else {
                    this.props.dispatch(userProfileActions.updateUserProfile(this.props.userProfile.userProfile));
                }

            }
        }

    }
    //Allow only letters
    allowOnlyletters(e){   
        var regex = new RegExp("^[a-zA-Z]+$"); 
        
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else
        {
        e.preventDefault(); 
        return false;
        } 
    }

     //Allow only numbers 
     allowOnlynumbers(e){   
        var regex = new RegExp(/^[0-9\b]+$/); 
        
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        else
        {
        e.preventDefault(); 
        return false;
        } 
    }

    render() {

        return (
            <div className="mx-auto">
                <div className="row brd-tp1px">
                    <div className='col-lg-9 add-rfq-main'>
                        <h3><Link to="/userProfile"> <FontAwesomeIcon icon="angle-left" /></Link> &nbsp;&nbsp;&nbsp;User Information</h3>
                        <hr />
                        <div className="col-12 col-md-12 form-wrapper">
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        error={!this.state.controls.participantID.valid && this.state.controls.participantID.touched}

                                        id='participantID'
                                        variant="outlined"
                                        name='participantID'
                                        label="Organisation"
                                        value={this.state.controls.participantID.value}
                                        className="form-control"
                                        onChange={this.handleChange}
                                        margin="dense"
                                    >
                                        {this.props.participants.map(option => (
                                            <MenuItem key={option.registerId} value={option.registerId}>
                                                {option.domain}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        select
                                        // error={!this.state.controls.role.valid && this.state.controls.role.touched} 
                                        id='roleId'
                                        variant="outlined"
                                        name='roleId'
                                        label="User Role"
                                        value={this.state.controls.roleId.value}
                                        className="form-control"
                                        onChange={this.handleChange}
                                        margin="dense" 
                                    >
                                    {this.state.userRoleData.map(option => (
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.roleType}
                                            </MenuItem>
                                         ))}

                                    </TextField>
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        error={!this.state.controls.designation.valid && this.state.controls.designation.touched}
                                        id="designation"
                                        label="Designation"
                                        name="designation"
                                        value={this.state.controls.designation.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>

                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        error={!this.state.controls.first_Name.valid && this.state.controls.first_Name.touched}

                                        id="first_Name"
                                        label="First Name"
                                        name="first_Name"
                                        value={this.state.controls.first_Name.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  addrfq-dateTime">
                                    <TextField
                                        id="middle_Name"
                                        label="Middle Name"
                                        name="middle_Name"
                                        value={this.state.controls.middle_Name.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                                <div className="col-md-4 mb-3  ">
                                    <TextField
                                        error={!this.state.controls.last_Name.valid && this.state.controls.last_Name.touched}
                                        id="last_Name"
                                        label="Last Name"
                                        name="last_Name"
                                        value={this.state.controls.last_Name.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="reg-heading"> <ContactPhoneIcon /> Contact Information</h2>
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 mb-3  addrfq-dateTime">
                                    {/* <TextField
                                        error={!this.state.controls.firstContactNo.valid && this.state.controls.firstContactNo.touched}

                                        id="firstContactNo"
                                        label="First Telephone Number"
                                        name="firstContactNo"
                                        value={this.state.controls.firstContactNo.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    /> */}
                                    <MuiPhoneInput
                                        defaultCountry='us'
                                        //  regions={['north-america']}
                                        margin="dense"
                                        variant="outlined"
                                        label="First Telephone Number"
                                        name="firstContactNo"
                                        id="firstContactNo"  
                                        value={this.state.controls.firstContactNo.value}
                                        onChange={val => this.handleOnChange(val, 'firstContactNo')}
                                        error={!this.state.controls.firstContactNo.valid && this.state.controls.firstContactNo.touched}
                                    />
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="firstContactNoType" name="firstContactNoType" value={this.state.controls.firstContactNoType.value} onChange={this.handleChange} row>
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
                                <div className="col-md-6 mb-3 addrfq-dateTime ">
                                    {/* <TextField
                                        error={!this.state.controls.secondContactNo.valid && this.state.controls.secondContactNo.touched}
                                        id="secondContactNo"
                                        margin="dense"
                                        name="secondContactNo"
                                        label="Second Telephone Number"
                                        value={this.state.controls.secondContactNo.value}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        variant="outlined"
                                        autoComplete="off"
                                    /> */}
                                    <MuiPhoneInput
                                        defaultCountry='us'
                                        //  regions={['north-america']}
                                        margin="dense"
                                        variant="outlined"
                                        label="Second Telephone Number"
                                        name="secondContactNo"
                                        id="secondContactNo" 
                                        value={this.state.controls.secondContactNo.value}
                                        onChange={val => this.handleOnChange(val, 'secondContactNo')}
                                        error={!this.state.controls.secondContactNo.valid && this.state.controls.secondContactNo.touched}
                                    />
                                    <FormControl component="fieldset" >
                                        <RadioGroup aria-label="radioFirstTelephoneNumber" name="secondContactNoType" value={this.state.controls.secondContactNoType.value} onChange={this.handleChange} row>
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

                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.email.valid && this.state.controls.email.touched}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={this.state.controls.email.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        error={!this.state.controls.password.valid && this.state.controls.password.touched}
                                        type="password"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        value={this.state.controls.password.value}
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
                                        error={!this.state.controls.address1.valid && this.state.controls.address1.touched}

                                        id="address1"
                                        label="Address line 1"
                                        name="address1"
                                        value={this.state.controls.address1.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        id="address2"
                                        label="Address line 2"
                                        name="address2"
                                        value={this.state.controls.address2.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.city.valid && this.state.controls.city.touched}
                                        id="city"
                                        label="City"
                                        name="city"
                                        value={this.state.controls.city.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.state.valid && this.state.controls.state.touched}
                                        id="state"
                                        label="State"
                                        name="state"
                                        value={this.state.controls.state.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.zip.valid && this.state.controls.zip.touched}

                                        id="zip"
                                        label="Zipcode"
                                        name="zip"
                                        value={this.state.controls.zip.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress={this.allowOnlynumbers.bind(this)}
                                    />
                                </div>
                                <div className="col-md-4 mb-3 ">
                                    <TextField
                                        error={!this.state.controls.country.valid && this.state.controls.country.touched}
                                        id="country"
                                        label="Country"
                                        name="country"
                                        value={this.state.controls.country.value}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        className="form-control"
                                        autoComplete="off"
                                        margin="dense"
                                        onKeyPress  ={this.allowOnlyletters.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3 mb-3 ">
                                    {this.props.userProfile.mode !== 'view' ? <button className="btn btn-primary create-btn link-bg button-style float-right mb10" onClick={this.handleSubmit}>{this.props.userProfile.mode === 'create' ? 'Create' : 'Update'}</button> : null}
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
        userRole:state.userRole,
        userProfile: state.userProfile,
        participants: state.onboard.participants
    };
}

const connectedUserProfileForm = connect(mapStateToProps)(AddUserProfile);
export { connectedUserProfileForm as AddUserProfile };
