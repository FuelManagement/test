import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { validate } from '../_helpers';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {onboardActions} from '../_actions';
const ddlPurchaseordercurrency = [
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
const ddlPartnerBankType = [
  {
      value: "",
      label: "None"
  },
  {
      value: "IMF",
      label: "IMF"
  },
  {
      value: "WB",
      label: "WB"
  },
 
];
const ddlCurr = [
  {
      value: "",
      label: "None"
  },
  {
      value: "USD",
      label: "USD"
  },
  {
    value: "CAN$",
    label: "CAN $"
},
  {
      value: "MEX$",
      label: "MEX $"
  },
  
];

class AccountDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(null, this.props.onboard.participant);
    this.handleChange = this.handleChange.bind(this);
  }
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        txtNameBank: {
          value: props!==undefined && props.txtNameBank!==undefined?props.txtNameBank:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            isName: true
          },
          error: "Please enter bank name",
          placeholder: "Bank Name",
          touched: false,
          visible: true,
          disable: false
        },
        txtAccountHolderName: {
          value: props!==undefined && props.txtAccountHolderName!==undefined?props.txtAccountHolderName:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter account holder name",
          placeholder: "Account Holder Name",
          touched: false,
          visible: true,
          disable: false
        },
        txtAccountNumber: {
          value: props!==undefined && props.txtAccountNumber!==undefined?props.txtAccountNumber:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter account name",
          placeholder: "AccountNumber",
          touched: false,
          visible: true,
          disable: false
        },

        txtBankControlKey: {
          value: props!==undefined && props.txtBankControlKey!==undefined?props.txtBankControlKey:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter bank control key",
          placeholder: "Bank Control Key",
          touched: false,
          visible: true,
          disable: false
        },
        txtBankcountrykey: {
          value: props!==undefined && props.txtBankcountrykey!==undefined?props.txtBankcountrykey:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter bank country key",
          placeholder: "Bank Country Key",
          touched: false,
          visible: true,
          disable: false
        },
        txtBankkey: {
          value: props!==undefined && props.txtBankkey!==undefined?props.txtBankkey:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter bank key",
          placeholder: "Bank Key",
          touched: false,
          visible: true,
          disable: false
        },
        txtReferencespecificationsforbankdetails: {
          value: props!==undefined && props.txtReferencespecificationsforbankdetails!==undefined?props.txtReferencespecificationsforbankdetails:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            minLength: true,
            isName: true
          },
          error: "Please enter reference specifications for bank details",
          placeholder: "Reference specifications for bank details",
          touched: false,
          visible: true,
          disable: false
        },
        ddlPurchaseordercurrency: {
          value: props!==undefined && props.ddlPurchaseordercurrency!==undefined?props.ddlPurchaseordercurrency:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            minLength: true,
            isName: true
          },
          error: "Please enter purchase order currency",
          placeholder: "Purchase Order Currency",
          touched: false,
          visible: true,
          disable: false
        },
        ddlPartnerBankType: {
          value: props!==undefined && props.ddlPartnerBankType!==undefined?props.ddlPartnerBankType:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            minLength: true,
            isName: true
          },
          error: "Please enter partner bank type",
          placeholder: "Partner Bank Type",
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
    this.props.dispatch(onboardActions.changeParticipant(key,value));   
  }

  render() {
    return (
      <div className="mx-auto">
        <h2 className="reg-heading">Account Details</h2>
        <div className="form-row">
        <div className="col-md-12 mb-3">
            <TextField
              id="txtNameBank"
              name="txtNameBank"
              label="Name of Bank"
              value={this.state.controls.txtNameBank.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
        </div>
        <div className="form-row">   
          <div className="col-md-8 mb-3 ">
            <TextField
              id="txtAccountHolderName"
              name="txtAccountHolderName"
              label="Account Holder Name"
              value={this.state.controls.txtAccountHolderName.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="txtAccountNumber"
              name="txtAccountNumber"
              label="Account Number"
              value={this.state.controls.txtAccountNumber.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <TextField
              id="txtBankControlKey"
              name="txtBankControlKey"
              label="Bank Control Key"
              value={this.state.controls.txtBankControlKey.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="txtBankcountrykey"
              name="txtBankcountrykey"
              label="Bank country key"
              className="form-control"
              value={this.state.controls.txtBankcountrykey.value}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="txtBankkey"
              name="txtBankkey"
              label="Bank key"
              value={this.state.controls.txtBankkey.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3 ">
            <FormControl style={{ width: '100%'}}> 
              <TextField
                select
                id='ddlPartnerBankType'
                variant="outlined"
                name='ddlPartnerBankType'
                label="Partner Bank Type"
                className="form-control"
                value={this.state.controls.ddlPartnerBankType.value}
                onChange={this.handleChange}
                margin="dense"
              >
                {ddlPartnerBankType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="col-md-8 mb-3 ">
            <TextField
              id="txtReferencespecificationsforbankdetails"
              name="txtReferencespecificationsforbankdetails"
              label="Reference specifications for bank"
              value={this.state.controls.txtReferencespecificationsforbankdetails.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
            />
          </div>
          <div className="col-md-4">
            <FormControl style={{ width: '100%'}}> 
              <TextField
                select
                id='ddlPurchaseordercurrency'
                variant="outlined"
                name='ddlPurchaseordercurrency'
                label="Purchase Order Currency"
                className="form-control"
                value={this.state.controls.ddlPurchaseordercurrency.value}
                onChange={this.handleChange}
                margin="dense"
              >
                {ddlCurr.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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

const connectedAccountDetailForm = connect(mapStateToProps)(AccountDetailForm);
export { connectedAccountDetailForm as AccountDetailForm };
