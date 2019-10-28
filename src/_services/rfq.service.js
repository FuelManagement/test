import { authHeader, config, Utils, API_Helpers } from '../_helpers';
const { handleError, handleResponse } = Utils;
import { rfq as dummyData } from "../../server";

export const rfqService = {
    getAllRfq,
    postNewRfq,
    getAllProducts,
    getAllParticipant
};

function getAllRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getIOList?userID='+user.email, requestOptions)
    .then(handleResponse)
    .then(()=> dummyData)
    .catch(err => {
        // handleError(err)
        return dummyData;
    })
}
function postNewRfq(formData){
    let user = JSON.parse(localStorage.getItem('user'));
    formData.userID = user.email;
    formData.role = user.role;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    return fetch(config.apiUrl + '/product/createRFQ', requestOptions)
    .then(handleResponse)
    .then(()=> dummyData)
    .catch(err => {
        // handleError(err)
        return dummyData;
    })
}
function getAllProducts(){
    return API_Helpers.getAllProducts();
}
function getAllParticipant(){
    return API_Helpers.getAllParticipant();
}