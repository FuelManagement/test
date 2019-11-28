import { userPrivilegesConstants } from '../_constants';
import { userRolesService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
export const userPriviegesActions = {
    getUserPrivilegesByParticipant,
    createUserPrivilegesForParticipant,
    updateUserPrivilegesForParticipant,
    changeModeUserPrivilege
    
}
function getUserPrivilegesByParticipant(participantId) {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        userPrivilegesservice.getUserPrivilegesByParticipant()
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
    function failure(error) { return { type: userPrivilegesConstants.USER_PRIVILEGES_GETALL_FAILURE, error } }
}
function createUserPrivilegesForParticipant(collection) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userRolesService.createUserRolesForParticipant(collection)
            .then( userRole => { 
                dispatch(success(userRole));
                dispatch(alertActions.success('User Role Added Successfully !'));
            })
            .then(()=> dispatch(alertActions.clearLoading()))
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
        userRolesService.updateUserRolesForParticipant(collection)
            .then( userRole => { 
                dispatch(success(userRole));
                dispatch(alertActions.success('User Role Updated Successfully !'));
             //   history.push('/userProfile');
            })
            .then(()=> dispatch(alertActions.clearLoading()))
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
function changeModeUserPrivilege(mode){
    return dispatch => {

            let collection={
                mode:mode,
                userprofile:{}
            }
            dispatch(success(collection));
       
       
    };
    function success(collection) { return { type: userProfileConstants.USER_ROLE_MODE, collection } }
   
}