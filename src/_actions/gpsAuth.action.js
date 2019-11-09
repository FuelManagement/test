import { gpsAuthConstants } from '../_constants';
import { alertActions } from './';

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
}

function otrGpsAuthForCustomer() {


    function request() { return { type: gpsAuthConstants.SUBMITINGGPSAUTHFORCUSTOMERREQUEST } }
    function success(data) { return { type: gpsAuthConstants.GPSAUTHFORCUSTOMERSUCCESS, data } }
    function failure(error) { return { type: gpsAuthConstants.GPSAUTHFORCUSTOMERFAILURE, error } }

}

