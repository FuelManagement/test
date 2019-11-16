import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Select, InputLabel, MenuItem, FormControl, Radio, Button } from '@material-ui/core';
import { validate } from '../_helpers';



class TaxDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this.props.onboard.participant);
        this.handleAddtaxInfo = this.handleAddtaxInfo.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            showAddTaxInfo: false
        };
        return state;
    }
    handleAddtaxInfo() {
        this.setState({ showAddTaxInfo: true })
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
                            <legend className='tax-details-legend'>Add Tax Info</legend>
                            <div className='register-add-tax'>
                            <Button
                                variant="contained"
                                onClick={(e) => this.handleAddtaxInfo(e)}>Save
                            </Button>
                        </div>
                        </fieldset>
                    </div>}
                </Fragment>

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
