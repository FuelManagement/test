import React from 'react';
import { Table_Config } from '../../_helpers';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Checkbox, Select, FormControl, FormHelperText, FormControlLabel, MenuItem, InputLabel } from '@material-ui/core';
import {Common_JsonData} from '../../_helpers';

class AssignPrivileges extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this);
        this.openSetupProfile = this.openSetupProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitSetup = this.onSubmitSetup.bind(this);
    }
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                userRole: {
                    value: props !== undefined && props.userRole !== undefined ? props.userRole : '',
                },
                screenName: {
                    value: props !== undefined && props.description !== undefined ? props.description : '',
                }
            },
            addSetupRole: false,
            data: [
                { 'userRole': 'Adimin', ScreenName: 'ScreenName', Privileges: "PrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivileges 1" },
                { 'userRole': 'Level - 1', ScreenName: 'ScreenName', Privileges: "Privileges 2" },
            ]
        }
        return state;
    }
    assignPrivileges(e, collection, mode) {
        this.setState({
            addSetupRole: true
        })
    }
    onSubmitSetup() {
        this.setState({
            addSetupRole: false,
        })
    }
    handleChange(event) {
        let key = event.target.name; let value = event.target.value;
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true
                    }
                }
            }
        })
    }
    //open User setupRole form
    openSetupProfile() {
        this.setState({
            addSetupRole: true
        })
    }
    render() {
        return (
            <div className="col-md-9 contentDiv contect-div">
                <h2 style={{ display: "inline-block" }} className="table-main-heading">Assign Privileges</h2>
                <hr />
                <div>
                    <button className="btn btn-outline btn-success" onClick={this.openSetupProfile}>
                        Manage Permissions
                </button>
                    <TextField
                        label="Search"
                        id="outlined-start-adornment"
                        className="form-control setup-search"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><SearchIcon className="search-icon" /></InputAdornment>,
                        }}
                        variant="outlined"
                        margin="dense"
                    />
                </div>
                {this.state.addSetupRole && (
                    <div className="setup-form-div">
                        <p className="setup-form-heading">User Privilege</p>
                        <div className="row setup-form-row">
                            <div className="col-md-3">
                                <TextField
                                    select
                                    // error={!this.state.controls.role.valid && this.state.controls.role.touched} 
                                    id='role'
                                    variant="outlined"
                                    name='role'
                                    label="User Role"
                                    value={this.state.controls.userRole.value}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    margin="dense"
                                >
                                    {Common_JsonData.userRole.map(option => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.role}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </div>
                            <div className="col-md-3"> 
                            <TextField
                                    select 
                                    id='screenName'
                                    variant="outlined"
                                    name='screenName'
                                    label="screenName"
                                    value={this.state.controls.screenName.value}
                                    className="form-control"
                                    onChange={this.handleChange}
                                    margin="dense"
                                >
                                    {Common_JsonData.screenName.map(option => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </div>
                            <div className="col-md-6">
                                <div className="row assign-privileges">
                                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="assignCreate" />
                                            }
                                            label="Create"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                                        <FormControlLabel className="form-checkbox"
                                            control={
                                                <Checkbox value="assignView" />
                                            }
                                            label="View"
                                            className="form-checkbox"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="assignUpdate" />
                                            }
                                            label="Update"
                                            className="form-checkbox"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="assignDelete" />
                                            }
                                            className="form-checkbox"
                                            label="Delete"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-0 pr-0  mrg-tp5px">
                                        <FormControlLabel
                                            control={
                                                <Checkbox value="assignApprove" />
                                            }
                                            className="form-checkbox"
                                            label="Approve"
                                        />
                                    </div>
                                    <div className="col-md-2 setup-submit-div">
                                        <button className="setup-form-submit" onClick={this.onSubmitSetup} >Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.state.data !== undefined && this.state.data !== null ? this.state.data : []}
                    columns={Table_Config.AssignPrivileges.AssignPrivilege.columns({ assignPrivileges: this.assignPrivileges.bind(this) })}
                    {...Table_Config.AssignPrivileges.AssignPrivilege.options}
                />
            </div>
        )
    }
}
export { AssignPrivileges };