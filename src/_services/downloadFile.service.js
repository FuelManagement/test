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

    return fetch(config.apiUrl + '/product/downloadFileForParticipnt', requestOptions).then(handleResponse, handleError)
    .then(result=> {console.log(result);fileUtility.downloadDoc(result,collection.mimetype,collection.originalname)});

}
