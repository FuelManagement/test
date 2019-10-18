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
    {
        value: "30",
        label: "Thirty"
    }
],
entitryType=[ {
    value: "",
    label: "None"
},{
    value: "Exporter",
    label: "Exporter"
},
{
    value: "Importer",
    label: "Importer"
},
{
    value: "Refinery",
    label: "Refinery"
}];
class OrganizationDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.onboard.participant);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    componentDidMount(){
        if(this.props.onboard.participant===undefined){
        this.props.dispatch(onboardActions.changeModeParticipant('create'));  
        }
    }

    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                txtFullLegalName: {
                    value: props!==undefined && props.txtFullLegalName!==undefined?props.txtFullLegalName:'',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        isName: true
                    },
                    error: "Please enter full legal name",
                    placeholder: "Full Legal Name",
                    touched: false,
                    visible: true,
                    disable: false
                },
                ddlBusinessType: {
                    value: props!==undefined && props.ddlBusinessType!==undefined?props.ddlBusinessType:'',
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter business type",
                    placeholder: "Business Type",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtBusinessYear: {
                    value: props!==undefined && props.txtBusinessYear!==undefined?props.txtBusinessYear:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter number of years in business",
                    placeholder: "Number of Years in Business",
                    touched: false,
                    visible: true,
                    disable: false
                },
                dateIncorporation: {
                    value: props!==undefined && props.dateIncorporation!==undefined?props.dateIncorporation:new Date(),
                    
                    value: new Date(),
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter date Of incorporation",
                    placeholder: "Date Of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },

                txtStateIncorporation: {
                    value: props!==undefined && props.txtStateIncorporation!==undefined?props.txtStateIncorporation:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter state of incorporation",
                    placeholder: "State of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtCountryIncorporation: {
                    value: props!==undefined && props.txtCountryIncorporation!==undefined?props.txtCountryIncorporation:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter country of incorporation",
                    placeholder: "Country of Incorporation",
                    touched: false,
                    visible: true,
                    disable: false
                },
                ddlEntityType: {
                    value: props!==undefined && props.ddlEntityType!==undefined?props.ddlEntityType:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter entity type",
                    placeholder: "ENTITY TYPE",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtEntityType: {
                    value: props!==undefined && props.txtEntityType!==undefined?props.txtEntityType:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter entity type- other",
                    placeholder: "Entity Type- Other",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtEmailAddress: {
                    value: props!==undefined && props.txtEmailAddress!==undefined?props.txtEmailAddress:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                        minLength: true,
                        isName: true
                    },
                    error: "Please enter email address",
                    placeholder: "E-Mail Address",
                    touched: false,
                    visible: true,
                    disable: false
                },
                txtCompanyCode: {
                    value: props!==undefined && props.txtCompanyCode!==undefined?props.txtCompanyCode:'',
                   
                    valid: false,
                    validationRules: {
                        notEmpty: true,
                    },
                    error: "Please enter company code",
                    placeholder: "Company Code",
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
        console.log(event.target);
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
    handleDateChange(date, key) {

        let connectedValue = {};
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: date,
                        touched: true
                    }
                }
            };
        });
        this.props.dispatch(onboardActions.changeParticipant(key,date)); 
    }

    render() {

        return (
            <div className="mx-auto">
                <h2 className="reg-heading">Organization Information</h2>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtFullLegalName"
                            label="Full Legal Name"
                            name="txtFullLegalName"
                            value={this.state.controls.txtFullLegalName.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <FormControl style={{ width: "100%" }}>
                            <TextField
                                select
                                id='ddlBusinessType'
                                variant="outlined"
                                name='ddlBusinessType'
                                label="Business Type"
                                value={this.state.controls.ddlBusinessType.value}
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
                        </FormControl>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField type="number"
                            id="txtBusinessYear"
                            label="Number of Years in Business"
                            name="txtBusinessYear"
                            value={this.state.controls.txtBusinessYear.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3 ">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker style={{ width: '100%' }}
                                clearable
                                inputProps={{
                                    name: 'dateIncorporation',
                                    id: 'dateIncorporation',
                                }}
                                inputVariant="outlined"
                                margin="dense"
                                label="Date of Incorporation"
                                value={this.state.controls.dateIncorporation.value}
                                onChange={(date) => { this.handleDateChange(date, 'dateIncorporation') }}
                                format="MM/dd/yyyy"
                            /></MuiPickersUtilsProvider>
                    </div>
                    <div className="col-md-4 mb-3 ">
                        <TextField
                            id="txtStateIncorporation"
                            label="State of Incorporation"
                            name="txtStateIncorporation"
                            value={this.state.controls.txtStateIncorporation.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtCountryIncorporation"
                            label="Country of Incorporation"
                            name="txtCountryIncorporation"
                            value={this.state.controls.txtCountryIncorporation.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3 ">
                        <FormControl style={{ width: '100%' }}>
                            <TextField
                                select
                                id='ddlEntityType'
                                variant="outlined"
                                name='ddlEntityType'
                                label="Entity Type"
                                value={this.state.controls.ddlEntityType.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                            >
                                {entitryType.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="col-md-4 mb-3 ">
                        <TextField
                            id="txtEntityType"
                            label="Entity Type - Other"
                            name="txtEntityType"
                            value={this.state.controls.txtEntityType.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtEmailAddress"
                            label="E-Mail Address"
                            name="txtEmailAddress"
                            value={this.state.controls.txtEmailAddress.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="txtCompanyCode"
                            label="Company Code"
                            name="txtCompanyCode"
                            value={this.state.controls.txtCompanyCode.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            // margin="normal"
                            margin="dense"
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
