import { gpsAuthConstants } from '../_constants';
import { alertActions } from './';
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
}

function otrGpsAuthForCustomer(customerDetail) {

    return dispatch => {
        dispatch(alertActions.loading());
        return gpsAuthService.otrGpsAuthForCustomer(customerDetail)
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
    }

    function request() { return { type: gpsAuthConstants.SUBMITING_GPS_AUTH_FOR_CUSTOMER_REQUEST } }
    function success(data) { return { type: gpsAuthConstants.GPS_AUTH_FOR_CUSTOMER_SUCCESS, data } }
    function failure(error) { return { type: gpsAuthConstants.GPS_AUTH_FOR_CUSTOMER_FAILURE, error } }

}

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

