import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import { onboardActions } from '../_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authHeader, config, Utils } from '../_helpers';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.onboard.documentslist !== undefined ? this.props.onboard.documentslist : []
        };
        this.props.dispatch(onboardActions.changeFormState(this.props.onboard.mode === 'create' ? false : true));
        this.downloadFile = this.downloadFile.bind(this);
    }
    downloadFile(file) {
        let formData = { file };
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(formData)
        };
        return fetch(config.apiUrl + '/product/downloadFile', requestOptions)
        .then((response) => response.blob())
        .then((blob) => {
            console.log(blob);
            if(!blob.size){
                alert("Inlvalid/ tempered File. Cannot Download.");
                throw new Error("File size 0. tempered File");
            }
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.originalname);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((error) => {
            console.log(error);
            alert("Error while downloading file. Please retry.");
        });
    }
    render() {
        return (
            <div>
                <FilePond allowMultiple={true} files={this.state.files} onupdatefiles={fileItems => {
                    this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                    });
                    this.props.dispatch(onboardActions.uploadParticipantFile(this.state.files));
                    if (this.state.files.length > 0) {
                        this.props.dispatch(onboardActions.changeFormState(true));
                    }
                    else {
                        this.props.dispatch(onboardActions.changeFormState(false));
                    }
                }}
                labelIdle='Upload Files <span class="filepond--label-action">Upload Files</span>' />

                {this.props.onboard.downloadDocumentslist !== undefined && 
                    this.props.onboard.downloadDocumentslist !== null && 
                    this.props.onboard.downloadDocumentslist.length > 0 && 
                    this.props.mode !== 'create' ? 
                <div >
                    <ul className="fa-ul">
                        {this.props.onboard.downloadDocumentslist.map(item =>
                            <li>
                                <button className="btn btn-outline btn-default" onClick={() => this.downloadFile(item)}>
                                    <i className="fa fa-file"></i> {item.filename}
                                </button>
                            </li>
                        )}
                    </ul>
                </div> 
                : null}
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { onboard } = state;

    return {
        onboard

    };
}

const connectedUpload = connect(mapStateToProps)(Upload);
export { connectedUpload as Upload };
