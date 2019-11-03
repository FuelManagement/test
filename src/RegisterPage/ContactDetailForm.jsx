import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import { validate } from '../_helpers';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { onboardActions,alertActions } from '../_actions';
import MuiPhoneInput from 'material-ui-phone-number';
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

class ContactDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(null, this.props.onboard.participant);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
     }
  UNSAFE_componentWillReceiveProps(nextprops) {
    if (JSON.stringify(this.props.onboard.participant) !== JSON.stringify(nextprops.onboard.participant)) {
      ["streetAddress", "postalCode", "city", "faxNumber", "firstContactNumber", "firstContactNumberType", "state"
        ,"country", "secondContactNumber", "SecondContactNumberType"].forEach(name => {
          this.setState(prevState => {
            return {
              controls: {
                ...prevState.controls,
                [name]: {
                  ...prevState.controls[name],
                  value: name === 'productStatus' ? !(nextprops.onboard.participant[name] == 'true' ? true : false) : (nextprops.onboard.participant[name] !== undefined ? nextprops.onboard.participant[name] : ''),

                }
              }
            }
          });
        });

    }
  }
  
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        streetAddress: {
          value: props !== undefined && props.streetAddress !== undefined ? props.streetAddress : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
            maxLength:true, // for validation check make value true else false.
           // isName:true
          },
          error: "Please enter street Address",
          placeholder: "Street Address",
          touched: false,
          visible: true,
          disable: false
        },
        city: {
          value: props !== undefined && props.city !== undefined ? props.city : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter neighborhood/city",
          placeholder: "Neighborhood/City",
          touched: false,
          visible: true,
          disable: false
        },
        postalCode: {
          value: props !== undefined && props.postalCode !== undefined ? props.postalCode : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter postal code",
          placeholder: "Postal Code",
          touched: false,
          visible: true,
          disable: false
        },

        state: {
          value: props !== undefined && props.state !== undefined ? props.state : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter region",
          placeholder: "Region",
          touched: false,
          visible: true,
          disable: false
        },
        country: {
          value: props !== undefined && props.country !== undefined ? props.country : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter country",
          placeholder: "Country",
          touched: false,
          visible: true,
          disable: false
        },
        faxNumber: {
          value: props !== undefined && props.faxNumber !== undefined ? props.faxNumber : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter fax number",
          placeholder: "Fax Number",
          touched: false,
          visible: true,
          disable: false
        },
        firstContactNumber: {
          value: props !== undefined && props.firstContactNumber !== undefined ? props.firstContactNumber : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,

          },
          error: "Please enter first telephone number",
          placeholder: "First Telephone Number",
          touched: false,
          visible: true,
          disable: false
        },
        firstContactNumberType: {
          value: props !== undefined && props.firstContactNumberType !== undefined ? props.firstContactNumberType : 'mobile',

          valid: true,
          validationRules: {
            notEmpty: true,

          },
          error: "Please enter first telephone number",
          // placeholder: "First Telephone Number",
          touched: false,
          visible: true,
          disable: false
        },
        secondContactNumber: {
          value: props !== undefined && props.secondContactNumber !== undefined ? props.secondContactNumber : '',

          valid: this.props.onboard.isContactFormValid?true:false,
          validationRules: {
            notEmpty: true,


          },
          error: "Please enter second telephone number",
          touched: false,
          visible: true,
          disable: true
        },
        SecondContactNumberType: {
          value: props !== undefined && props.SecondContactNumberType !== undefined ? props.SecondContactNumberType : 'telephone',

          valid: true,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter second telephone number",
          touched: false,
          visible: false,
          disable: true
        },

      },
      errors: {}
    };
    return state;
  }
  handleChange(event) {
    let key = event.target.name, value = event.target.value;
    let connectedValue = {streetAddress:{maxLength:50}};
    this.setState(prevState => ({
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
    }),()=> this.handleFormSubmit());
    this.props.dispatch(onboardActions.changeParticipant(key, value));
  
  }
  handleOnChange(value,key) {

    let connectedValue = {};
    this.setState(prevState => ({
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
    }),()=> this.handleFormSubmit());
    this.props.dispatch(onboardActions.changeParticipant(key, value));

  }
  handleFormSubmit(){
    let isFormVaild=true;
   if (this.state.controls !== undefined) {
    ["streetAddress", "postalCode", "city", "faxNumber", "firstContactNumber", "firstContactNumberType", "state"
        , "secondContactNumber", "SecondContactNumberType"].forEach(name => {
         let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
         if (!value && this.props.onboard.mode==='create') {
         
          isFormVaild=false;
         }
         else if(!value && touched && this.props.onboard.mode!=='create'){
         
          isFormVaild=false;
         }
         
       });
    }
    this.props.dispatch(onboardActions.changeFormState('isContactFormVaild',isFormVaild));
    this.props.dispatch(onboardActions.changeFormState('isFormVaild',isFormVaild));
}
//Allow only letters
allowOnlyletters(e) {
  var regex = new RegExp("^[a-zA-Z]+$");

  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }
  else {
      e.preventDefault();
      return false;
  }
}
//Allow only numbers 
allowOnlynumbers(e) {
  var regex = new RegExp(/^[0-9\b]+$/);

  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }
  else {
      e.preventDefault();
      return false;
  }
}
  render() {
    return (
      <div className="mx-auto">
        <h2 className="reg-heading">Contact Information<span style={{float:'right',verticalAlign:'bottom',fontSize:'13px',padding: '11px 0 0 0'}}>All fields are mandatory</span></h2>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <TextField
              id="streetAddress"
              label="Street Address"
              name="streetAddress"
              value={this.state.controls.streetAddress.value}
              onChange={this.handleChange}
              variant="outlined"
              className="form-control"
              autoComplete="off"
              margin="dense"
              
              error={!this.state.controls.streetAddress.valid && this.state.controls.streetAddress.touched}
                            
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-12 mb-3 ">
            <TextField
              id="city"
              margin="normal"
              name="city"
              label="Neighborhood / City"
              value={this.state.controls.city.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              error={!this.state.controls.city.valid && this.state.controls.city.touched} 
               
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <TextField
              id="postalCode"
              margin="normal"
              name="postalCode"
              label="Postal Code"
              value={this.state.controls.postalCode.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              error={!this.state.controls.postalCode.valid && this.state.controls.postalCode.touched}
              
               
              />
          </div>
          <div className="col-md-4 mb-3">
            <TextField
              id="state"
              margin="normal"
              name="state"
              label="Region / State"
              value={this.state.controls.state.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              error={!this.state.controls.state.valid && this.state.controls.state.touched}
             
               
            />
          </div>
          <div className="col-md-4 md-3">
            <TextField
              id="country"
              margin="normal"
              name="country"
              label="country"
              value={this.state.controls.country.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
              error={!this.state.controls.country.valid && this.state.controls.country.touched}
             
               
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 md-3">
            <MuiPhoneInput
               defaultCountry='us'
              margin="dense"
              variant="outlined"
              label="First Telephone Number"
              name="firstContactNumber" 
              value={this.state.controls.firstContactNumber.value}
              onChange={val=>this.handleOnChange(val,'firstContactNumber')}
              error={!this.state.controls.firstContactNumber.valid && this.state.controls.firstContactNumber.touched}
            /> 
            <FormControl component="fieldset" >
              <RadioGroup aria-label="firstContactNumberType" name="firstContactNumberType" value={this.state.controls.firstContactNumberType.value} onChange={this.handleChange} row>
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
              </RadioGroup></FormControl>
          </div>
          <div className="col-md-4 md-3">
            
            <MuiPhoneInput
               defaultCountry='us'
              //  regions={['north-america']}
              margin="dense"
              variant="outlined"
              label="Second Telephone Number"
              name="secondContactNumber" 
              value={this.state.controls.secondContactNumber.value}
              onChange={val=>this.handleOnChange(val,'secondContactNumber')}
              error={!this.state.controls.secondContactNumber.valid && this.state.controls.secondContactNumber.touched}
           
            /> 
            <FormControl component="fieldset" >
              <RadioGroup aria-label="SecondContactNumberType" name="SecondContactNumberType" value={this.state.controls.SecondContactNumberType.value} onChange={this.handleChange} row>
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
          <div className="col-md-4 md-3">      
            <MuiPhoneInput
               defaultCountry='us'
              //  regions={['north-america']}
              margin="dense"
              variant="outlined"
              label="Fax Number"
              name="faxNumber" 
              value={this.state.controls.faxNumber.value}
              onChange={val=>this.handleOnChange(val,'faxNumber')}
              error={!this.state.controls.faxNumber.valid && this.state.controls.faxNumber.touched}     
            /> 
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { onboard } = state;

  return {
    onboard

  };
}

const connectedContactDetailForm = connect(mapStateToProps)(ContactDetailForm);
export { connectedContactDetailForm as ContactDetailForm };
