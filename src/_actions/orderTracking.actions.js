import { orderTrackingConst } from '../_constants';
import { OrderTrackingService } from '../_services';
import { alertActions } from './';
export const orderTrackingActions = {
    listOrderTracking,
    getOrderTrackingProgress
}

function listOrderTracking(){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.listOrderTracking()
        .then(
            orderTrackingList => {
                dispatch(success(orderTrackingList));
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_LIST_REQUEST } }
    function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_LIST_SUCCESS, data } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_LIST_ERROR, error } }
}

function getOrderTrackingProgress(){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.getOrderTrackingProgress()
        .then(
            orderTrackingDetails => {
                dispatch(success(orderTrackingDetails));
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_REQUEST } }
    function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_SUCCESS, data } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_ERROR, error } }
}