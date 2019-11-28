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
    let participantId = user.participantID === undefined ? user.registerId : user.participantID;
    let userId =  user.participantID === undefined ? user.registerId : user.emailid;
    let requestData = {        
        participantId: participantId,
        roleType: collection.userRole,
        roleDescription: collection.description,
        userId:userId,
        createdBy:userId,
        createdOn: new Date().toLocaleDateString(),
        updatedBy: userId,
        updatedOn: new Date().toLocaleDateString(),
       
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(config.apiUrl + '/roles/createUserRole', requestOptions)
        .then(handleResponse)
        .catch(handleError);
   

}
function updateUserRolesForParticipant(collection)
{
    console.log("update collection",collection);
    let user = JSON.parse(localStorage.getItem('user'));
    let participantId = user.participantID === undefined ? user.registerId : user.participantID;
    let userId =  user.participantID === undefined ? user.registerId : user.emailid;
    let requestData = {
        participantId: participantId,
        roleType: collection.userRole,
        roleDescription: collection.description,
        _id: collection._id,   
        userId:userId,   
        updatedBy: userId,
        updatedOn: new Date().toLocaleDateString(),
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(requestData)
    };
    return fetch(config.apiUrl + '/roles/updateUserRole', requestOptions)
        .then(handleResponse)
        .catch(handleError);

    

}

