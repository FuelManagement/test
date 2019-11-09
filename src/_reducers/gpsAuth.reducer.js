import { gpsAuthConstants } from '../_constants';

export function gpsAuth(state = {}, action) {

    switch (action.type) {
        case gpsAuthConstants.GET_CUSTOMER_REQUEST:
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
        case gpsAuthConstants.GET_CUSTOMER_FAILURE:
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