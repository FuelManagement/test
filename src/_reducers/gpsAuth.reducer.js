import { gpsAuthConstants } from '../_constants';

export function gpsAuth(state = {}, action) {

    switch (action.type) {
        case gpsAuthConstants.GET_CUSTOMER_REQUEST:
        case gpsAuthConstants.GET_CUSTOMER_ORDERS_REQUEST:
                return {
                ...state,
                loading: true
            };
        case gpsAuthConstants.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.customerNames,
            };
        case gpsAuthConstants.GET_CUSTOMER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customerOrders: action.customerOrders,
            };
        case gpsAuthConstants.GET_CUSTOMER_FAILURE:
        case gpsAuthConstants.GET_CUSTOMER_ORDERS_FAILURE:
                return {
                ...state,
                error: action.error
            };

        case gpsAuthConstants.SUBMITINGGPSAUTHFORCUSTOMERREQUEST:
            return {
                ...state,
                loading: true
            };
        case gpsAuthConstants.GPSAUTHFORCUSTOMERSUCCESS:
            return {
                ...state,
                loading: false,
                addedData: action.data,
            };

        case gpsAuthConstants.GPSAUTHFORCUSTOMERFAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }

}