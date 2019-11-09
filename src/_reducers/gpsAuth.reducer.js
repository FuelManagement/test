import { gpsAuthConstants } from '../_constants';


export function gpsAuth(state = {}, action) {

    switch (action.type) {

        case gpsAuthConstants.GETCUSTOMEREQUEST:
            return {
                ...state,
                loading: true
            };
        case gpsAuthConstants.GETCUSTOMERSUCCESS:
            return {
                ...state,
                loading: false,
                customerAndOrderList: action.data,
            };

        case gpsAuthConstants.GETCUSTOMERFAILURE:
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