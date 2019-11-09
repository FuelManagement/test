import { orderTrackingConst } from '../_constants';

export function orderTracking(state = {}, action) {
    switch (action.type) {
        case orderTrackingConst.ORDER_TRACKING_LIST_REQUEST:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_REQUEST:
        case orderTrackingConst.ORDER_TRACKING_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderTrackingConst.ORDER_TRACKING_LIST_ERROR:
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_ERROR:
        case orderTrackingConst.ORDER_TRACKING_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case orderTrackingConst.ORDER_TRACKING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orderTrackingList: action.data
            }
        case orderTrackingConst.ORDER_TRACKING_PROGRESSBAR_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.data
            }
        case orderTrackingConst.ORDER_TRACKING_CREATE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default: return { ...state };

    }

}