import { gpsAuthConstants } from '../_constants';

<<<<<<< HEAD
<<<<<<< HEAD

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
=======
export function gpsAuth(state = {}, action) {
=======
export function gpsAuth(state = {customers:[],customerOrders:[],addedData:[]}, action) {
>>>>>>> eabe38a0f62306f13f382771ffc0853cdb8db57b

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
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
                error: action.error
            };

        case gpsAuthConstants.SUBMITING_GPS_AUTH_FOR_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case gpsAuthConstants.GPS_AUTH_FOR_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                addedData: action.data,
            };

        case gpsAuthConstants.GPS_AUTH_FOR_CUSTOMER_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }

}