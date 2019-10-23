import { authHeader, config, Utils, API_Helpers } from '../_helpers';
const { handleError, handleResponse } = Utils;
import { rfq as dummyData } from "../../server";

export const rfqService = {
    getAllRfq,
    postNewRfq,
    getAllProducts,
};

function getAllRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return Promise.resolve(dummyData);
    return fetch(config.apiUrl + '/producct/getProductList?userID='+user.email, requestOptions)
    .then(handleResponse)
    .then(()=> dummyData)
    .catch(err => {
        // handleError(err)
        debugger;
        return dummyData;
    })
}
function postNewRfq() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getProductList?userID='+user.email, requestOptions)
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