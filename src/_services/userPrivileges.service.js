import { authHeader, config, Utils,APIURL }from '../_helpers';
const { handleError, handleResponse } = Utils;

export const userPrivilegesService = {
    getUserPrivilegesByParticipant,
    createUserPrivilegesForParticipant,
    updateUserPrivilegesForParticipant,

};
function getUserPrivilegesByParticipant() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
return fetch(APIURL.GET_ALL_USER_PRIVILEGES+'?participantId='+user.email, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}
function createUserPrivilegesForParticipant(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    let requestData = {
       
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(APIURL.CREATE_USER_PRIVILEGES, requestOptions)
        .then(handleResponse)
        .catch(handleError);
   

}
function updateUserPrivilegesForParticipant(collection)
{
    console.log("update collection",collection);
    let user = JSON.parse(localStorage.getItem('user'));
    let requestData = {
       
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(APIURL.UPDATE_USER_PRIVILEGES, requestOptions)
        .then(handleResponse)
        .catch(handleError);

    

}
