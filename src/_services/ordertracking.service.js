import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';
export const OrderTrackingService= {
     getOrderTrackingProgress
}


function getOrderTrackingProgress(){
    return Promise.resolve(Common_JsonData.orderTrackingDetails);
    //ToDo: Add API to fetch order tracking details
}
