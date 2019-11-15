import { authHeader, config, Utils, fileUtility } from '../_helpers';
const { handleError, handleResponse } = Utils;
import $ from 'jquery';

export const downloadFileService = {
    downloadFileForParticipnt,
    downloadFileForOrder
};

function downloadFileForParticipnt(collection) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
      body: JSON.stringify({"file": {

            "originalname": collection.originalname,
            "path": collection.path.replace(/\\/g, "\\\\")
                   }})
                }
   
    
    return fetch(config.apiUrl + '/product/downloadFileForParticipnt', requestOptions)
    
    .then(response => response.blob())
    .then(result=> {fileUtility.downloadDoc(result,collection.mimetype,collection.originalname)}).catch((error) => {
        console.log(error);
        alert("Error while downloading file. Please retry.");
    });

}

function downloadFileForOrder(collection) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
      body: JSON.stringify({"file": {

            "originalname": collection.originalname,
            "path": collection.path.replace(/\\/g, "\\\\")
                   }})
                }
   
    
    return fetch(config.apiUrl + '/product/downloadFileForParticipnt', requestOptions)
    
    .then(response => response.blob())
    .then(result=> {fileUtility.downloadDoc(result,collection.mimetype,collection.originalname)}).catch((error) => {
        console.log(error);
        alert("Error while downloading file. Please retry.");
    });

}
