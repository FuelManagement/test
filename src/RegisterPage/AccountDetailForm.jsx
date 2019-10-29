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
const poCurrency = [
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
const bankPartnerType = [
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
     }
  UNSAFE_componentWillReceiveProps(nextprops)
  {
  if(JSON.stringify(this.props.onboard.participant)!==JSON.stringify(nextprops.onboard.participant))
  {
    ["bankName","bankAccountName","bankAccountNumber","bankControlKey","bankCountryKey","bankKeys","bankPartnerType"
    ,"bankReferencedetail","poCurrency"].forEach(name => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            [name]: {
              ...prevState.controls[name],
              value: name ==='productStatus'?!(nextprops.onboard.participant[name]=='true'?true:false):(nextprops.onboard.participant[name]!==undefined?nextprops.onboard.participant[name]:''), 
            
            }
          }
        }
      });
    });
  
  }}
  componentDidMount(){
    this.handleFormSubmit();
  }
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        bankName: {
          value: props!==undefined && props.bankName!==undefined?props.bankName:'',
                   
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
        bankAccountName: {
          value: props!==undefined && props.bankAccountName!==undefined?props.bankAccountName:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            isName:true
          },
          error: "Please enter account holder name",
          placeholder: "Account Holder Name",
          touched: false,
          visible: true,
          disable: false
        },
        bankAccountNumber: {
          value: props!==undefined && props.bankAccountNumber!==undefined?props.bankAccountNumber:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
            isNumber:true
          },
          error: "Please enter account name",
          placeholder: "AccountNumber",
          touched: false,
          visible: true,
          disable: false
        },

        bankControlKey: {
          value: props!==undefined && props.bankControlKey!==undefined?props.bankControlKey:'',
                   
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
        bankCountryKey: {
          value: props!==undefined && props.bankCountryKey!==undefined?props.bankCountryKey:'',
                   
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
        bankKeys: {
          value: props!==undefined && props.bankKeys!==undefined?props.bankKeys:'',
                   
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
        bankReferencedetail: {
          value: props!==undefined && props.bankReferencedetail!==undefined?props.bankReferencedetail:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter reference specifications for bank details",
          placeholder: "Reference specifications for bank details",
          touched: false,
          visible: true,
          disable: false
        },
        poCurrency: {
          value: props!==undefined && props.poCurrency!==undefined?props.poCurrency:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,

          },
          error: "Please enter purchase order currency",
          placeholder: "Purchase Order Currency",
          touched: false,
          visible: true,
          disable: false
        },
        bankPartnerType: {
          value: props!==undefined && props.bankPartnerType!==undefined?props.bankPartnerType:'',
                   
          valid: false,
          validationRules: {
            notEmpty: true,
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
    this.props.dispatch(onboardActions.changeParticipant(key,value));   
    this.handleFormSubmit();
  }
  handleFormSubmit(){
    let isFormVaild=true;
   if (this.state.controls !== undefined) {
    ["bankName","bankAccountName","bankAccountNumber","bankControlKey","bankCountryKey","bankKeys","bankPartnerType"
    ,"bankReferencedetail","poCurrency"].forEach(name => {
         let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
         if (!value && this.props.onboard.mode==='create') {
         
          isFormVaild=false;
         }
         else if(!value && touched && this.props.onboard.mode!=='create'){
         
          isFormVaild=false;
         }
         
       });
    }
    this.props.dispatch(onboardActions.changeFormState(isFormVaild));
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
        <h2 className="reg-heading">Account Details</h2>
        <div className="form-row">
        <div className="col-md-12 mb-3">
            <TextField
              id="bankName"
              name="bankName"
              label="Name of Bank"
              value={this.state.controls.bankName.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankName.valid && this.state.controls.bankName.touched}
              onKeyPress={this.allowOnlyletters.bind(this)}    
              inputProps={{ maxLength: 50 }}
            />
          </div>
        </div>
        <div className="form-row">   
          <div className="col-md-8 mb-3 ">
            <TextField
              id="bankAccountName"
              name="bankAccountName"
              label="Account Holder Name"
              value={this.state.controls.bankAccountName.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankAccountName.valid && this.state.controls.bankAccountName.touched}
              onKeyPress={this.allowOnlyletters.bind(this)}
              inputProps={{ maxLength: 50 }}
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="bankAccountNumber"
              name="bankAccountNumber"
              label="Account Number"
              value={this.state.controls.bankAccountNumber.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankAccountNumber.valid && this.state.controls.bankAccountNumber.touched}
              onKeyPress={this.allowOnlynumbers.bind(this)}
              inputProps={{ maxLength: 50 }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <TextField
              id="bankControlKey"
              name="bankControlKey"
              label="Bank Control Key"
              value={this.state.controls.bankControlKey.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankControlKey.valid && this.state.controls.bankControlKey.touched}
              inputProps={{ maxLength: 50 }}           
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="bankCountryKey"
              name="bankCountryKey"
              label="Bank country key"
              className="form-control"
              value={this.state.controls.bankCountryKey.value}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankCountryKey.valid && this.state.controls.bankCountryKey.touched}
              inputProps={{ maxLength: 50 }}
            />
          </div>
          <div className="col-md-4 mb-3 ">
            <TextField
              id="bankKeys"
              name="bankKeys"
              label="Bank key"
              value={this.state.controls.bankKeys.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankKeys.valid && this.state.controls.bankKeys.touched}
              inputProps={{ maxLength: 50 }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3 ">
            <FormControl style={{ width: '100%'}}> 
              <TextField
                select
                id='bankPartnerType'
                variant="outlined"
                name='bankPartnerType'
                label="Partner Bank Type"
                className="form-control"
                value={this.state.controls.bankPartnerType.value}
                onChange={this.handleChange}
                margin="dense"
                error={!this.state.controls.bankPartnerType.valid && this.state.controls.bankPartnerType.touched}
           
              >
                {bankPartnerType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="col-md-8 mb-3 ">
            <TextField
              id="bankReferencedetail"
              name="bankReferencedetail"
              label="Reference specifications for bank"
              value={this.state.controls.bankReferencedetail.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankReferencedetail.valid && this.state.controls.bankReferencedetail.touched}
              inputProps={{ maxLength: 100 }}                  
            />
          </div>
          <div className="col-md-4">
            <FormControl style={{ width: '100%'}}> 
              <TextField
                select
                id='poCurrency'
                variant="outlined"
                name='poCurrency'
                label="Purchase Order Currency"
                className="form-control"
                value={this.state.controls.poCurrency.value}
                onChange={this.handleChange}
                margin="dense"
                error={!this.state.controls.poCurrency.valid && this.state.controls.poCurrency.touched}
           
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
