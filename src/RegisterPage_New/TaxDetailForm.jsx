import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, Checkbox, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';
import { validate } from '../_helpers';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import $ from 'jquery';
window.jQuery = $; // hack
window.$ = $;      // hack 
import 'bootstrap';
import { Table_Config } from '../_helpers';

const taxData = [{
    "taxType": "EIA",
    "taxNumber": "12345"
},
{
    "taxType": "VAT",
    "taxNumber": "78901"
}]
const withHodingtaxTypeIndicator = {
    data: [
        {
            value: "",
            label: "None"
        }, {
            value: "Tax at Source",
            label: "Tax at Source"
        }
    ],
}

class TaxDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.taxInfo);
        this.handleAddtaxInfo = this.handleAddtaxInfo.bind(this);
        this.handleSavetaxInfo = this.handleSavetaxInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            showAddTaxInfo: false,
            filedsetTitle: 'Add Tax Info',
            taxData: [{
                "id": 1,
                "taxType": "EIA",
                "taxNumber": "12345"
            },
            {
                "id": 2,
                "taxType": "VAT",
                "taxNumber": "78901"
            }],
            updateItem: false,
            updateItemId: '',
            controls: {
                taxType: {
                    value: props !== undefined && props.taxType !== undefined ? props.taxType : '',

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter Tax Type",
                    placeholder: "Tax Type",
                    touched: false,
                    visible: true,
                    disable: false
                },
                taxNumber: {
                    value: props !== undefined && props.taxNumber !== undefined ? props.taxNumber : '',

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter Tax Number",
                    placeholder: "Tax Number",
                    touched: false,
                    visible: true,
                    disable: false
                },
                withHodingtaxTypeIndicator: {
                    value: props !== undefined && props.withHodingtaxTypeIndicator !== undefined ? props.withHodingtaxTypeIndicator : '',

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter withholding Tax Type Indicator",
                    placeholder: "Tax Type Indicator",
                    touched: false,
                    visible: true,
                    disable: false
                },
                withHodingtaxCode: {
                    value: props !== undefined && props.withHodingtaxCode !== undefined ? props.withHodingtaxCode : '',

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please enter withholding Tax Code",
                    placeholder: "Tax Code",
                    touched: false,
                    visible: true,
                    disable: false
                },
                withholdingTaxCheckbox: {
                    value: props !== undefined && props.withholdingTaxCheckbox !== undefined ? props.withholdingTaxCheckbox : false,

                    validationRules: {
                        notEmpty: true,

                    },
                    error: "Please select withholding Tax",
                    placeholder: "Subject to withholding tax ?",
                    touched: false,
                    visible: true,
                    disable: false
                },
            },

        }
        return state;
    }
    handleAddtaxInfo() {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    taxType: {
                        ...prevState.controls['taxType'],
                        value: '',
                    },
                    taxNumber: {
                        ...prevState.controls['taxNumber'],
                        value: '',
                    }
                },
                filedsetTitle: 'Add Tax Info',
                showAddTaxInfo: true
            };
        });
    }
    handleSavetaxInfo() {

        let taxTypeVal = this.state.controls.taxType.value;
        let taxNumberVal = this.state.controls.taxNumber.value;

        let valid = true;

        if (taxTypeVal === undefined || taxTypeVal == '' || taxTypeVal.length < 1) {
            valid = false;
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        taxType: {
                            ...prevState.controls['taxType'],
                            valid: false,
                        }
                    }
                };
            });
        }

        if (taxNumberVal === undefined || taxNumberVal == '' || taxNumberVal.length < 1) {
            valid = false;
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        taxNumber: {
                            ...prevState.controls['taxNumber'],
                            valid: false,
                        }
                    }
                };
            });
        }

        if (valid) {
            let id = Math.random()
            let { taxData } = this.state;

            

            if(!this.state.updateItem){
                let taxDataItem = {
                    "id":id,
                    "taxType": taxTypeVal,
                    "taxNumber": taxNumberVal
                };
                taxData.push(taxDataItem);
            }else{
               let index = taxData.findIndex(x => x.id == this.state.updateItemId);
                taxData[index].taxType = taxTypeVal;
                taxData[index].taxNumber = taxNumberVal;
            }

            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        taxType: {
                            ...prevState.controls['taxType'],
                            value: '',
                            valid: true,
                        },
                        taxNumber: {
                            ...prevState.controls['taxNumber'],
                            value: '',
                            valid: true,
                        }
                    },
                    taxData: taxData,
                    updateItem: false,
                    updateItemId: '',
                };
            });
        }

    }


    editTaxInfo(e, row) {
        console.log("Selected Item id ", row.id);
        this.setState({
            updateItem: true,
            updateItemId: row.id,
            showAddTaxInfo: true
        })
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    taxType: {
                        ...prevState.controls['taxType'],
                        value: row.taxType,
                    },
                    taxNumber: {
                        ...prevState.controls['taxNumber'],
                        value: row.taxNumber,
                    }
                },
                filedsetTitle: 'Edit Tax Info',
                showAddTaxInfo: true
            };
        });

    }
    handleChange(event) {
        let key = event.target.name;
        let value = event.target.name === 'withholdingTaxCheckbox' ? !(event.target.value == 'true' ? true : false) : event.target.value;
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: true,
                        touched: true
                    }
                }
            };
        });

    }
    render() {
        return (
            <div className="mx-auto" onLoad={this.props.onPageLoad}>
                <h2 className="reg-heading">Tax Details<span style={{ float: 'right', verticalAlign: 'bottom', fontSize: '13px', padding: '11px 0 0 0' }}>All fields are mandatory</span></h2>
                <Fragment>
                    <div className="form-row register-tax-details">
                        <div className='register-add-tax'>
                            <Button
                                variant="contained"
                                onClick={(e) => this.handleAddtaxInfo(e)}>Add Tax Info
                            </Button>
                        </div>
                    </div>
                    {this.state.showAddTaxInfo && <div className='register-tax-form'>
                        <fieldset className='tax-details-filedset'>
                            <legend className='tax-details-legend'>{this.state.filedsetTitle}</legend>
                            <div className='register-add-tax col-md-12 p0'>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <TextField
                                            id="taxType"
                                            name="taxType"
                                            label="Tax Type"
                                            value={this.state.controls.taxType.value}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            margin="dense"
                                            variant="outlined"
                                            error={!this.state.controls.taxType.valid && this.state.controls.taxType.touched}


                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <TextField
                                            id="taxNumber"
                                            name="taxNumber"
                                            label="Tax Number"
                                            value={this.state.controls.taxNumber.value}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            margin="dense"
                                            variant="outlined"
                                            error={!this.state.controls.taxNumber.valid && this.state.controls.taxNumber.touched}


                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Button
                                            variant="contained"
                                            onClick={(e) => this.handleSavetaxInfo(e)}>Save
                                       </Button>
                                    </div>
                                </div>

                            </div>
                        </fieldset>
                    </div>}
                    <div className='form-row register-taxform-table mb-3'>
                        <ReactTable
                            data={this.state.taxData || []}
                            columns={Table_Config.RegisterTaxInfoTable.RegisterTaxInfoTableRecords.columns({ editTaxInfo: this.editTaxInfo.bind(this) })}
                            {...Table_Config.RegisterTaxInfoTable.RegisterTaxInfoTableRecords.options}
                        />
                    </div>
                    <div className="form-row">
                        <div className="col-md-5">
                            <TextField
                                select
                                id="withHodingtaxTypeIndicator"
                                name="withHodingtaxTypeIndicator"
                                label="withholding Tax Type Indicator"
                                value={this.state.controls.withHodingtaxTypeIndicator.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                                variant="outlined"
                                error={!this.state.controls.withHodingtaxTypeIndicator.valid && this.state.controls.withHodingtaxTypeIndicator.touched}
                            >
                                {withHodingtaxTypeIndicator && withHodingtaxTypeIndicator.data.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-md-3">
                            <TextField
                                id="withHodingtaxCode"
                                name="withHodingtaxCode"
                                label="withholding Tax Code"
                                value={this.state.controls.withHodingtaxCode.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                                variant="outlined"
                                error={!this.state.controls.withHodingtaxCode.valid && this.state.controls.withHodingtaxCode.touched}
                            />
                        </div>
                        <div className="col-md-4 p8">
                            <FormControlLabel
                                control={<Checkbox
                                    icon={<CircleUnchecked className="checkboxIcon" />}
                                    checkedIcon={<CircleCheckedFilled
                                        className="checkboxIcon" />}
                                    onChange={this.handleChange}
                                    name="withholdingTaxCheckbox"
                                    checked={this.state.controls.withholdingTaxCheckbox.value}
                                    value={this.state.controls.withholdingTaxCheckbox.value}
                                    disabled={this.state.controls.withholdingTaxCheckbox.disable}
                                />}
                                label={this.state.controls.withholdingTaxCheckbox.placeholder}
                                className="form-checkbox"
                                name="withholdingTaxCheckbox"

                            />
                        </div>

                    </div>
                </Fragment>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { taxInfo } = state;

    return {
        taxInfo
    };
}

const connectedTaxDetailForm = connect(mapStateToProps)(TaxDetailForm);
export { connectedTaxDetailForm as TaxDetailForm };
