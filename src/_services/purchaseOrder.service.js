import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const purchaseOrderService = {
    getAllPOList
};
function getAllPOList() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getPOList?userID='+user.email, requestOptions)
    .then(handleResponse)
}