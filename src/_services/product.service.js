import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const productService = {
    getAllProduct,
    createProduct,
    updateProduct,
    getProduct,
};
function getAllProduct() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getProductList?userID='+user.email, requestOptions)
    .then(handleResponse)
}
function createProduct(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
    collection.role= user.role;
    collection.productStatus= collection.productStatus!==undefined?collection.productStatus.toString():'true';
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

    return fetch(config.apiUrl + '/product/createProduct', requestOptions).then(handleResponse, handleError);

}
function updateProduct(collection)
{
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
    collection.role= user.role;
   // collection.productStatus= collection.productStatus!==undefined?collection.productStatus.toString():'true';
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

    return fetch(config.apiUrl + '/product/editProduct', requestOptions).then(handleResponse, handleError);

}
function getProduct(collection){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/admin/getAllParticipants', requestOptions)
    .then(handleResponse)
}
