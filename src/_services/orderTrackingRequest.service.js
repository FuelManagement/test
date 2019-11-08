import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const OrderTrackingRequestService= {
    getOTRDetailsBysupplier
}
function getOTRDetailsBysupplier() {
    const OrderReqDetails=Common_JsonData.orederTrackingRequestDetails;
    return Promise.resolve(OrderReqDetails);
    // let user = JSON.parse(localStorage.getItem('user'));
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    //return data;//fetch(config.apiUrl + '/ordertracking/getOTRDetailsBysupplier', requestOptions).then(handleResponse)
}