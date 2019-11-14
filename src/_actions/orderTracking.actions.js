import { orderTrackingConst } from '../_constants';
import { OrderTrackingService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
//import { orderTrackingRequest } from '../_reducers/orderTrackingRequest.reducer';
export const orderTrackingActions = {
    listOrderTracking,
    getOrderTrackingProgress,
    submitTrackRequest,
    submitOTPRequest,
    postOTPResendRequest,
    getShowLedgerBlockChainDetails
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
                    orderList.find(f=>f.poNumber===response.data.orderId).OTRStatusId=response.data.requestId;
                    dispatch(successOrderList(orderList));
                    if(response.data.status==="Auto Approved")
                    {
                        dispatch(alertActions.success(response.message));
                    }
                    else{
                        dispatch(alertActions.success("Your request has been submitted. Please wait for Approval"));   
                    }
                    
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
                }
                dispatch(alertActions.clearLoading());
               
            },
            error => {
                let obj = JSON.parse(error);
                dispatch(alertActions.error(obj.message));                 
                dispatch(alertActions.clearLoading());
              
            }
        );
    };

    //function request() { return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_REQUEST } }
    //function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_SUCCESS, data } }
   // function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_OTP_SUBMIT_ERROR, error } }
}

function postOTPResendRequest(data){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingService.postOTPResendRequest(data)
        .then(
            response => {
                if(response.statusCode===200){
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

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_OTP_RESEND_REQUEST } }
    function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_OTP_RESEND_SUCCESS, data } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_OTP_RESEND_ERROR, error } }
}
function getShowLedgerBlockChainDetails(){
    return dispatch => {
        dispatch(alertActions.loading());
        
        dispatch(success(OrderTrackingService.getShowLedgerBlockChainDetails()))
        //OrderTrackingService.getShowLedgerBlockChainDetails()
        // .then(
        //     blockChainDetails => {
        //         dispatch(success(blockChainDetails));
        //         dispatch(alertActions.clearLoading());
        //     },
        //     error => {
        //         dispatch(failure(error))
        //         dispatch(alertActions.clearLoading());
        //     }
        // );
    };

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_SHOW_LEDGER_GET_BLOCKCHAIN_REQUEST } }
    function success(data) {return { type: orderTrackingConst.ORDER_TRACKING_SHOW_LEDGER_GET_BLOCKCHAIN_SUCCESS, data } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_SHOW_LEDGER_GET_BLOCKCHAIN_ERROR, error } }
}
