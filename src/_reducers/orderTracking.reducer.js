import { orderTrackingConst } from '../_constants';

export function orderTrackingRequest(state = {}, action) {
    switch (action.type) {
        case orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderTrackingConst.ORDER_TRACKING_ONLOAD_ERROR:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_ERROR:        
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case orderTrackingConst.ORDER_TRACKING_REQ_ONLOAD_SUCCESS:
            return {
                ...state,
                orderTrackingDetails: action.orderTrackingDetails.data
            }
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_SUCCESS:
            return {
                ...state,
                orders: action.data
            }
        default: return { ...state };

    }

}