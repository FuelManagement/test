import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllPo,
    createPo,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        dispatch(alertActions.loading());
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    // dispatch(alertActions.success('Logged In Scuccessfully!'));
                    dispatch(alertActions.clearLoading());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        dispatch(alertActions.loading());
        userService.register(user)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                    dispatch(alertActions.clearLoading());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(alertActions.clearLoading());
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllPo() {
    return dispatch => {
        dispatch(request());
        userService.getAllPo()
            .then(
                orders => dispatch(success(orders)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(orders) { return { type: userConstants.GETALL_SUCCESS, orders } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function createPo(formData) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        userService.createPo(formData)
            .then(order => { 
                dispatch(success(order));
                dispatch(alertActions.success('Order Created !'));
            })
            .then(()=>dispatch(getAllPo()))
            .then(()=>dispatch(alertActions.clearLoading()))
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.clearLoading());
                dispatch(alertActions.error('Failed creating PO !!'));
            })
    };

    function request() { return { type: userConstants.CREATE_PO_REQUEST } }
    function success(order) { return { type: userConstants.CREATE_PO_SUCCESS, order } }
    function failure(error) { return { type: userConstants.CREATE_PO_FAILURE, error } }
}
