import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from '.';

export const adminActions = {
    getAllUsers,
    approveUser,
};

function getAllUsers() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        adminService.getAllUsers()
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(alertActions.clearLoading());
                },
                error =>{
                    dispatch(failure(error));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: adminConstants.GETALL_USERS_REQUEST } }
    function success(users) { return { type: adminConstants.GETALL_USERS_SUCCESS, users } }
    function failure(error) { return { type: adminConstants.GETALL_USERS_FAILURE, error } }
}

function approveUser(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        adminService.approveUser(formData)
            .then(user => { 
                dispatch(success(user));
                dispatch(alertActions.success('Request Successfull !'));
                dispatch(alertActions.clearLoading());
            })
            .then(()=>dispatch(getAllUsers()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            })
    };

    function request() { return { type: adminConstants.APPROVE_USER_REQUEST } }
    function success(user) { return { type: adminConstants.APPROVE_USER_SUCCESS, user } }
    function failure(error) { return { type: adminConstants.APPROVE_USER_FAILURE, error } }
}
