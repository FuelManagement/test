import { userPrivilegesConstants } from '../_constants';
import {userPrivilegesService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { userPrivilege } from '../_reducers/userPrivileges.reducer';
export const userPriviegesActions = {
    getUserPrivilegesByParticipant,
    createUserPrivilegesForParticipant,
    updateUserPrivilegesForParticipant,
    changeModeUserPrivilege
    
}
function getUserPrivilegesByParticipant() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        userPrivilegesService.getUserPrivilegesByParticipant()
            .then(
                userPrivelges => { 
                    if(userRoles.statusCode===200){
                    dispatch(success(userPrivelges));
                   
                    }
                    else{
                        dispatch(alertActions.error(userRoles.message));        
                    }
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: userPrivilegesConstants.USER_PRIVILEGES_GETALL_REQUEST } }
    function success(userRoles) { return { type: userPrivilegesConstants.USER_PRIVILEGES_GETALL_SUCCESS, userRoles } }
    function failure(error) { return { type: userPrivilegesConstants.USER_PRIVILEGES_CREATE_FAILURE, error } }
}
function createUserPrivilegesForParticipant(collection) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userPrivilegesService.createUserPrivilegesForParticipant(collection)
            .then( userRole => { 
                dispatch(success(userRole));
                dispatch(alertActions.success('User Privileges Added Successfully !'));
                
            })
            .then(()=>{dispatch(alertActions.clearLoading());
                let userPrivilege={userRole:'',screenName:'',privileges: {
                    assignCreate: false,
                    assignView: false,
                    assignUpdate: false,
                    assignDelete: false,
                    assignApprove: false,
                    assignDownload: false,
                  }};
                  dispatch(changeModeUserPrivilege('add',userPrivilege));
                dispatch(getUserPrivilegesByParticipant());} )
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: userPrivilegesConstants.USER_PRIVILEGES_CREATE_REQUEST } }
    function success(userRole) { return { type: userPrivilegesConstants.USER_PRIVILEGES_CREATE_SUCCESS, userRole } }
    function failure(error) { return { type: userPrivilegesConstants.USER_PRIVILEGES_CREATE_FAILURE, error } }
}

function updateUserPrivilegesForParticipant(collection)
{
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userPrivilege.updateUserPrivilegesForParticipant(collection)
            .then( userRole => { 
                dispatch(success(userRole));
                dispatch(alertActions.success('User Privileges Updated Successfully !'));
             
            })
            .then(()=> {dispatch(alertActions.clearLoading());
                let userPrivilege={userRole:'',screenName:'',privileges: {
                    assignCreate: false,
                    assignView: false,
                    assignUpdate: false,
                    assignDelete: false,
                    assignApprove: false,
                    assignDownload: false,
                  }};
                  dispatch(changeModeUserPrivilege('add',userPrivilege));
                dispatch(getUserPrivilegesByParticipant());
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: userPrivilegesConstants.USER_PRIVILEGES_UPDATE_REQUEST } }
    function success(userRole) { return { type: userPrivilegesConstants.USER_PRIVILEGES_UPDATE_SUCCESS, userRole } }
    function failure(error) { return { type: userPrivilegesConstants.USER_PRIVILEGES_UPDATE_FAILURE, error } }

}
function changeModeUserPrivilege(mode,userPrivelgeData){
    return dispatch => {

            let collection={
                mode:mode,
                userPrivilege:userPrivelgeData
            }
            dispatch(success(collection));
       
       
    };
    function success(collection) { return { type: userPrivilegesConstants.USER_PRIVILEGES_MODE, collection } }
   
}