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
import {Common_JsonData} from '../_helpers';

// const bankPartnerType = [
//   {
//       value: "",
//       label: "None"
//   },
//   {
//       value: "IMF",
//       label: "IMF"
//   },
//   {
//       value: "WB",
//       label: "WB"
//   },

// ];
// const ddlCurr = [
//   {
//       value: "",
//       label: "None"
//   },
//   {
//       value: "USD",
//       label: "USD"
//   },
//   {
//     value: "CAN$",
//     label: "CAN $"
// },
//   {
//       value: "MEX$",
//       label: "MEX $"
//   },

// ];

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
    ["bankName","bankAccountName","bankAccountNumber","bankControlKey"
    ,"poCurrency"].forEach(name => {
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

  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        bankName: {
          value: props!==undefined && props.bankName!==undefined?props.bankName:'',

          valid: this.props.onboard.isAccountFormValid?true:false,
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

          valid: this.props.onboard.isAccountFormValid?true:false,
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

          valid: this.props.onboard.isAccountFormValid?true:false,
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

          valid: this.props.onboard.isAccountFormValid?true:false,
          validationRules: {
            notEmpty: true,
          },
          error: "Please enter bank routing number",
          placeholder: "Bank Routing Number",
          touched: false,
          visible: true,
          disable: false
        },
        poCurrency: {
          value: props!==undefined && props.poCurrency!==undefined?props.poCurrency:'',

          valid: this.props.onboard.isAccountFormValid?true:false,
          validationRules: {
            notEmpty: true,

          },
          error: "Please enter purchase order currency",
          placeholder: "Purchase Order Currency",
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
    this.setState(prevState => ({

        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid:true,
            // valid: validate(
            //   value,
            //   prevState.controls[key].validationRules,
            //   connectedValue,
            //   key
            // ),
            touched: true
          }
        }
    }),()=>
    //  this.handleFormSubmit()
    console.log("Account page")
    );
     this.props.dispatch(onboardActions.changeParticipant(key,value));

  }
  handleFormSubmit(){
    let isFormVaild=true;
   if (this.state.controls !== undefined) {
    ["bankName","bankAccountName","bankAccountNumber","bankControlKey"
    ,"poCurrency"].forEach(name => {
         let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
         if (!value && this.props.onboard.mode==='create') {

          isFormVaild=false;
         }
         else if(!value && touched && this.props.onboard.mode!=='create'){

          isFormVaild=false;
         }

       });
    }
    this.props.dispatch(onboardActions.changeFormState('isAccountFormVaild',isFormVaild));
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
        {/* <h2 className="reg-heading">Account Details<span style={{float:'right',verticalAlign:'bottom',fontSize:'13px',padding: '11px 0 0 0'}}>All fields are mandatory</span></h2> */}
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


            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3 ">
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


            />
          </div>
          <div className="col-md-4 mb-3">
            <TextField
              id="bankControlKey"
              name="bankControlKey"
              label="Routing Number"
              value={this.state.controls.bankControlKey.value}
              onChange={this.handleChange}
              className="form-control"
              margin="dense"
              variant="outlined"
              error={!this.state.controls.bankControlKey.valid && this.state.controls.bankControlKey.touched}

            />
          </div>
        </div>
        <div className="form-row">
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
                {Common_JsonData.Currency && Common_JsonData.Currency.map(option => (
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
