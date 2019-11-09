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

function listOrderTracking(participantID){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getPOByParticipantID?participantID='+participantID+'&userID='+user.email, requestOptions)
    .then(handleResponse)
}

function submitTrackRequest(data){
    return Promise.resolve("Submitted");
}
