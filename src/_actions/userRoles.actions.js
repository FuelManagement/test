import { userRolesConstants } from '../_constants';
import { userRolesService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
export const userRolesActions = {
    getUserRolesByParticipant,
    createUserRolesForParticipant,
    updateUserRolesForParticipant,
    changeModeUserRole
    
}
function getUserRolesByParticipant(participantId) {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        userRolesService.getUserRolesByParticipant()
            .then(
                userRoles => { 
                    dispatch(success(userRoles));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: userRolesConstants.USER_ROLES_GETALL_REQUEST } }
    function success(userRoles) { return { type: userRolesConstants.USER_ROLES_GETALL_SUCCESS, userRoles } }
    function failure(error) { return { type: userRolesConstants.USER_ROLES_GETALL_FAILURE, error } }
}
function createUserRolesForParticipant(collection) {
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

    function request() { return { type: userRolesConstants.USER_ROLES_CREATE_REQUEST } }
    function success(userRole) { return { type: userRolesConstants.USER_ROLES_CREATE_SUCCESS, userRole } }
    function failure(error) { return { type: userRolesConstants.USER_ROLES_CREATE_FAILURE, error } }
}

function updateUserRolesForParticipant(collection)
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

    function request() { return { type: userRolesService.USER_ROLES_UPDATE_REQUEST } }
    function success(userRole) { return { type: userRolesService.USER_ROLES_UPDATE_SUCCESS, userRole } }
    function failure(error) { return { type: userRolesService.USER_ROLES_UPDATE_FAILURE, error } }

}
function changeModeUserRole(mode){
    return dispatch => {

            let collection={
                mode:mode,
                userprofile:{}
            }
            dispatch(success(collection));
       
       
    };
    function success(collection) { return { type: userProfileConstants.USER_ROLE_MODE, collection } }
   
}