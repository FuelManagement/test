import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

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
   
}
function createUserRolesForParticipant(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
   const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

   

}
function updateUserRolesForParticipant(collection)
{
    let user = JSON.parse(localStorage.getItem('user'));
    collection.userID= user.email;
    collection._id= undefined;
 
    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(collection)
    };

    

}

