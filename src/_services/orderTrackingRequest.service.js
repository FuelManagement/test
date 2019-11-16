import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const OrderTrackingRequestService= {
    getOTRDetailsBysupplier,
    postOTRAuthDetailsForCustomer
}
function getOTRDetailsBysupplier() {
   
    let user = JSON.parse(localStorage.getItem('user'));
    let participantId = user.participantID === undefined ? user.registerId : user.participantID;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };                                              //+user.participantID
    return fetch(config.apiUrl + '/otr/GetOTRDetailsBysupplier?supplierId='+participantId, requestOptions).then(handleResponse)
}
function postOTRAuthDetailsForCustomer(data) {
    let user = JSON.parse(localStorage.getItem('user'));
    data.loginUserId=user.email;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/otr/postOTRAuthDetailsForCustomer', requestOptions).then(handleResponse, handleError);
}