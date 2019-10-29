import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  
import { userProfileActions,onboardActions } from '../../_actions';
import { Table_Config,history } from '../../_helpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import 'bootstrap'; 

class UserProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state={ 
        }   
        this.props.dispatch(onboardActions.getAllParticipant());
    }   
    componentDidMount() {
        this.props.dispatch(userProfileActions.changeModeUserProfile('create'));
        this.props.dispatch(userProfileActions.getAllUserProfile());  
    }
    editUserProfile(collection,mode){
        this.props.dispatch(userProfileActions.changeModeUserProfile(mode));
        this.props.dispatch(userProfileActions.getUserProfile(collection));
        history.push('/userProfile/add');
    }
    shouldComponentUpdate(){
        return true;
    }
    render() {

        return ( 
            <div className="col-md-8 offset-md-3 contentDiv">
                <h2 style={{ display: "inline-block" }}>User Profile</h2>
                <hr />
                <Link to="/userProfile/add">
                    <button className="btn btn-outline btn-success">
                        <FontAwesomeIcon icon="plus"/> Add User Profile
                    </button>
                </Link>
                <div className="clearDiv"></div>
                <br />
                <ReactTable
                    data={this.props.userProfile.userProfiles!==undefined && this.props.userProfile.userProfiles!==null ?this.props.userProfile.userProfiles:[]}
                    columns={Table_Config.UserProfiles.userProfile.columns({editUserProfile:this.editUserProfile.bind(this)})}
                    {...Table_Config.UserProfiles.userProfile.options}
                /> 
                </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        userProfile:state.userProfile
      
    };
}

const connectedUserProfileForm = connect(mapStateToProps)(UserProfile);
export { connectedUserProfileForm as UserProfile };
