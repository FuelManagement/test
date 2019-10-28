import { authHeader, config, Utils, fileUtility } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const downloadFileService = {
    downloadFile
};

function downloadFile(collection) {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({'file':collection})
    };

    return fetch(config.apiUrl + '/product/downloadFile', requestOptions)
    .then(response => {
        if(!resposne.ok){
            throw new Error("Error while downloading file");
        }
        return response;
    })
    .then(response => response.blob())
    .then(result=> {fileUtility.downloadDoc(result,collection.mimetype,collection.originalname)}).catch((error) => {
        console.log(error);
        alert("Error while downloading file. Please retry.");
    });;

}
