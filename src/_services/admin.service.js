import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;

export const adminService = {
    getAllUsers,
    approveUser
};

function getAllUsers() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/admin/getAllUsers', requestOptions)
    .then(handleResponse)
    .catch(handleError);
}


function approveUser(row) {
    let formData = {
        recordID: row._id, 
        userRole:row.role,
        approveRejectValue:row.action == "approve"?"2":"1",
        email:row.email,
        name:row.first_name,
        address: row.address
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    return fetch(config.apiUrl + '/admin/adminUserApprovalOperation', requestOptions).then(handleResponse, handleError);
}