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

const ddlVendorAccountGroup = [
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

class TaxDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.onboard.participant);
        this.handleChange = this.handleChange.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = { 
            controls: {
                txtTaxNum1: {
                    value: props!==undefined && props.txtTaxNum1!==undefined?props.txtTaxNum1:'',
          
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
                txtTaxNum2: {
                    value: props!==undefined && props.txtTaxNum2!==undefined?props.txtTaxNum2:'',
          
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
                txtVatRegistration: {
                    value: props!==undefined && props.txtVatRegistration!==undefined?props.txtVatRegistration:'',
          
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

                ddlVendorAccountGroup: {
                    value: props!==undefined && props.ddlVendorAccountGroup!==undefined?props.ddlVendorAccountGroup:'',
          
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
                txtVendorImporterRecord: {
                    value: props!==undefined && props.txtVendorImporterRecord!==undefined?props.txtVendorImporterRecord:'',
          
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
                radioTaxType: {
                    value: props!==undefined && props.radioTaxType!==undefined?props.radioTaxType:'',
          
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
                radioSubjectTax: {
                    value: props!==undefined && props.radioSubjectTax!==undefined?props.radioSubjectTax:'',
          
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
                txtWithholdingTaxCode: {
                    value: props!==undefined && props.txtWithholdingTaxCode!==undefined?props.txtWithholdingTaxCode:'',
          
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
                txtConfirmationControlKey: {
                    value: props!==undefined && props.txtConfirmationControlKey!==undefined?props.txtConfirmationControlKey:'',
          
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
                txtDeleteKey: {
                    value: props!==undefined && props.txtDeleteKey!==undefined?props.txtDeleteKey:'',
          
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
                txtShippingConditions: {
                    value: props!==undefined && props.txtShippingConditions!==undefined?props.txtShippingConditions:'',
          
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
                radioGSTHSTVerification: {
                    value: props!==undefined && props.radioGSTHSTVerification!==undefined?props.radioGSTHSTVerification:'',
          
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
                radioSalesTaxExemption: {
                    value: props!==undefined && props.radioSalesTaxExemption!==undefined?props.radioSalesTaxExemption:'',
          
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
                radioQSTVerification: {
                    value: props!==undefined && props.radioQSTVerification!==undefined?props.radioQSTVerification:'',
          
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
                radioFormW9Verification: {
                    value: props!==undefined && props.radioFormW9Verification!==undefined?props.radioFormW9Verification:'',
          
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
                            id="txtTaxNum1"
                            name="txtTaxNum1"
                            label={this.state.controls.txtTaxNum1.placeholder}
                            value={this.state.controls.txtTaxNum1.value}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder={this.state.controls.txtTaxNum1.value}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtTaxNum2"
                            margin="dense"
                            name="txtTaxNum2"
                            label={this.state.controls.txtTaxNum2.placeholder}
                            value={this.state.controls.txtTaxNum2.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.txtTaxNum2.value}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtVatRegistration"
                            margin="dense"
                            name="txtVatRegistration"
                            label={this.state.controls.txtVatRegistration.placeholder}
                            value={this.state.controls.txtVatRegistration.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.txtVatRegistration.value}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <FormControl style={{ width: '100%' }}>
                            <TextField
                                select
                                id='ddlVendorAccountGroup'
                                variant="outlined"
                                name='ddlVendorAccountGroup'
                                label="Vendor Account Group"
                                value={this.state.controls.ddlVendorAccountGroup.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                            >
                                {ddlVendorAccountGroup.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="col-md-8 mb-3">
                        <TextField
                            id="txtVendorImporterRecord"
                            margin="dense"
                            variant="outlined"
                            name="txtVendorImporterRecord"
                            label={this.state.controls.txtVendorImporterRecord.placeholder}
                            value={this.state.controls.txtVendorImporterRecord.value}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder={this.state.controls.txtVendorImporterRecord.value}
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
                            id="txtWithholdingTaxCode"
                            margin="dense"
                            name="txtWithholdingTaxCode"
                            label={this.state.controls.txtWithholdingTaxCode.placeholder}
                            value={this.state.controls.txtWithholdingTaxCode.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.txtWithholdingTaxCode.value}
                        /></div>
                </div>
                <div className="form-row">
                    <div className="col-md-7 mb-3">
                        <TextField
                            id="txtConfirmationControlKey"
                            margin="dense"
                            name="txtConfirmationControlKey"
                            label={this.state.controls.txtConfirmationControlKey.placeholder}
                            value={this.state.controls.txtConfirmationControlKey.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.txtConfirmationControlKey.value}
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
                            id="txtShippingConditions"
                            margin="dense"
                            name="txtShippingConditions"
                            label={this.state.controls.txtShippingConditions.placeholder}
                            value={this.state.controls.txtShippingConditions.value}
                            onChange={this.handleChange}
                            className="form-control"
                            variant="outlined"
                            placeholder={this.state.controls.txtShippingConditions.placeholder}
                        />
                    </div>
                </div>
                <div className="form-row">
                <FormLabel component="legend">Reminders</FormLabel>
                    <div className="col-md-4 mb-3">
                       
                        <FormControlLabel
                            control={<Checkbox icon={<CircleUnchecked className="checkboxIcon"/>} checkedIcon={<CircleCheckedFilled className="checkboxIcon"/>} value="checkedH" />}
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
