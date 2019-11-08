import { orderTrackingConst } from '../_constants';

export function orderTrackingRequest(state = {}, action) {
    switch (action.type) {
        case orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD:
        case orderTrackingConst.ORDER_TRACKING_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD_SUCCESS:
            return {
                ...state,
                orderTrackingReqDetails: action.orderTrackingReqDetails.data
            }
        case orderTrackingConst.ORDER_TRACKING_DETAILS_SUCCESS:
            return {
                ...state,
                orders: action.data
            }
        default: return { ...state };

    }

}