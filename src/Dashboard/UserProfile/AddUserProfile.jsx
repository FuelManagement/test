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
import { userProfileActions,alertActions } from '../../_actions';
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
        this.state = this.initialState(this.props.userProfile.mode, this.props.userProfile.userProfile);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextprops)
    {
    if(JSON.stringify(this.props.userProfile.userProfile)!==JSON.stringify(nextprops.userProfile.userProfile))
    {
        ["participantID","role","designation","first_Name","middle_Name","last_Name","firstContactNo","firstContactNoType","secondContactNo","secondContactNoType","email","address1","address2","city","state","zip","country"].forEach(name => {
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              [name]: {
                ...prevState.controls[name],
                value: nextprops.userProfile.userProfile[name], 
               // disable: nextprops.mode==='view'?true:false
              }
            }
          }
        });
      });
    
    }}
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                participantID: {
                    value: props!==undefined && props.participantID!==undefined?props.participantID:'',
                    valid:mode !=='create'?true:false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Organisation Name",
                    placeholder: "Organisation Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                role: {
                    value: props!==undefined && props.role!==undefined?props.role:'',
                   
                    valid:mode !=='create'?true:false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Roll Type",
                    placeholder: "Roll Type",
                    touched: false,
                    visible: true,
                    disable: false
                },
                designation: {
                    value: props!==undefined && props.designation!==undefined?props.designation:'',
                   
                    valid:mode !=='create'?true:false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter Designation",
                    placeholder: "Designation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                first_Name: {
                    value: props!==undefined && props.first_Name!==undefined?props.first_Name:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.middle_Name!==undefined?props.middle_Name:'',
                   
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
                    value: props!==undefined && props.last_Name!==undefined?props.last_Name:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.firstContactNo!==undefined?props.firstContactNo:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.firstContactNoType!==undefined?props.firstContactNoType:'mobile',
                   
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
                    value: props!==undefined && props.secondContactNo!==undefined?props.secondContactNo:'',
                   
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
                    value: props!==undefined && props.secondContactNoType!==undefined?props.secondContactNoType:'mobile',
                   
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
                    value: props!==undefined && props.email!==undefined?props.email:'',
                   
                    valid:mode !=='create'?true:false,
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

                address1: {
                    value: props!==undefined && props.address1!==undefined?props.address1:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.address2!==undefined?props.address2:'',
                   
                    valid:true,
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
                    value: props!==undefined && props.city!==undefined?props.city:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.state!==undefined?props.state:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.country!==undefined?props.country:'',
                   
                    valid:mode !=='create'?true:false,
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
                    value: props!==undefined && props.zip!==undefined?props.zip:'',
                   
                    valid:mode !=='create'?true:false,
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
                        touched: true
                    }
                }
            };
        });
        this.props.dispatch(userProfileActions.changeUserProfile(key,value));
    }
    
    handleSubmit(){ 
     
     let isFormVaild=true;
     if (this.state.controls !== undefined) {
        ["participantID","role","designation","first_Name","middle_Name","last_Name","firstContactNo","firstContactNoType","secondContactNo","secondContactNoType","email","address1","address2","city","state","zip","country"].forEach(name => {
           let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
           if (!value && this.props.userProfile.mode==='create') {
            this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
            isFormVaild=false;
           }
           else if(!value && touched && this.props.userProfile.mode!=='create'){
             this.props.dispatch(alertActions.error("Field(s) cannot be empty."));
            isFormVaild=false;
           }
           
         });
         if(isFormVaild){
      if(this.props.userProfile.mode==='create')
      {
          this.props.dispatch(userProfileActions.createUserProfile(this.props.userProfile.userProfile));
      }else{
         this.props.dispatch(userProfileActions.updateUserProfile(this.props.userProfile.userProfile));
      }
     
     }
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
                                        label="Organisation Name"
                                        value={this.state.controls.participantID.value}
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
                                     error={!this.state.controls.role.valid && this.state.controls.role.touched}
                                
                                        select
                                        id='role'
                                        variant="outlined"
                                        name='role'
                                        label="Role"
                                        value={this.state.controls.role.value}
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
                                <div className="col-md-4 mb-3 addrfq-dateTime ">
                                    <TextField
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
                                <div className="col-md-4 mb-3 ">
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
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3 mb-3 ">
                                 {this.props.userProfile.mode!=='view'? <button className="btn btn-primary create-btn link-bg button-style float-right mb10" onClick={this.handleSubmit}>{this.props.userProfile.mode==='create'?'Create':'Update'}</button>:null}
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
    const { userProfile } = state;
   
    return {
        userProfile
      
    };
}

const connectedUserProfileForm = connect(mapStateToProps)(AddUserProfile);
export { connectedUserProfileForm as AddUserProfile };
