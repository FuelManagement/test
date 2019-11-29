import { authHeader, config, Utils } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const onboardService = {
    getAllOnBoarder,
    createOnBoarder,
    getAllParticipant,
    createParticipant,
    updateParticipant,
    getParticipant,
    uploadFile,
    approveParticipant
};
function getAllOnBoarder() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/admin/getAllParticipants', requestOptions)
        .then(handleResponse)
}
function createOnBoarder(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    let formData = {
        "firstName": collection.FirstName.value,
        "lastName": collection.LastName.value,
        "domain": collection.Domain.value,
        "email": user.email,
        "registerId": collection.Email.value,
        "password": 'drtdtd',
        "participantType": collection.ParticipantType.value,
        "isCompany": true,
        "streetAddress": collection.StreetAddress.value,
        "streetAddress2": collection.StreetAddress2.value,
        "streetAddress3": collection.StreetAddress3.value,
        "City": collection.City.value,
        "State": collection.State.value,
        "zip": collection.ZipCode.value,
        "country": collection.Country.value,
        "contactNo": collection.Phone.value,
        "taxId": collection.TaxId.value,
        "organisation": collection.OrganizationName.value
    };
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };

    return fetch(config.apiUrl + '/product/createParticipant', requestOptions).then(handleResponse, handleError);

}
function getAllParticipant() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getParticipants', requestOptions)
        .then(handleResponse)
}

function createParticipant(collection, Documentslist) {
    collection.isIdentityCreated = false;
    collection.firstName = "test";
    collection.lastName = "test";
    
    let user = JSON.parse(localStorage.getItem('user'));
if(user!==undefined && user!==null)
{
    collection.email=user.email;
}
  
let array=[];
collection.taxDetails.forEach(item=>{let collectTax={taxNumber:item.taxNumber,taxType:item.taxType};array.push(collectTax)});
collection.taxDetails=array;
const requestOptions = {
    method: 'POST',
    headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',

        'Content-Length': '1315',
        'Accept-Encoding': 'gzip, deflate',
        Host: '192.168.1.2:30089',

        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': '*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection)
};
return fetch(config.apiUrl + '/product/createParticipant', requestOptions)
.then(handleResponse,handleError).then(participant=>
    {
        console.log(participant);
        return uploadFile(Documentslist,participant.participantID)
    });
}
function updateParticipant(collection, Documentslist,downloadDocumentslist)
{

    let user = JSON.parse(localStorage.getItem('user'));
    collection.email=user.email;
    collection._id=undefined;
    let tokenObj = JSON.parse(localStorage.getItem('token'));
    // return uploadFile(Documentslist)
    //     .then(uploadResponse => {
    //         collection.Documentslist = downloadDocumentslist.concat(JSON.parse(uploadResponse));
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify(collection)
            };
     return fetch(config.apiUrl + '/product/updateParticipant', requestOptions).then(handleResponse, handleError);


      

}
function getParticipant(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getParticipants', requestOptions)
        .then(handleResponse)
}
function uploadFile(collection,participantId) {
    return new Promise((resolve, reject) => {
        var form = new FormData();
        for (let i = 0; i < collection.length; i++) {
            form.append("file", collection[i]);
        }
        form.append('participantID',participantId);
        // let tokenObj = JSON.parse(localStorage.getItem('token'));
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.apiUrl + '/product/uploadFileForParticipant',
            "method": "POST",
            "headers": {
                "Content-Type": undefined,
                // "Authorization": 'Bearer '+tokenObj.token,
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "cache-control": "no-cache"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        $.ajax(settings).done(function (response) {
            resolve(response);
        });
    })
}
function approveParticipant(data) {



    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(config.apiUrl + '/product/enrollParticipant', requestOptions)
        .then(handleResponse)
}
