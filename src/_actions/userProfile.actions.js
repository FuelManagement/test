import { userProfileConstants } from '../_constants';
import { userProfileService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
export const userProfileActions = {
    getAllUserProfile,
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    changeUserProfile,
    resetUserProfile,
    changeModeUserProfile
}
function getAllUserProfile() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        userProfileService.getAllUserProfile()
            .then(
                userProfile => { 
                    dispatch(success(userProfile));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request() { return { type: userProfileConstants.USER_PROFILE_GETALL_REQUEST } }
    function success(userprofiles) { return { type: userProfileConstants.USER_PROFILE_GETALL_SUCCESS, userprofiles } }
    function failure(error) { return { type: userProfileConstants.USER_PROFILE_GETALL_FAILURE, error } }
}
function createUserProfile(collection) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userProfileService.createUserProfile(collection)
            .then( userprofile => { 
                dispatch(success(userprofile));
                dispatch(alertActions.success('User Profile Added Successfully !'));
            })
            .then(()=>dispatch(getAllUserProfile()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: userProfileConstants.USER_PROFILE_CREATE_REQUEST } }
    function success(userprofile) { return { type: userProfileConstants.USER_PROFILE_CREATE_SUCCESS, userprofile } }
    function failure(error) { return { type: userProfileConstants.USER_PROFILE_CREATE_FAILURE, error } }
}
function getUserProfile(collection)
{
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        dispatch(success(collection));
        dispatch(alertActions.clearLoading());
        // userProfileService.getUserProfile(collection)
        //     .then(
        //         userprofile => { 
        //             dispatch(success(userprofile));
        //             dispatch(alertActions.clearLoading());
        //         },
        //         error => {
        //             dispatch(failure(error))
        //             dispatch(alertActions.clearLoading());
        //         }
        //     );
    };

    function request() { return { type: userProfileConstants.USER_PROFILE_GET_REQUEST } }
    function success(userprofile) { return { type: userProfileConstants.USER_PROFILE_GET_SUCCESS, userprofile } }
    function failure(error) { return { type: userProfileConstants.USER_PROFILE_GET_FAILURE, error } }

}
function updateUserProfile(collection)
{
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userProfileService.updateUserProfile(collection)
            .then( userprofile => { 
                dispatch(success(userprofile));
                dispatch(alertActions.success('User Profile Updated Successfully !'));
            })
            .then(()=>dispatch(getAllUserProfile()))
            .then(()=> dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                dispatch(alertActions.clearLoading());
            });
    };

    function request() { return { type: userProfileConstants.USER_PROFILE_UPDATE_REQUEST } }
    function success(userprofile) { return { type: userProfileConstants.USER_PROFILE_UPDATE_SUCCESS, userprofile } }
    function failure(error) { return { type: userProfileConstants.USER_PROFILE_UPDATE_FAILURE, error } }

}
function changeUserProfile(key,value)
{
    return dispatch => {
       
        let collection={
            key:key,
            value:value
        }
        dispatch(success(collection));
    
};
function success(collection) { return { type: userProfileConstants.USER_PROFILE_CHANGE, collection } }

}
function resetUserProfile()
{
    return dispatch => {
       
            let collection={
                mode:'create',
                userprofile:{}
            }
            dispatch(success(collection));
        
    };
    function success(collection) { return { type: userProfileConstants.USER_PROFILE_RESET, collection } }
   
}
function changeModeUserProfile(mode){
    return dispatch => {

            let collection={
                mode:mode,
                userprofile:{}
            }
            dispatch(success(collection));
       
       
    };
    function success(collection) { return { type: userProfileConstants.USER_PROFILE_MODE, collection } }
   
}
