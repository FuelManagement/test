import { orderTrackingConst } from '../_constants';
import { OrderTrackingService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { orderTrackingRequest } from '../_reducers/orderTrackingRequest.reducer';
export const orderTrackingActions = {
    listOrderTracking,
    getOrderTrackingProgress,
    submitTrackRequest,
    submitOTPRequest
}

function listOrderTracking(){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.listOrderTracking()
        .then(
            orderTrackingList => {
                dispatch(success(orderTrackingList.message));
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

function getOrderTrackingProgress(data){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.getOrderTrackingProgress(data)
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

function submitTrackRequest(data,orderList){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.submitTrackRequest(data)
        .then(
            response => {
                if(response.statusCode===200){
                    orderList.find(f=>f.poNumber===response.data.orderId).orderTrackingStatus=response.data.status;
                    orderList.find(f=>f.poNumber===response.data.orderId).requestId=response.data.requestId;
                    dispatch(successOrderList(orderList));
                    dispatch(alertActions.success("Your request has been submitted.Please check your mail for OTP."));
                }
                else{
                    dispatch(alertActions.success("Track request submitted"));
                }
                dispatch(success(response));
               
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_CREATE_REQUEST } }
    function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_CREATE_SUCCESS, data } }
    function successOrderList(data) {return { type: orderTrackingConst.ORDER_TRACKING_LIST_SUCCESS, data } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_CREATE_ERROR, error } }
}
function submitOTPRequest(data){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.submitOTPRequest(data)
        .then(
            orderTrackingList => {
                if(orderTrackingList.statusCode===200){
                dispatch(alertActions.success(orderTrackingList.message));
                dispatch(getOrderTrackingProgress(data));
                history.push('/order-progress');
                }else{
                    dispatch(alertActions.error(orderTrackingList.message)); 
                    dispatch(getOrderTrackingProgress(data));
                    history.push('/order-progress');
                   
                }
                dispatch(alertActions.clearLoading());
               
            },
            error => {
                // dispatch(alertActions.error(error.message));
                // dispatch(alertActions.clearLoading());
                dispatch(getOrderTrackingProgress(data));
                history.push('/order-progress');
            }
        );
    };

    //function request() { return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_REQUEST } }
    //function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_SUCCESS, data } }
   // function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_ERROR, error } }
}
