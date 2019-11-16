import React from 'react';
import { Link } from 'react-router-dom';
import { Table_Config } from '../../_helpers';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class SetupRole extends React.Component {
    constructor(props) {
        super(props);
        this.state= this.initialState(null,this); 
        this.openSetupProfile = this.openSetupProfile.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSubmitSetup=this.onSubmitSetup.bind(this);
    }
    editUserProfile(e, collection, mode) { 
        this.setState({
            addSetupRole: true
        }) 
    }
    onSubmitSetup(){
        this.setState({
            addSetupRole: false,
        })
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
                { 'userRole': 'Adimin', description: 'description' },
                { 'userRole': 'Level - 1', description: 'description' },
            ]
        }
        return state;
    }
    //input handle change
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
                <h2 style={{ display: "inline-block" }} className="table-main-heading">Setup User Roles</h2>
                <hr />
                <div>
                    <button className="btn btn-outline btn-success" onClick={this.openSetupProfile}>
                        Add User Role
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
                        <p className="setup-form-heading">Add User Role</p> 
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
                    columns={Table_Config.ProfilesSetups.ProfilesSetup.columns({ editUserProfile: this.editUserProfile.bind(this) })}
                    {...Table_Config.UserProfiles.userProfile.options}
                />
            </div>
        )
    }
}
export { SetupRole };