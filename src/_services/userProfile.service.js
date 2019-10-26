import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const userProfileService = {
    getAllUserProfile,
    createUserProfile,
    updateUserProfile,
    getUserProfile,
};
function getAllUserProfile() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getSubUsersById?email='+user.email, requestOptions)
    .then(handleResponse)
}
function createUserProfile(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
   const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

    return fetch(config.apiUrl + '/users/register', requestOptions).then(handleResponse, handleError);

}
function updateUserProfile(collection)
{
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
 
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

    return fetch(config.apiUrl + '/product/updateSubUsers', requestOptions).then(handleResponse, handleError);

}
function getUserProfile(collection){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/users/register', requestOptions)
    .then(handleResponse)
}
