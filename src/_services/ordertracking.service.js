import { authHeader, config, Utils,Common_JsonData } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';
export const OrderTrackingService= {
     getOrderTrackingProgress,
     listOrderTracking,
     submitTrackRequest,
     submitOTPRequest,
     
}

function getOrderTrackingProgress(){
    //return Promise.resolve(Common_JsonData.orderTrackingDetails.progressData);
    //ToDo: Add API to fetch order tracking details
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/otr/GetOTDetailsByUserId', requestOptions)
    .then(handleResponse)
}

function listOrderTracking(){
    //return Promise.resolve(Common_JsonData.orderTrackingDetails.list);
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // return fetch(config.apiUrl + '/product/getPOByParticipantID?participantID='+user.participantID+'&userID='+user.email, requestOptions)
    // .then(handleResponse)
    return fetch(config.apiUrl + '/otr/getOTRByParticipantId?participantID=tarunkathuria.info@gmail.com&userID=sureshboddu90@gmail.com', requestOptions)
    .then(handleResponse)
}

function submitTrackRequest(data){
   // return Promise.resolve("Submitted");
   let user = JSON.parse(localStorage.getItem('user'));
    data.userId=user.email;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/otr/postOTRForUserId', requestOptions).then(handleResponse, handleError);

}
function submitOTPRequest(data){
    let user = JSON.parse(localStorage.getItem('user'));
    data.userid=user.email;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/otr/post2FAForOTRByUserid', requestOptions).then(handleResponse, handleError);

}
