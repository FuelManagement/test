import { orderTrackingConst } from '../_constants';

export function orderTracking(state = {}, action) {
    switch (action.type) {
        case orderTrackingConst.ORDER_TRACKING_LIST_REQUEST:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderTrackingConst.ORDER_TRACKING_LIST_ERROR:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_ERROR:        
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case orderTrackingConst.ORDER_TRACKING_LIST_SUCCESS:
            return {
                ...state,
                orderTrackingList: action.data
            }
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_SUCCESS:
            return {
                ...state,
                orders: action.data
            }
        default: return { ...state };

    }

}