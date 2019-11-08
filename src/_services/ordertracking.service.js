import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';
export const OrderTrackingService= {
     getOrderTrackingProgress,
     listOrderTracking,
     submitTrackRequest
}

function getOrderTrackingProgress(){
    return Promise.resolve(Common_JsonData.orderTrackingDetails.progressData);
    //ToDo: Add API to fetch order tracking details
}

function listOrderTracking(){
    return Promise.resolve(Common_JsonData.orderTrackingDetails.list);
    //ToDo: Add API to fetch order tracking details
}

function submitTrackRequest(data){
    return Promise.resolve("Submitted");
}
