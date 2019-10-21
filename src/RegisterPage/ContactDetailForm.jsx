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
import { onboardActions } from '../_actions';
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
  }
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        txtStreetAddress: {
          value: props !== undefined && props.txtStreetAddress !== undefined ? props.txtStreetAddress : '',

          valid: false,
          validationRules: {
            notEmpty: true,
            isName: true
          },
          error: "Please enter street Address",
          placeholder: "Street Address",
          touched: false,
          visible: true,
          disable: false
        },
        txtNeighborhoodCity: {
          value: props !== undefined && props.txtNeighborhoodCity !== undefined ? props.txtNeighborhoodCity : '',

          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter neighborhood/city",
          placeholder: "Neighborhood/City",
          touched: false,
          visible: true,
          disable: false
        },
        txtPostalCode: {
          value: props !== undefined && props.txtPostalCode !== undefined ? props.txtPostalCode : '',

          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter postal code",
          placeholder: "Postal Code",
          touched: false,
          visible: true,
          disable: false
        },

        txtRegion: {
          value: props !== undefined && props.txtRegion !== undefined ? props.txtRegion : '',

          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter region",
          placeholder: "Region",
          touched: false,
          visible: true,
          disable: false
        },
        txtCountry: {
          value: props !== undefined && props.txtCountry !== undefined ? props.txtCountry : '',

          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter country",
          placeholder: "Country",
          touched: false,
          visible: true,
          disable: false
        },
        txtFaxNumber: {
          value: props !== undefined && props.txtFaxNumber !== undefined ? props.txtFaxNumber : '',

          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter fax number",
          placeholder: "Fax Number",
          touched: false,
          visible: true,
          disable: false
        },
        txtFirstTelephoneNumber: {
          value: props !== undefined && props.txtFirstTelephoneNumber !== undefined ? props.txtFirstTelephoneNumber : '',

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
        radioFirstTelephoneNumber: {
          value: props !== undefined && props.radioFirstTelephoneNumber !== undefined ? props.radioFirstTelephoneNumber : 'mobile',

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
          value: props !== undefined && props.txtSecondTelephoneNumber !== undefined ? props.txtSecondTelephoneNumber : '',

          valid: false,
          validationRules: {
            notEmpty: true,
            minLength: true,
            isName: true
          },
          error: "Please enter second telephone number",
          touched: false,
          visible: true,
          disable: true
        },
        radioSecondTelephoneNumber: {
          value: props !== undefined && props.radioSecondTelephoneNumber !== undefined ? props.radioSecondTelephoneNumber : 'telephone',

          valid: false,
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
    let connectedValue = {};
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            // valid: validate(
            //   value,
            //   prevState.controls[key].validationRules,
            //   connectedValue
            // ),
            touched: true
          }
        }
      };
    });
    this.props.dispatch(onboardActions.changeParticipant(key, value));
  }
  handleOnChange(value) {
    this.setState({ phone: value })
  }
  render() {
    return (
      <div className="mx-auto">
        <h2 className="reg-heading">Contact Information</h2>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <TextField
              id="txtStreetAddress"
              label="Street Address"
              name="txtStreetAddress"
              value={this.state.controls.txtStreetAddress.value}
              onChange={this.handleChange}
              variant="outlined"
              className="form-control"
              autoComplete="off"
              margin="dense"
              inputProps={{ maxLength: 100 }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-12 mb-3 ">
            <TextField
              id="txtNeighborhoodCity"
              margin="normal"
              name="txtNeighborhoodCity"
              label="Neighborhood / City"
              value={this.state.controls.txtNeighborhoodCity.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <TextField
              id="txtPostalCode"
              margin="normal"
              name="txtPostalCode"
              label="Postal Code"
              value={this.state.controls.txtPostalCode.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
            />
          </div>
          <div className="col-md-4 mb-3">
            <TextField
              id="txtRegion"
              margin="normal"
              name="txtRegion"
              label="Region"
              value={this.state.controls.txtRegion.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
            />
          </div>
          <div className="col-md-4 md-3">
            <TextField
              id="txtCountry"
              margin="normal"
              name="txtCountry"
              label="Country"
              value={this.state.controls.txtCountry.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 md-3">
            <TextField
              id="txtFaxNumber"
              margin="normal"
              name="txtFaxNumber"
              label="Fax Number"
              value={this.state.controls.txtFaxNumber.value}
              onChange={this.handleChange}
              className="form-control"
              variant="outlined"
              autoComplete="off"
              margin="dense"
            />
          </div>
          <div className="col-md-4 md-3">
            <TextField
              id="txtFirstTelephoneNumber"
              label="First Telephone Number"
              name="txtFirstTelephoneNumber"
              value={this.state.controls.txtFirstTelephoneNumber.value}
              onChange={this.handleChange}
              variant="outlined"
              className="form-control"
              autoComplete="off"
              margin="dense"
            />
            <FormControl component="fieldset" >
              <RadioGroup aria-label="radioFirstTelephoneNumber" name="radioFirstTelephoneNumber" value={this.state.controls.radioFirstTelephoneNumber.value} onChange={this.handleChange} row>
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
