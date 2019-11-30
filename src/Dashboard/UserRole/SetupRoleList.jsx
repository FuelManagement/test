import React from 'react';
import { Table_Config } from '../../_helpers';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { userRolesActions } from '../../_actions/userRoles.actions'

class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this);
        this.openSetupProfile = this.openSetupProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitSetup = this.onSubmitSetup.bind(this);
    }
    editUserRole(e, collection, mode) {
        console.log("edit collection",collection);
        this.setState(prevState => {
            return {
                updateItem: true,
                updateItemId: collection._id,
                controls: {
                    ...prevState.controls,
                    userRole: {
                        ...prevState.controls['userRole'],
                        value: collection.roleType,
                    },
                    description: {
                        ...prevState.controls['description'],
                        value: collection.roleDescription,
                    }
                },
                addSetupRole: true,
                roleText: 'Edit User Role',
            };
        });
    }
    onSubmitSetup() {
        let userRole = this.state.controls.userRole.value;
        let description = this.state.controls.description.value;
        let valid = true;
        if (userRole === undefined || userRole == '' || userRole.length < 1) {
            valid = false;
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        userRole: {
                            ...prevState.controls['userRole'],
                            valid: false,
                            touched: true
                        }
                    }
                };
            });
        }

        if (description === undefined || description == '' || description.length < 1) {
            valid = false;
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        description: {
                            ...prevState.controls['description'],
                            valid: false,
                            touched: true
                        }
                    }
                };
            });
        }

        if (valid) {
        
            let { data } = this.state;
            if (!this.state.updateItem) {
                let item = {
                    'userRole': userRole,
                    'description': description
                };
                data.unshift(item);
                this.props.dispatch(userRolesActions.createUserRolesForParticipant(data[0]));

            } else {
                // let index = data.findIndex(x => x._id == this.state.updateItemId);
                // data[index].userRole = userRole;
                // data[index].description = description;
                // data[index]._id = this.state.updateItemId;

                let item = {
                    "_id": this.state.updateItemId,
                    'userRole': userRole,
                    'description': description
                };
                data.unshift(item);
                this.props.dispatch(userRolesActions.updateUserRolesForParticipant(data[0]));
                
            }


            // this.setState(prevState => {
            //     return {
            //         controls: {
            //             ...prevState.controls,
            //             userRole: {
            //                 ...prevState.controls['userRole'],
            //                 value: '',
            //                 valid: true,
            //             },
            //             description: {
            //                 ...prevState.controls['description'],
            //                 value: '',
            //                 valid: true,
            //             }
            //         },
            //         data: data,
            //         updateItem: false,
            //         updateItemId: '',
            //         addSetupRole: false
            //     };
            // });
            //this.props.dispatch(userRolesActions.createUserRolesForParticipant(data[0]));
        }


    }
    initialState(mode, props) {
        let state = {};
        state = {
            controls: {
                userRole: {
                    value: props !== undefined && props.userRole !== undefined ? props.userRole : '',
                    touched: false,
                    valid: true
                },
                description: {
                    value: props !== undefined && props.description !== undefined ? props.description : '',
                    touched: false,
                    valid: true
                }
            },
            updateItem: false,
            updateItemId: '',
            addSetupRole: false,
            roleText: 'Add User Role',
            data: []
        }
        return state;
    }
    //input handle change
    handleChange(event) {
        let key = event.target.name; let value = event.target.value;
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true,
                        valid: true
                    }
                }
            }
        })
    }
    //open User setupRole form
    openSetupProfile() {
        this.setState({
            addSetupRole: true,
            roleText: 'Add User Role',
        })
    }
    componentDidMount(){
        this.props.dispatch(userRolesActions.getUserRolesByParticipant());
    }

    UNSAFE_componentWillReceiveProps() {
        console.log("this.props.userRole",this.props.userRole);
        if (this.props.userRole.userRoles != undefined) {
            console.log("this.props.userRole enter",this.props.userRole);
            this.setState({ data: this.props.userRole.userRoles },e => {
                console.log("updated State",this.state.data)
            })
        }
    }

    render() {
        return (
            <div className="col-md-9 contentDiv contect-div">
                <h2 style={{ display: "inline-block" }} className="table-main-heading">Setup User Roles</h2>
                <hr />
                <div>
                    <button className="btn btn-outline btn-success setup-addRolebtn" onClick={this.openSetupProfile}>
                        Add User Role
                    </button>
                    <div className="assign-searchField">  
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
                </div>
                {this.state.addSetupRole && (
                    <div className="setup-form-div">
                        <p className="setup-form-heading">{this.state.roleText}</p>
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
                                    error={!this.state.controls.userRole.valid && this.state.controls.userRole.touched}
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
                                error={!this.state.controls.description.valid && this.state.controls.description.touched}
                            />
                            </div>
                            <div className="col-md-2 setup-submit-div">
                                <button className="setup-form-submit btn btn-outline btn-success " onClick={this.onSubmitSetup}>Save</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.state.data !== undefined && this.state.data !== null ? this.state.data : []}
                    columns={Table_Config.UserRoleSetups.UserRoleSetup.columns({ editUserRole: this.editUserRole.bind(this) })}
                    {...Table_Config.UserRoleSetups.UserRoleSetup.options}
                />
            </div>
        )
    }
}
//export { SetupRole };

function mapStateToProps(state) {
    console.log("state.userRole ",state.userRole);
    return {
        userRole:state.userRole,
        userCreateRole: state.userCreateRole,
        userUpdateRole: state.userUpdateRole
    };
}

const connectedUserRoleForm = connect(mapStateToProps)(UserRole);
export { connectedUserRoleForm as UserRole };