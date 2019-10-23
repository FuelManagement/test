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
    uploadFile
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
        "firstName" :  collection.FirstName.value,
        "lastName" : collection.LastName.value,
        "domain" : collection.Domain.value,
        "email" : user.email,
        "registerId" : collection.Email.value,
        "password" : 'drtdtd',
        "participantType" : collection.ParticipantType.value,
        "isCompany" : true,
        "streetAddress" : collection.StreetAddress.value,
        "City" : collection.City.value,
        "State" : collection.State.value,
        "zip" : collection.ZipCode.value,
        "country" : collection.Country.value,
        "contactNo" : collection.Phone.value,
        "taxId" : collection.TaxId.value,
        "organisation" : collection.OrganizationName.value
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

function createParticipant(collection,Documentslist)
{
collection.defaultEmailaddress='yes';
collection.clearingBetCustAndVend="Yes";
collection.hash="$2a$10$Vl7Qk6VNTUQLSCBVQR77oOSGDZ9g86RkvMmesDWWIJOV/h5Ybd0pm";
collection.status=0;
collection.isIdentityCreated=false;
collection.pubKey="";
collection.priKey="";
collection.Documentslist=[];
collection["cert_id"]="";

return uploadFile(Documentslist)
    .then(uploadResponse => {
        collection.Documentslist=uploadResponse;
    const requestOptions = {
        method: 'POST',
       headers: { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       
       'Content-Length': '1315',
       'Accept-Encoding': 'gzip, deflate',
       Host: '192.168.1.2:3009',
       
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': '*',
       'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
    };

    return fetch(config.apiUrl + '/product/createParticipant', requestOptions).then(handleResponse, handleError);

})
    
}
function updateParticipant(collection,Documentslist)
{
    
return uploadFile(Documentslist)
    .then(uploadResponse => {
        collection.Documentslist=uploadResponse;
    const requestOptions = {
        method: 'POST',
       headers: { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       
       'Content-Length': '1315',
       'Accept-Encoding': 'gzip, deflate',
       Host: '192.168.1.2:3009',
       
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': '*',
       'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
    };
console.log(collection);
    return fetch(config.apiUrl + '/product/updateParticipant', requestOptions).then(handleResponse, handleError);

})
    
}
function getParticipant(collection){
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/product/getParticipants', requestOptions)
    .then(handleResponse)
}
function uploadFile(collection)
{
    return new Promise((resolve, reject) => {
        var form = new FormData();
        for(let i=0; i<collection.length; i++){
            form.append("file", collection[i]);
        }
       // let tokenObj = JSON.parse(localStorage.getItem('token'));
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.apiUrl + '/product/uploadFile',
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