import { refineryConstants } from '../_constants';
import { refineryService } from '../_services';
import { alertActions } from './';

export const refineryActions = {
    getAllToDispatch,
    dispatchOrder,
    getAllDispatchedOrders
};

function getAllToDispatch() {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.loading());
        refineryService.getAllToDispatch()
        .then(
            orders =>{
                dispatch(alertActions.clearLoading());
                dispatch(success(orders));
            },
            error => {
                dispatch(alertActions.clearLoading());
                dispatch(failure(error))
            }
        );
    };

    function request() { return { type: refineryConstants.REF_GETALL_TD_REQUEST } }
    function success(orders) { return { type: refineryConstants.REF_GETALL_TD_SUCCESS, orders } }
    function failure(error) { return { type: refineryConstants.REF_GETALL_TD_FAILURE, error } }
}

function getAllDispatchedOrders() {
    return dispatch => {
        dispatch(alertActions.loading());
        dispatch(request());
        refineryService.getAllDispatchedOrders()
        .then(
            orders =>{
                dispatch(alertActions.clearLoading());
                dispatch(success(orders));
            },
            error => {
                dispatch(alertActions.clearLoading());
                dispatch(failure(error))
            }
        );
    };

    function request() { return { type: refineryConstants.REF_GETALL_DISPATCHED_REQUEST } }
    function success(orders) { return { type: refineryConstants.REF_GETALL_DISPATCHED_SUCCESS, orders } }
    function failure(error) { return { type: refineryConstants.REF_GETALL_DISPATCHED_FAILURE, error } }
}

function dispatchOrder(order) {
    return dispatch => {
        dispatch(request());
        refineryService.dispatchOrder(order)
            .then(order => dispatch(success(order)))
            .then(()=>dispatch(alertActions.success(`Order Fulfilled !`)))
            .then(()=>dispatch(getAllToDispatch()))
            .then(()=>dispatch(getAllDispatchedOrders()))
            .catch(error => {
                dispatch(failure(error))
                dispatch(alertActions.error(`Failed to Dispatch ${order.PONumber} !`));
            });
    };

    function request() { return { type: refineryConstants.REF_DISPATCH_REQUEST } }
    function success(orders) { return { type: refineryConstants.REF_DISPATCH_SUCCESS, orders } }
    function failure(error) { return { type: refineryConstants.REF_DISPATCH_FAILURE, error } }
}
