import React from 'react';
import { authHeader, config, Utils } from '../_helpers';

class DocumentModal extends React.Component {
    constructor(props){
        super(props);
        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile(file){
        let formData = { file };
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(formData)
        };
        return fetch(config.apiUrl + '/product/downloadFile', requestOptions)
        .then((response) => response.blob())
        .then((blob) => {
            if(!blob.size){
                alert("Inlvalid/ tempered File. Cannot Download.");
                throw new Error("File size 0. tempered File");
            }
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.document_original_name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getLocalDateString(timestamp){
        return new Date(Number(timestamp)).toLocaleDateString()
    }
 
    render(){
        const { files=[], show } = this.props;
        if(show){
            $('#documentModal').modal('show');
        } else {
            $('#documentModal').modal('hide');
        }
        return (
            <div className="modal" tabIndex="-1" role="dialog" id="documentModal" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Documents</h5>
                            <button type="button" className="close" onClick={e => this.props.closeModal(e)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Document Name</th>
                                        <th scope="col">Uploaded On</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files && files.length && files.map((row, idx)=>(
                                        <tr key={row.document_name}>
                                            <td>{row.document_original_name}</td>
                                            <td>{this.getLocalDateString(row.document_creation_time)}</td>
                                            <td>
                                                <button className="btn btn-default" onClick={e => this.downloadFile(row)}>
                                                    <span className="fa fa-download"></span>
                                                </button>
                                            </td>
                                        </tr>)
                                    )}
                                </tbody>
                            </table>
                            {
                                this.props.alertType && this.props.alertMessage ? (
                                    <div className={`alert alert-${this.props.alertType}`} role="alert">
                                        {this.props.alertMessage}
                                    </div>
                                ):""
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { DocumentModal }