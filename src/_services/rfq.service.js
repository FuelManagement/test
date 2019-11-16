import { authHeader, config, Utils, API_Helpers } from '../_helpers';
const { handleError, handleResponse } = Utils;
import { rfq as dummyData } from "../../server";

export const rfqService = {
    getAllRfq,
    postNewRfq,
    getAllProducts,
    getAllParticipant,
    getAllRfqToUser,
    updateRfq
};

function getAllRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let email = user.participantID === undefined ? user.registerId : user.email;
    return fetch(config.apiUrl + '/product/getRFQListByFromUserID?userID='+email, requestOptions)
    .then(handleResponse)
    .then((data)=> data.rfqs)
    .catch(err => {
        // handleError(err)
        return [];
    })
}

function getAllRfqToUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let email = user.participantID === undefined ? user.registerId : user.email;
    return fetch(config.apiUrl + '/product/getRFQListByToUserID?userID='+email, requestOptions)
    .then(handleResponse)
    .then(data=> data.rfqs)
    .catch(err => {
        // handleError(err)
        return [];
    })
}

function postNewRfq(formData){
   let collection=JSON.parse(JSON.stringify(formData));
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user.participantID === undefined ? user.registerId : user.email;
    collection.userID = user.registerId;
    collection.role = user.role;
    collection.status = 'Created';
    collection.fromUserID=user.registerId;
    collection.toUserId = formData.participantId;
    collection.products=[];
if(formData.products!==undefined && formData.products.length>0){
formData.products.forEach(element => {
    if(element.rowAction!==undefined){
        element.rowAction=undefined;
    }
    collection.products.push(element);
});
}
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };
    
    return fetch(config.apiUrl + '/product/createRFQ', requestOptions).then(handleResponse, handleError);
}
function getAllProducts(){
    return API_Helpers.getAllProducts();
}
function getAllParticipant(){
    return API_Helpers.getAllParticipant();
}
function updateRfq(formData){
    console.log('3. I am in update')
    let user = JSON.parse(localStorage.getItem('user'));
    formData.userID = user.registerId;
    formData.role = user.role;git 
    formData.status = 'Updated';
    formData.fromUserID=user.registerId;
    formData.toUserId = formData.participantId;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    // return fetch(config.apiUrl + '/product/editRFQ', requestOptions)
    // .then(handleResponse)
    // .then(()=> dummyData)
    // .catch(err => {
    //     // handleError(err)
    //     return dummyData;
    // })
    return fetch(config.apiUrl + '/product/editRFQ', requestOptions).then(handleResponse, handleError);
}