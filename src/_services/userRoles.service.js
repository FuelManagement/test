import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;

export const userRolesService = {
    getUserRolesByParticipant,
    createUserRolesForParticipant,
    updateUserRolesForParticipant,

};
function getUserRolesByParticipant() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/roles/getRolesByParticipantId?participantId='+user.email, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}
function createUserRolesForParticipant(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    let requestData = {
        updatedBy: user.email,
        updatedOn: new Date().toLocaleDateString(),
        participantId: user.email,
        roleType: collection.userRole,
        roleDescription: collection.description,
        createdOn: new Date().toLocaleDateString(),
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(config.apiUrl + '/roles/createUserRole?userId='+user.email, requestOptions)
        .then(handleResponse)
        .catch(handleError);
   

}
function updateUserRolesForParticipant(collection)
{
    console.log("update collection",collection);
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
     
    let requestData = {
        updatedBy: user.email,
        updatedOn: new Date().toLocaleDateString(),
        participantId: user.email,
        roleType: collection.userRole,
        roleDescription: collection.description,
        _id: collection._id,
        createdOn: new Date().toLocaleDateString(),
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(config.apiUrl + '/roles/updateUserRole?userId='+user.email, requestOptions)
        .then(handleResponse)
        .catch(handleError);

    

}

