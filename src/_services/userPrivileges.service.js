import { authHeader, config, Utils } from '../_helpers';
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
    return fetch(config.apiUrl + '/roles/getPrivilgesByParticipantId?participantId='+user.email, requestOptions)
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
    return fetch(config.apiUrl + '/roles/createUserPrivilges', requestOptions)
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
    return fetch(config.apiUrl + '/roles/updateUserPrivilges', requestOptions)
        .then(handleResponse)
        .catch(handleError);

    

}

