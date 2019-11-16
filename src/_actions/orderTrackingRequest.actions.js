import { orderTrackingRequestConst } from '../_constants';
import { OrderTrackingRequestService } from '../_services';
import { alertActions } from '.';
export const orderTrackingRequestActions = {
    getOTRDetailsBysupplier,
    postOTRAuthDetailsForCustomer
}

function getOTRDetailsBysupplier() {
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingRequestService.getOTRDetailsBysupplier()
        .then(
            orderTrackingReqDetails => {
                dispatch(success(orderTrackingReqDetails));
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: orderTrackingRequestConst.ORDER_TRACKING_REQ_ONLOAD } }
    function success(orderTrackingReqDetails) {return { type: orderTrackingRequestConst.ORDER_TRACKING_REQ_ONLOAD_SUCCESS, orderTrackingReqDetails } }
    function failure(error) { return { type: orderTrackingRequestConst.ORDER_TRACKING_REQ_ONLOAD_ERROR, error } }
}
function postOTRAuthDetailsForCustomer(data){
    return dispatch => {
        dispatch(alertActions.loading());
        OrderTrackingRequestService.postOTRAuthDetailsForCustomer(data)
        .then(
            response => {
                dispatch(getOTRDetailsBysupplier());
                dispatch(alertActions.success("Track request submitted"));
                dispatch(alertActions.clearLoading());
            },
            error => {
               
                dispatch(alertActions.clearLoading());
            }
        );
    };

   }
