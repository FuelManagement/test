import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel,Fab  } from '@material-ui/core';
import { validate } from '../_helpers';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {onboardActions} from '../_actions';

const vendorAcctGrp = [
    {
        value: "",
        label: "None"
    },
    {
        value: "10",
        label: "Exporter"
    },
    {
        value: "20",
        label: "Importer"
    },
    {
        value: "30",
        label: "Refinery"
    }
];

class TaxDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.onboard.participant);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextprops)
    {
    if(JSON.stringify(this.props.onboard.participant)!==JSON.stringify(nextprops.onboard.participant))
    {
      ["taxWithholdType","taxWithholdingSubject","taxWithholdCode","confirmationControlkey","deleteFlagForVendor","shippingConditions","gstHstReminder"
      ,"salesTaxExemption","qstVerificationReminder","w8-9VerificationReminder","taxNumber1","taxNumber2","vatNumber","vendorAcctGrp","vendorImporterRecord"].forEach(name => {
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
                taxNumber1: {
                    value: props!==undefined && props.taxNumber1!==undefined?props.taxNumber1:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter first tax number ",
                    placeholder: "Tax Number 1",
                    touched: false,
                    visible: true,
                    disable: false
                },
                taxNumber2: {
                    value: props!==undefined && props.taxNumber2!==undefined?props.taxNumber2:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter second tax number ",
                    placeholder: "Tax Number 2",
                    touched: false,
                    visible: true,
                    disable: false
                },
                vatNumber: {
                    value: props!==undefined && props.vatNumber!==undefined?props.vatNumber:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter vat registration",
                    placeholder: "Vat Registration #",
                    touched: false,
                    visible: true,
                    disable: false
                },

                vendorAcctGrp: {
                    value: props!==undefined && props.vendorAcctGrp!==undefined?props.vendorAcctGrp:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter vendor account group",
                    placeholder: "Vendor Account Group",
                    touched: false,
                    visible: true,
                    disable: false
                },
                vendorImporterRecord: {
                    value: props!==undefined && props.vendorImporterRecord!==undefined?props.vendorImporterRecord:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter vendor importer  of record",
                    placeholder: "Vendor Importer  of Record",
                    touched: false,
                    visible: true,
                    disable: false
                },
                taxWithholdType: {
                    value: props!==undefined && props.taxWithholdType!==undefined?props.taxWithholdType:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter indicator for withholding tax type",
                    placeholder: "Withholding tax type indicator",
                    touched: false,
                    visible: true,
                    disable: false
                },
                taxWithholdingSubject: {
                    value: props!==undefined && props.taxWithholdingSubject!==undefined?props.taxWithholdingSubject:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please specify whether subject to withholding tax.",
                    placeholder: "Subject to withholding tax?",
                    touched: false,
                    visible: true,
                    disable: false
                },
                taxWithholdCode: {
                    value: props!==undefined && props.taxWithholdCode!==undefined?props.taxWithholdCode:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter withholding tax code",
                    placeholder: "Withholding tax code",
                    touched: false,
                    visible: true,
                    disable: false
                },
                confirmationControlkey: {
                    value: props!==undefined && props.confirmationControlkey!==undefined?props.confirmationControlkey:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter confirmation control key",
                    placeholder: "Confirmation Control Key",
                    touched: false,
                    visible: true,
                    disable: false
                },
                deleteFlagForVendor: {
                    value: props!==undefined && props.deleteFlagForVendor!==undefined?props.deleteFlagForVendor:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter delete flag for vendor at purchasing level",
                    placeholder: "Delete flag for vendor at purchasing level",
                    touched: false,
                    visible: true,
                    disable: false
                },
                shippingConditions: {
                    value: props!==undefined && props.shippingConditions!==undefined?props.shippingConditions:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter shipping conditions",
                    placeholder: "Shipping Conditions",
                    touched: false,
                    visible: true,
                    disable: false
                },
                gstHstReminder: {
                    value: props!==undefined && props.gstHstReminder!==undefined?props.gstHstReminder:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter GST/HST # verification ",
                    placeholder: "GST/HST # Verification Reminder",
                    touched: false,
                    visible: true,
                    disable: false
                },
                salesTaxExemption: {
                    value: props!==undefined && props.salesTaxExemption!==undefined?props.salesTaxExemption:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter sales tax exemption",
                    placeholder: "Sales Tax Exemption Reminder",
                    touched: false,
                    visible: true,
                    disable: false
                },
                qstVerificationReminder: {
                    value: props!==undefined && props.qstVerificationReminder!==undefined?props.qstVerificationReminder:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter QST # verification reminder",
                    placeholder: "QST # Verification Reminder",
                    touched: false,
                    visible: true,
                    disable: false
                },
                "w8-9VerificationReminder": {
                    value: props!==undefined && props["w8-9VerificationReminder"]!==undefined?props["w8-9VerificationReminder"]:'',
          
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter form W-9 or W-8 verification",
                    placeholder: "Form W-9 or W-8 Verification Reminder",
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
            <div className="mx-auto" onLoad={this.props.onPageLoad}>
                <h2 className="reg-heading">Tax Details</h2>
                {
                    this.props.nextForm ?(
                        <Fragment>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="taxNumber1"
                            name="taxNumber1"
                            label={this.state.controls.taxNumber1.placeholder}
                            value={this.state.controls.taxNumber1.value}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder={this.state.controls.taxNumber1.value}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="taxNumber2"
                            margin="dense"
                            name="taxNumber2"
                            label={this.state.controls.taxNumber2.placeholder}
                            value={this.state.controls.taxNumber2.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.taxNumber2.value}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="vatNumber"
                            margin="dense"
                            name="vatNumber"
                            label={this.state.controls.vatNumber.placeholder}
                            value={this.state.controls.vatNumber.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.vatNumber.value}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <FormControl style={{ width: '100%' }}>
                            <TextField
                                select
                                id='vendorAcctGrp'
                                variant="outlined"
                                name='vendorAcctGrp'
                                label="Vendor Account Group"
                                value={this.state.controls.vendorAcctGrp.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                            >
                                {vendorAcctGrp.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="col-md-8 mb-3">
                        <TextField
                            id="vendorImporterRecord"
                            margin="dense"
                            variant="outlined"
                            name="vendorImporterRecord"
                            label={this.state.controls.vendorImporterRecord.placeholder}
                            value={this.state.controls.vendorImporterRecord.value}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder={this.state.controls.vendorImporterRecord.value}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3"> 
                        <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon" />} value="checkedH" />}
                            label="Withholding tax type indicator"
                            className="form-checkbox"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <FormControl component="fieldset" >
                            
                            <FormControlLabel
                                control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon" />} value="checkedH" />}
                                label="Subject to withholding tax"
                            className="form-checkbox"

                            />
                        </FormControl>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="taxWithholdCode"
                            margin="dense"
                            name="taxWithholdCode"
                            label={this.state.controls.taxWithholdCode.placeholder}
                            value={this.state.controls.taxWithholdCode.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.taxWithholdCode.value}
                        /></div>
                </div>
                <div className="form-row">
                    <div className="col-md-7 mb-3">
                        <TextField
                            id="confirmationControlkey"
                            margin="dense"
                            name="confirmationControlkey"
                            label={this.state.controls.confirmationControlkey.placeholder}
                            value={this.state.controls.confirmationControlkey.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.confirmationControlkey.value}
                        />
                    </div>
                    <div className="col-md-5 mb-3">
                        
                        <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled  className="checkboxIcon"/>} value="checkedH" />}
                            label="Delete flag for vendor at purchasing level"
                            className="form-checkbox"
                        />
                    </div>
                </div>
                <Fab color="primary"  onClick={this.props.extendTaxForm} size="small" className="arrowIcons">
                    <ArrowDownwardIcon />
                </Fab>
                </Fragment>
                    ):
                    (
                    <Fragment>         
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <TextField
                            id="shippingConditions"
                            margin="dense"
                            name="shippingConditions"
                            label={this.state.controls.shippingConditions.placeholder}
                            value={this.state.controls.shippingConditions.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.shippingConditions.placeholder}
                        />
                    </div>
                </div>
                <div className="form-row">
                <FormLabel component="legend">Reminders</FormLabel>
                    <div className="col-md-4 mb-3">
                       
                        <FormControlLabel
                            control={<Checkbox  icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon"/>} value="checkedH" />}
                            label="GST/HST # Verification"
                            className="form-checkbox"  
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                         
                        <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon"/>} value="checkedH" />}
                            label="Sales Tax Exemption"
                            className="form-checkbox"
                        />  
                    </div>
                    <div className="col-md-4">
                    <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon"/>} value="checkedH" />}
                            label="Form W-9 or W-8 Verification "
                            className="form-checkbox"
                        />  
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6">
                    <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon" />} value="checkedH" />}
                            label="QST # Verification "
                            className="form-checkbox"
                        />  
                    </div>
                     
                </div>
                <Fab color="primary"  
                onClick={this.props.hideTaxForm} size="small" className="arrowIcons">
                    <ArrowUpwardIcon />
                </Fab>
                </Fragment>
                 )}
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

const connectedTaxDetailForm = connect(mapStateToProps)(TaxDetailForm);
export { connectedTaxDetailForm as TaxDetailForm };
