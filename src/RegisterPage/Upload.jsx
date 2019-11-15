import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import { onboardActions } from '../_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {downloadFileService} from '../_services/downloadFile.service';
import { authHeader, config, Utils, fileUtility } from '../_helpers';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.onboard.documentslist !== undefined ? this.props.onboard.documentslist : []
        };
        this.props.dispatch(onboardActions.changeFormState(this.props.onboard.mode === 'create' ? false : true));

    }

    download(collection){
        downloadFileService.downloadFileForParticipnt(collection);
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
                labelIdle='Document <span class="filepond--label-action">Add Document</span>' />

                {this.props.onboard.downloadDocumentslist !== undefined &&
                    this.props.onboard.downloadDocumentslist !== null &&
                    this.props.onboard.downloadDocumentslist.length > 0 &&
                    this.props.mode !== 'create' ?
                <div >
                    <ul className="fa-ul">
                    {this.props.onboard.downloadDocumentslist.map(item=>
                    <li><span class="fa-li"> <FontAwesomeIcon icon={fileUtility.fileIcon(item.originalname)} size="1x"/> </span>
                    <a onClick={()=>this.download(item)} href="JavaScript:Void(0);">{item.originalname}</a>
                    <span > {fileUtility.bytesToSize(item.size)} </span> <span > <FontAwesomeIcon icon="trash" size="1x"/> </span></li>
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
