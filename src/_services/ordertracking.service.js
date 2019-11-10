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
   /*
   "paticipentId":"tarunkathuria.info@gmail.com",
	"userId":"nand@sieplinc.com",
	"supplierId":"SupplierId",
	"poNumber":"21034",
    "requestOwner":"SupplierName"
    */
  
   let user = JSON.parse(localStorage.getItem('user'));

   let payload = {
    "paticipentId":"tarunkathuria.info@gmail.com",
	"userId":"nand@sieplinc.com",
	"supplierId":data.supplierId,
	"poNumber":data.poNumber,
    "requestOwner":data.supplierName,
                   
   }
  
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };

    return fetch(config.apiUrl + '/otr/postOTRForUserId', requestOptions).then(handleResponse, handleError);

}
function submitOTPRequest(data){
    let user = JSON.parse(localStorage.getItem('user'));
  //  data.userid="user.email";
    data.userId="nand@sieplinc.com";
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/otr/post2FAForOTRByUserId', requestOptions).then(handleResponse, handleError);

}
