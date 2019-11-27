import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl,FormControlLabel,Checkbox } from '@material-ui/core';
import { validate, dateutility, formatutility } from '../_helpers';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { onboardActions } from '../_actions';
import { Common_JsonData } from '../_helpers'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
const businessRange = [
    {
        value: "",
        label: "None"
    },
    {
        value: "LLC",
        label: "LLC"
    },
    {
        value: "LLP",
        label: "LLP"
    },

];

class OrganizationDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.onboard.participant);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextprops) {
        if (JSON.stringify(this.props.onboard.participant) !== JSON.stringify(nextprops.onboard.participant)) {
            ["domain", "dateOfIncorporation", "stateOfIncorporation", "countryOfIncorporation", "BuisnessType", "participantType", "entityTypeOther"
                , "registerId"].forEach(name => {
                    this.setState(prevState => {
                        return {
                            controls: {
                                ...prevState.controls,
                                [name]: {
                                    ...prevState.controls[name],
                                    value: (nextprops.onboard.participant[name] !== undefined ? nextprops.onboard.participant[name] : ''),

                                }
                            }
                        }
                    });
                });
        }

    }
    componentDidMount() {
        if (this.props.onboard.participant === undefined) {
            this.props.dispatch(onboardActions.changeModeParticipant('create'));
        }

    }

    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                domain: {
                    value: props !== undefined && props.domain !== undefined ? props.domain : '',
                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                        //isName: true,
                        minLength: true,
                        maxLength: true
                    },
                    error: "Please enter full legal name",
                    placeholder: "Full Legal Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                BuisnessType: {
                    value: props !== undefined && props.BuisnessType !== undefined ? props.BuisnessType : '',
                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter business type",
                    placeholder: "Business Type",
                    touched: false,
                    visible: true,
                    disable: false
                },
                dateOfIncorporation: {
                    value: props !== undefined && props.dateOfIncorporation !== undefined ? props.dateOfIncorporation : new Date(),
                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of incorporation",
                    placeholder: "Date Of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },

                stateOfIncorporation: {
                    value: props !== undefined && props.stateOfIncorporation !== undefined ? props.stateOfIncorporation : '',

                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        maxLength: true
                    },
                    error: "Please enter state of incorporation",
                    placeholder: "State of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                countryOfIncorporation: {
                    value: props !== undefined && props.countryOfIncorporation !== undefined ? props.countryOfIncorporation : '',

                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        maxLength: true
                    },
                    error: "Please enter country of incorporation",
                    placeholder: "Country of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                participantType: {
                    value: props !== undefined && props.participantType !== undefined ? props.participantType : '',

                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter entity type",
                    placeholder: "ENTITY TYPE",
                    touched: false,
                    visible: true,
                    disable: false

                },
                entityTypeOther: {
                    value: props !== undefined && props.entityTypeOther !== undefined ? props.entityTypeOther : '',

                    valid: true,
                    validationRules: {
                        notEmpty: false,
                        minLength: true,
                        maxLength: true
                    },
                    error: "Please enter entity type- other",
                    placeholder: "Entity Type- Other",
                    touched: false,
                    visible: true,
                    disable: true
                },
                registerId: {
                    value: props !== undefined && props.registerId !== undefined ? props.registerId : '',

                    valid: this.props.onboard.isOrgFormValid ? true : false,
                    validationRules: {
                        notEmpty: true,
                        isEmail: true
                    },
                    error: "Please enter email address",
                    placeholder: "E-Mail Address",
                    touched: false,
                    visible: true,
                    disable: false
                },
                emailAddressCheckbox: {
                    value: props !== undefined && props.emailAddress !== undefined ? props.emailAddress : false,

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Mark this E-mail address is the default address",
                    placeholder: "Mark this E-mail address is the default address",
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
        let connectedValue = {
            domain: { minLength: 1, maxLength: 50 },
            entityTypeOther: { minLength: 1, maxLength: 50 },
            countryOfIncorporation: { minLength: 1, maxLength: 50 },
            stateOfIncorporation: { minLength: 1, maxLength: 50 },
        };
        if (key === 'participantType' && value.toLowerCase() === 'other') {
            this.updateFormState('entityTypeOther', '', connectedValue, false);
        }
        else if (key === 'participantType' && value.toLowerCase() !== 'other') {
            this.updateFormState('entityTypeOther', '', connectedValue, true, false, false);
        }
        this.updateFormState(key, value, connectedValue);

    }
    handleDateChange(date, key) {
        let connectedValue = {};
        this.updateFormState(key, dateutility.datefunction(date, formatutility.MMDDYYYY), connectedValue);
    }
    handleFormSubmit() {
        let isFormVaild = true;
        if (this.state.controls !== undefined) {
            ["domain", "dateOfIncorporation", "stateOfIncorporation", "countryOfIncorporation", "BuisnessType", "participantType", "entityTypeOther"
                , "registerId"].forEach(name => {
                    let value = this.state.controls[name].valid, touched = this.state.controls[name].touched;
                    if (!value && this.props.onboard.mode === 'create') {

                        isFormVaild = false;
                    }
                    else if (!value && touched && this.props.onboard.mode !== 'create') {

                        isFormVaild = false;
                    } else {
                        isFormVaild = true;
                    }

                });
        }

        this.props.dispatch(onboardActions.changeFormState('isFormVaild', isFormVaild));
        this.props.dispatch(onboardActions.changeFormState('isOrgFormVaild', isFormVaild));
    }
    updateFormState(key, value, connectedValue, disable = false, touched = true, validCheck = true) {
        this.setState(prevState => ({
            controls: {
                ...prevState.controls,
                [key]: {
                    ...prevState.controls[key],
                    value: value,
                    // valid: validCheck ? validate(
                    //     value,
                    //     prevState.controls[key].validationRules,
                    //     connectedValue,
                    //     key
                    // ) : true,
                    valid:true,
                    disable: disable,
                    touched: touched
                }
            }
        }),()=> 
        {}
        );
         this.props.dispatch(onboardActions.changeParticipant(key, value));

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
            <div className="mx-auto organization">
                {/* <h2 className="reg-heading">Organization Information<span style={{ float: 'right', verticalAlign: 'bottom', fontSize: '13px', padding: '11px 0 0 0' }}>All fields are mandatory</span></h2> */}
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="domain"
                            label="Full Legal Name"
                            name="domain"
                            value={this.state.controls.domain.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                            error={!this.state.controls.domain.valid && this.state.controls.domain.touched}

                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                id='BuisnessType'
                                variant="outlined"
                                name='BuisnessType'
                                label="Business Type"
                                value={this.state.controls.BuisnessType.value}
                                className="form-control"
                                onChange={this.handleChange}
                                margin="dense"
                                error={!this.state.controls.BuisnessType.valid && this.state.controls.BuisnessType.touched}

                            >
                                {businessRange.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="col-md-4  org-email-div">
                        <TextField
                            id="registerId"
                            label="E-Mail Address"
                            name="registerId"
                            value={this.state.controls.registerId.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                            error={!this.state.controls.registerId.valid && this.state.controls.registerId.touched}
                        />
                        <FormControlLabel
                                control={<Checkbox
                                    icon={<CircleUnchecked className="checkboxIcon" />}
                                    checkedIcon={<CircleCheckedFilled
                                        className="checkboxIcon" />}
                                    onChange={this.handleChange}
                                    name="emailAddressCheckbox"
                                    checked={this.state.controls.emailAddressCheckbox.value}
                                    value={this.state.controls.emailAddressCheckbox.value}
                                    disabled={this.state.controls.emailAddressCheckbox.disable}
                                />}
                                label={this.state.controls.emailAddressCheckbox.placeholder}
                                className="emil-ceckbox"
                                name="emailAddressCheckbox"

                            />
                    </div>

                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3 ">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker style={{ width: '100%' }}
                                clearable
                                inputProps={{
                                    name: 'dateOfIncorporation',
                                    id: 'dateOfIncorporation',
                                }}
                                inputVariant="outlined"
                                margin="dense"
                                label="Date of Incorporation"
                                value={this.state.controls.dateOfIncorporation.value}
                                onChange={(date) => { this.handleDateChange(date, 'dateOfIncorporation') }}
                                format="MM/dd/yyyy"
                            /></MuiPickersUtilsProvider>
                    </div>
                    <div className="col-md-4 mb-3 ">
                        <TextField
                            id="stateOfIncorporation"
                            label="State of Incorporation"
                            name="stateOfIncorporation"
                            value={this.state.controls.stateOfIncorporation.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                            error={!this.state.controls.stateOfIncorporation.valid && this.state.controls.stateOfIncorporation.touched}

                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="countryOfIncorporation"
                            label="Country of Incorporation"
                            name="countryOfIncorporation"
                            value={this.state.controls.countryOfIncorporation.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                            error={!this.state.controls.countryOfIncorporation.valid && this.state.controls.countryOfIncorporation.touched}

                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3 ">
                        <FormControl style={{ width: '100%' }}>
                            <TextField
                                select
                                id='participantType'
                                variant="outlined"
                                name='participantType'
                                label="Participant Type"
                                value={this.state.controls.participantType.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                                error={!this.state.controls.participantType.valid && this.state.controls.participantType.touched}

                            >
                                {Common_JsonData.EntitryType && Common_JsonData.EntitryType.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="col-md-4 mb-3 ">
                        <TextField
                            id="entityTypeOther"
                            label="Participant Type - Other"
                            name="entityTypeOther"
                            value={this.state.controls.entityTypeOther.value}
                            disabled={this.state.controls.entityTypeOther.disable}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                            error={!this.state.controls.entityTypeOther.valid && this.state.controls.entityTypeOther.touched}

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

const connectedOrganizationDetailForm = connect(mapStateToProps)(OrganizationDetailForm);
export { connectedOrganizationDetailForm as OrganizationDetailForm };
