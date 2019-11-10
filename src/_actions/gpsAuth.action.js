import { gpsAuthConstants } from '../_constants';
import { alertActions } from './';
<<<<<<< HEAD

export const gpsAuthActions = {
    getCustomerByCarrierId,
    otrGpsAuthForCustomer
}


function getCustomerByCarrierId() {

    console.log("Get Auth Dispatched");

    return dispatch => {
        success("Received");
    }

    function request() { return { type: gpsAuthConstants.GETCUSTOMEREQUEST } }
    function success(data) { return { type: gpsAuthConstants.GETCUSTOMERSUCCESS, data } }
    function failure(error) { return { type: gpsAuthConstants.GETCUSTOMERFAILURE, error } }
=======
import { gpsAuthService } from '../_services';


export const gpsAuthActions = {
    getCustomerByCarrierId,
    otrGpsAuthForCustomer,
    getCustomerOrders
}

function getCustomerByCarrierId() {
    return dispatch => {
        dispatch(alertActions.loading());
        gpsAuthService.getCustomerByCarrierId()
        .then(
            customerNames => {
                dispatch(success(customerNames));
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: gpsAuthConstants.GET_CUSTOMER_REQUEST } }
    function success(customerNames) { return { type: gpsAuthConstants.GET_CUSTOMER_SUCCESS, customerNames } }
    function failure(error) { return { type: gpsAuthConstants.GET_CUSTOMER_FAILURE, error } }
>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
}

function otrGpsAuthForCustomer() {


    function request() { return { type: gpsAuthConstants.SUBMITINGGPSAUTHFORCUSTOMERREQUEST } }
    function success(data) { return { type: gpsAuthConstants.GPSAUTHFORCUSTOMERSUCCESS, data } }
    function failure(error) { return { type: gpsAuthConstants.GPSAUTHFORCUSTOMERFAILURE, error } }

}

<<<<<<< HEAD
=======
function getCustomerOrders(data){
    return dispatch => {
        dispatch(alertActions.loading());
        gpsAuthService.getCustomerOrders(data)
        .then(
            orders => {
                dispatch(success(orders));
                dispatch(alertActions.clearLoading());
            },
            error => {
                dispatch(failure(error))
                dispatch(alertActions.clearLoading());
            }
        );
    };

    function request() { return { type: gpsAuthConstants.GET_CUSTOMER_ORDERS_REQUEST } }
    function success(customerOrders) { return { type: gpsAuthConstants.GET_CUSTOMER_ORDERS_SUCCESS, customerOrders } }
    function failure(error) { return { type: gpsAuthConstants.GET_CUSTOMER_ORDERS_FAILURE, error } }
}

>>>>>>> 12cc4a0c5fd8062edd3589a4c3bdd54527abb84f
