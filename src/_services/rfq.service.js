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
    
    return fetch(config.apiUrl + '/product/getRFQListByFromUserID?userID='+user.registerId, requestOptions)
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
    return fetch(config.apiUrl + '/product/getRFQListByToUserID?userID='+user.registerId, requestOptions)
    .then(handleResponse)
    .then(data=> data.rfqs)
    .catch(err => {
        // handleError(err)
        return [];
    })
}

function postNewRfq(formData){
    console.log('3. I am in Create')
    let user = JSON.parse(localStorage.getItem('user'));
    formData.userID = user.registerId;
    formData.role = user.role;
    formData.status = 'Created';
    formData.fromUserID=user.registerId;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    // return fetch(config.apiUrl + '/product/createRFQ', requestOptions)
    // .then(handleResponse)
    // .then(()=> dummyData)
    // .catch(err => {
    //     // handleError(err)
    //     return dummyData;
    // })


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
    formData.role = user.role;
    formData.status = 'Updated';
    formData.fromUserID=user.registerId;
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