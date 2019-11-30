import React from "react";
import { Table_Config } from "../../_helpers";
import {connect} from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  Checkbox,
  Select,
  FormControl,
  FormHelperText,
  FormControlLabel,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { Common_JsonData } from "../../_helpers";
import { userPriviegesActions } from "../../_actions";

class AssignPrivileges extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.userPrivilege === defined )
    {
      this.state = this.initialState(null, this.props.userPrivilege.userPrivilege);
    }
      this.openSetupProfile = this.openSetupProfile.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.onSubmitSetup = this.onSubmitSetup.bind(this);
      this.onPrivilageHandleChange = this.onPrivilageHandleChange.bind(this);
    
  }
  UNSAFE_componentWillReceiveProps(nextprops) {
    if (JSON.stringify(this.props.userPrivilege.userPrivilege) !== JSON.stringify(nextprops.userPrivilege.userPrivilege)) {
      ["userRole", "screenName", "privileges"].forEach(name => {
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              [name]: {
                ...prevState.controls[name],
                value: nextprops.userPrivilege.userPrivilege[name]
              }
            }
          }
        });
      });

    }
  }
  initialState(mode, props) {
    let state = {};
    state = {
      controls: {
        userRole: {
          value:
            props !== undefined && props.userRole !== undefined
              ? props.userRole
              : "",
          touched: false,
          valid: true
        },
        screenName: {
          value:
            props !== undefined && props.description !== undefined
              ? props.description
              : "",
          touched: false,
          valid: true
        },
        privileges: {
          assignCreate: false,
          assignView: false,
          assignUpdate: false,
          assignDelete: false,
          assignApprove: false,
          assignDownload: false,
        }
      },
      addAssignPrivileges: false,
      updateItem: false,
      updateItemId: "",
      data: []
    };
    return state;
  }
  assignPrivileges(e, collection, mode) {
    console.log("e val", e);
    console.log("collection val", collection);

    this.setState(prevState => {
      return {
        updateItem: true,
        updateItemId: collection.id,
        controls: {
          ...prevState.controls,
          userRole: {
            ...prevState.controls["userRole"],
            value: collection.userRole
          },
          screenName: {
            ...prevState.controls["screenName"],
            value: collection.screenName
          },
          privileges: collection.privileges
        },
        addAssignPrivileges: true,
        privilegeText: "Edit User Privilege"
      };
    });
  }
  onSubmitSetup() {
    let userRole = this.state.controls.userRole.value;
    let screenName = this.state.controls.screenName.value;
    let privileges = this.state.controls.privileges;
    let valid = true;
    if (userRole === undefined || userRole == "" || userRole.length < 1) {
      valid = false;
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            userRole: {
              ...prevState.controls["userRole"],
              valid: false,
              touched: true
            }
          }
        };
      });
     
    }

    if (screenName === undefined || screenName == "" || screenName.length < 1) {
      valid = false;
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            screenName: {
              ...prevState.controls["screenName"],
              valid: false,
              touched: true
            }
          }
        };
      });
    }

    if (valid) {
      let id = Math.random();
      let { data } = this.state;
      if (!this.state.updateItem) {
        let item = {
          id: id,
          userRole: userRole,
          screenName: screenName,
          privileges: privileges
        };
        data.unshift(item);
        this.props.dispatch(userPriviegesActions.createUserPrivilegesForParticipant(data));
      } else {
        let index = data.findIndex(x => x.id == this.state.updateItemId);
        data[index].userRole = userRole;
        data[index].screenName = screenName;
        data[index].privileges = privileges;
        this.props.dispatch(userPriviegesActions.updateUserPrivilegesForParticipant(data));
      }

      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            userRole: {
              ...prevState.controls["userRole"],
              value: "",
              valid: true
            },
            screenName: {
              ...prevState.controls["screenName"],
              value: "",
              valid: true
            },
            privileges: {
              ...prevState.controls["privileges"],
              assignCreate: false,
              assignView: false,
              assignUpdate: false,
              assignDelete: false,
              assignApprove: false,
              assignDownload: false
            }
          },
          data: data,
          updateItem: false,
          updateItemId: "",
          addAssignPrivileges: false,
          privilegeText: "User Privilege"
        };
      });
    }
    console.log("data");
    console.log(this.state.data);
  }
  componentDidMount() {
    this.props.dispatch(userPriviegesActions.getUserPrivilegesByParticipant());
}
  onPrivilageHandleChange(event) {
    let key = event.target.value;
    let value = event.target.checked;

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          privileges: {
            ...prevState.controls["privileges"],
            [key]: value
          }
        }
      };
    });
  }

  handleChange(event) {
    let key = event.target.name;
    let value = event.target.value;
    console.log("key " + key + " value " + value);
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
      };
    });
  }
  //open User setupRole form
  openSetupProfile() {
    this.setState({
      addAssignPrivileges: true,
      privilegeText: "Assign Privilege"
    });
    let collection={userRole:'',screenName:'',privileges: {
      assignCreate: false,
      assignView: false,
      assignUpdate: false,
      assignDelete: false,
      assignApprove: false,
      assignDownload: false,
    }};
    this.props.dispatch(userPriviegesActions.changeModeUserPrivilege('add',collection));
  }
  render() {
    return (
      <div className="col-md-9 contentDiv contect-div">
        <h2 style={{ display: "inline-block" }} className="table-main-heading">
          Assign Privileges
        </h2>
        <hr />
        <div>
          <button
            className="btn btn-outline btn-success setup-addRolebtn"
            onClick={this.openSetupProfile}
          >
            Manage Permissions
          </button>
          <div className="assign-searchField">  
          <TextField
            label="Search"
            id="outlined-start-adornment"
            className="form-control setup-search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              )
            }}
            variant="outlined"
            margin="dense"
          />
          </div>
        </div>
        {this.state.addAssignPrivileges && (
          <div className="setup-form-div">
            <p className="setup-form-heading">{this.state.privilegeText}</p>
            <div className="row setup-form-row">
              <div className="col-md-6">
                <TextField
                  select
                  // error={!this.state.controls.role.valid && this.state.controls.role.touched}
                  id="role"
                  variant="outlined"
                  name="userRole"
                  label="User Role"
                  value={this.state.controls.userRole.value}
                  className="form-control"
                  onChange={this.handleChange}
                  error={
                    !this.state.controls.userRole.valid &&
                    this.state.controls.userRole.touched
                  }
                  margin="dense"
                >
                  {Common_JsonData.userRole.map(option => (
                    <MenuItem key={option._id} value={option.role}>
                      {option.role}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-6">
                <TextField
                  select
                  id="screenName"
                  variant="outlined"
                  name="screenName"
                  label="screenName"
                  value={this.state.controls.screenName.value}
                  className="form-control"
                  onChange={this.handleChange}
                  margin="dense"
                  error={
                    !this.state.controls.screenName.valid &&
                    this.state.controls.screenName.touched
                  }
                >
                  {Common_JsonData.screenNames.map(option => (
                    <MenuItem key={option._id} value={option.role}>
                      {option.role}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              </div>
              <div className="row  setup-form-row mrgtp-15px">
                <div className="col-md-10">
                  <div className="row assign-privileges">
                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="assignCreate"
                            checked={
                              this.state.controls.privileges.assignCreate
                            }
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        label="Create"
                      />
                    </div>
                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                      <FormControlLabel
                        className="form-checkbox"
                        control={
                          <Checkbox
                            value="assignView"
                            checked={this.state.controls.privileges.assignView}
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        label="View"
                        className="form-checkbox"
                      />
                    </div>
                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="assignUpdate"
                            checked={
                              this.state.controls.privileges.assignUpdate
                            }
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        label="Update"
                        className="form-checkbox"
                      />
                    </div>
                    <div className="col-md-2 pl-0 pr-0 mrg-tp5px">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="assignDelete"
                            checked={
                              this.state.controls.privileges.assignDelete
                            }
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        className="form-checkbox"
                        label="Delete"
                      />
                    </div>
                    <div className="col-md-2 pl-0 pr-0  mrg-tp5px">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="assignApprove"
                            checked={
                              this.state.controls.privileges.assignApprove
                            }
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        className="form-checkbox"
                        label="Approve"
                      />
                    </div>
                    <div className="col-md-2 pl-0 pr-0  mrg-tp5px">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="assignDownload"
                            checked={
                              this.state.controls.privileges.assignDownload
                            }
                            onChange={this.onPrivilageHandleChange}
                          />
                        }
                        className="form-checkbox"
                        label="Download"
                      />
                    </div>
                    </div>
                    </div>
                    <div className="col-md-2 setup-submit-div">
                      <button
                        className="setup-form-submit btn btn-outline btn-success"
                        onClick={this.onSubmitSetup}
                      >
                        Save
                      </button>
                    </div> 
                {/* </div> */}
                {/* <div>
              </div> */}
            </div>
          </div>
        )}

        <div className="clearDiv"></div>
        <br />
        <ReactTable
          data={this.props.userPrivilege.userPrivileges
            
          }
          columns={Table_Config.AssignPrivileges.AssignPrivilege.columns({
            assignPrivileges: this.assignPrivileges.bind(this)
          })}
          {...Table_Config.AssignPrivileges.AssignPrivilege.options}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { userPrivilege } = state; 
  return {
    userPrivilege

  };
}
const connectedAssignPrivileges = connect(mapStateToProps)(AssignPrivileges);
export { connectedAssignPrivileges as AssignPrivileges };
