import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const OrderTrackingRequestService= {
    getOTRDetailsBysupplier,
    postOTRAuthDetailsForCustomer
}
function getOTRDetailsBysupplier() {
   
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/otr/GetOTRDetailsBysupplier?supplierID='+user.participantID, requestOptions).then(handleResponse)
}
function postOTRAuthDetailsForCustomer(data) {
    let user = JSON.parse(localStorage.getItem('user'));
    data.CreatedBy=user.email;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/otr/postOTRAuthDetailsForCustomer', requestOptions).then(handleResponse, handleError);
}