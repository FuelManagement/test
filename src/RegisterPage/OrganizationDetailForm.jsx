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
    componentWillReceiveProps(nextprops)
  {
  if(JSON.stringify(this.props.onboard.participant)!==JSON.stringify(nextprops.onboard.participant))
  {
    ["registerId","dateOfIncorporation","stateOfIncorporation","countryOfIncorporation","BuisnessType","entityType","entityTypeOther"
    ,"numberOfYearsinBuisness","emailAddress","companyCode"].forEach(name => {
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
        if(this.props.onboard.participant===undefined){
        this.props.dispatch(onboardActions.changeModeParticipant('create'));  
        }
    }

    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                registerId: {
                    value: props!==undefined && props.registerId!==undefined?props.registerId:'',
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
                BuisnessType: {
                    value: props!==undefined && props.BuisnessType!==undefined?props.BuisnessType:'',
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
                numberOfYearsinBuisness: {
                    value: props!==undefined && props.numberOfYearsinBuisness!==undefined?props.numberOfYearsinBuisness:'',
                   
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
                dateOfIncorporation: {
                    value: props!==undefined && props.dateOfIncorporation!==undefined?props.dateOfIncorporation:new Date(),
                    
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

                stateOfIncorporation: {
                    value: props!==undefined && props.stateOfIncorporation!==undefined?props.stateOfIncorporation:'',
                   
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
                countryOfIncorporation: {
                    value: props!==undefined && props.countryOfIncorporation!==undefined?props.countryOfIncorporation:'',
                   
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
                entityType: {
                    value: props!==undefined && props.entityType!==undefined?props.entityType:'',
                   
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
                entityTypeOther: {
                    value: props!==undefined && props.entityTypeOther!==undefined?props.entityTypeOther:'',
                   
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
                emailAddress: {
                    value: props!==undefined && props.emailAddress!==undefined?props.emailAddress:'',
                   
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
                companyCode: {
                    value: props!==undefined && props.companyCode!==undefined?props.companyCode:'',
                   
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
                            id="registerId"
                            label="Full Legal Name"
                            name="registerId"
                            value={this.state.controls.registerId.value}
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
                                id='BuisnessType'
                                variant="outlined"
                                name='BuisnessType'
                                label="Business Type"
                                value={this.state.controls.BuisnessType.value}
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
                            id="numberOfYearsinBuisness"
                            label="Number of Years in Business"
                            name="numberOfYearsinBuisness"
                            value={this.state.controls.numberOfYearsinBuisness.value}
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

                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3 ">
                        <FormControl style={{ width: '100%' }}>
                            <TextField
                                select
                                id='entityType'
                                variant="outlined"
                                name='entityType'
                                label="Entity Type"
                                value={this.state.controls.entityType.value}
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
                            id="entityTypeOther"
                            label="Entity Type - Other"
                            name="entityTypeOther"
                            value={this.state.controls.entityTypeOther.value}
                            onChange={this.handleChange}
                            variant="outlined"
                            className="form-control"
                            autoComplete="off"
                            margin="dense"

                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            id="emailAddress"
                            label="E-Mail Address"
                            name="emailAddress"
                            value={this.state.controls.emailAddress.value}
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
                            id="companyCode"
                            label="Company Code"
                            name="companyCode"
                            value={this.state.controls.companyCode.value}
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
