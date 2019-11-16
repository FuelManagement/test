import React from 'react';
import { Table_Config } from '../../_helpers';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class AssignPrivileges extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this);
        this.openSetupProfile = this.openSetupProfile.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSubmitSetup=this.onSubmitSetup.bind(this);
    }
    initialState(mode,props){ 
        let state={};
        state={
            controls:{
                userRole:{
                    value:props !== undefined && props.userRole !== undefined ? props.userRole:'',
                },
                description:{
                    value:props !== undefined && props.description !== undefined ? props.description:'',
                }
            },
            addSetupRole: false,
            data: [
                { 'userRole': 'Adimin', ScreenName: 'ScreenName',Privileges:"PrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivilegesPrivileges 1" },
                { 'userRole': 'Level - 1', ScreenName: 'ScreenName',Privileges:"Privileges 2"  },
            ]
        }
        return state;
    }
    assignPrivileges(e, collection, mode) { 
        this.setState({
            addSetupRole: true
        }) 
    }
    onSubmitSetup(){
        this.setState({
            addSetupRole: false,
        })
    }
    handleChange(event){
        let key= event.target.name; let value=event.target.value;  
        this.setState(prevState=>{
            return{
                controls:{
                    ...prevState.controls,
                    [key]:{
                        ...prevState.controls[key],
                        value:value,
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
            <div className="col-md-9 contentDiv">
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
                            <div className="col-md-4">
                                <TextField
                                    id="userRole"
                                    label="User Role"
                                    name="userRole"
                                    value={this.state.controls.userRole.value}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    className="form-control"
                                    autoComplete="off"
                                    margin="dense"
                                />
                            </div>
                            <div className="col-md-6"> <TextField
                                id="description"
                                label="Description"
                                name="description"
                                value={this.state.controls.description.value}
                                onChange={this.handleChange}
                                variant="outlined"
                                className="form-control"
                                autoComplete="off"
                                margin="dense"
                            />
                            </div>
                            <div className="col-md-2 setup-submit-div">
                                <buton className="setup-form-submit" onClick={this.onSubmitSetup}>Save</buton>
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
export {AssignPrivileges};