import { orderTrackingConst } from '../_constants';
import { OrderTrackingService } from '../_services';
import { alertActions } from './';
export const orderTrackingReqActions = {
    getOrderTrackingReqDetails
}

function getOrderTrackingReqDetails() {
    return dispatch => {
        //dispatch(alertActions.loading());
        dispatch(success(OrderTrackingService.getOTRDetailsBysupplier()));
            // .then(
            //     orderTrackingReqDetails => {
            //         dispatch(success(orderTrackingReqDetails));
            //         dispatch(alertActions.clearLoading());
            //     },
            //     error => {
            //         dispatch(failure(error))
            //         dispatch(alertActions.clearLoading());
            //     }
            // );
    };

    function request() { return { type: orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD } }
    function success(orderTrackingReqDetails) {return { type: orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD_SUCCESS, orderTrackingReqDetails } }
    function failure(error) { return { type: orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD_ERROR, error } }
}