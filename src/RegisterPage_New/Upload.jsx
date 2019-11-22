import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import { onboardActions } from '../_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { downloadFileService } from '../_services/downloadFile.service';
import { authHeader, config, Utils, fileUtility } from '../_helpers'; 
import ReactTable from 'react-table';
import { Table_Config } from '../_helpers';
import { TextField, Select, InputLabel, MenuItem, Checkbox, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';
const documents = {
    data: [
        {
            value: "",
            label: "None"
        }, {
            value: "Incorporation",
            label: "Incorporation"
        }
    ],
}
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(null, this);  
        this.props.dispatch(onboardActions.changeFormState(this.props.onboard.mode === 'create' ? false : true));
        this.handleAddUpload = this.handleAddUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    initialState(mode, props) {
        let state = {};
        state = {
            files: this.props.onboard.documentslist !== undefined ? this.props.onboard.documentslist : [],
            controls: {

            documents: {
                value: props !== undefined && props.documents !== undefined ? props.documents : '',
            },
        },
            showUploadForm: false,
            filedsetTitle: 'Add Document',
            uploadData:[
                {document:'Document'},
            ]
        }
        return state;
    }
    editUploadInfo(e){
        console.log("Edit upload information");
        this.setState({
            filedsetTitle: 'Edit Document',
            showUploadForm:true
        })
    }
    pdfUploadsubmit(event){
        //Pdf upload method here
        console.log("upload method ");
    }
    handleChange(event) {
        let key = event.target.name;
        let value =  event.target.value;
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: true,
                        touched: true
                    }
                }
            };
        });

    }

    download(collection) {
        downloadFileService.downloadFileForParticipnt(collection);
    }
    handleAddUpload(event) {
        this.setState({
            showUploadForm: true
        })
    }
    render() {
        return (
            <div>
                <div className='register-add-upload'>
                    <Button className="add-documents-button"
                        variant="contained"
                        onClick={(e) => this.handleAddUpload(e)}>Add Documents
                    </Button>
                </div>
                {this.state.showUploadForm && <div className="">
                    <fieldset className='tax-details-filedset upload-fieldSet'>
                        <legend className='tax-details-legend'>{this.state.filedsetTitle}</legend>
                        <div className="row">
                            <div className="col-md-6">
                            <TextField
                                select
                                id="documents"
                                name="documents"
                                label="documents"
                                value={this.state.controls.documents.value}
                                onChange={this.handleChange}
                                className="form-control"
                                margin="dense"
                                variant="outlined"
                                error={!this.state.controls.documents.valid && this.state.controls.documents.touched}
                            >
                                {documents && documents.data.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </div>
                            <div className="col-md-5">
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
                            labelIdle='<span class="filepond--label-action">Upload Documents</span>' />
                            </div>
                        </div>
                        

                        {this.props.onboard.downloadDocumentslist !== undefined &&
                            this.props.onboard.downloadDocumentslist !== null &&
                            this.props.onboard.downloadDocumentslist.length > 0 &&
                            this.props.mode !== 'create' ?
                            <div >
                                <ul className="fa-ul">
                                    {this.props.onboard.downloadDocumentslist.map(item =>
                                        <li>
                                            <span class="fa-li">
                                                <FontAwesomeIcon icon={fileUtility.fileIcon(item.originalname)} size="1x" />
                                            </span>
                                            <a onClick={() => this.download(item)} href="JavaScript:Void(0);">{item.originalname}</a>
                                            <span >
                                                {fileUtility.bytesToSize(item.size)}
                                            </span>
                                            <span >
                                                <FontAwesomeIcon icon="trash" size="1x" />
                                            </span>
                                        </li>
                                    )}

                                </ul>

                            </div>
                            : null}
                    </fieldset>
                </div>}
                <div className="upload-react-tabe-div">
                    <ReactTable
                        data={this.state.uploadData || []}
                        columns={Table_Config.RegisterUploadInfoTable.RegisterUploadInfoTables.columns({ editUploadInfo: this.editUploadInfo.bind(this),pdfUploadsubmit:this.pdfUploadsubmit.bind(this) })}
                        {...Table_Config.RegisterUploadInfoTable.RegisterUploadInfoTables.options}
                    />
                </div>

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
