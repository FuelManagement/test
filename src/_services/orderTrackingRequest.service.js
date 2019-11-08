import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';
const OrderReqDetails=Common_JsonData.orederTrackingRequestDetails;

export const OrderTrackingRequestService= {
    getOTRDetailsBysupplier
}
function getOTRDetailsBysupplier() {
    console.log('req',OrderReqDetails.data);
    return OrderReqDetails;
    // let user = JSON.parse(localStorage.getItem('user'));
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    //return data;//fetch(config.apiUrl + '/ordertracking/getOTRDetailsBysupplier', requestOptions).then(handleResponse)
}