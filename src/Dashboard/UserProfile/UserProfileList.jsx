import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  

import { API_Helpers, Utils, Table_Config } from '../../_helpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import 'bootstrap'; 

class UserProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state={ 
        }   
    }   
    render() {

        return ( 
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{ display: "inline-block" }}>User Profile</h2>
                <hr />
                <Link to="/userProfile/add">
                    <button className="btn btn-outline btn-info">
                        <FontAwesomeIcon icon="plus"/> Add User Profile
                    </button>
                </Link>
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    // data={this.props.rfq.rfqs}
                    columns={Table_Config.UserProfiles.userProfile.columns({})}
                    {...Table_Config.UserProfiles.userProfile.options}
                /> 
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
            
    };
}

const connectedUserProfileForm = connect(mapStateToProps)(UserProfile);
export { connectedUserProfileForm as UserProfile };
