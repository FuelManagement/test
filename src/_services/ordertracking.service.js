import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';
export const OrderTrackingService= {
    getOTRDetailsBysupplier,
    getOrderTrackingProgress
}
function getOTRDetailsBysupplier() {
    const OrderReqDetails = Common_JsonData.orederTrackingRequestDetails;
    return OrderReqDetails;
    // let user = JSON.parse(localStorage.getItem('user'));
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    //return data;//fetch(config.apiUrl + '/ordertracking/getOTRDetailsBysupplier', requestOptions).then(handleResponse)
}

function getOrderTrackingProgress(){
    return Promise.resolve(Common_JsonData.orderTrackingDetails);
    //ToDo: Add API to fetch order tracking details
}
