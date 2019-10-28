import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import {onboardActions} from '../_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: this.props.onboard.documentslist!==undefined?this.props.onboard.documentslist:[]
          };
          this.props.dispatch(onboardActions.changeFormState(this.props.onboard.mode==='create'?false:true));
    }
    render(){
        return(
            <div>
                <FilePond allowMultiple={true} files={this.state.files}  onupdatefiles={fileItems => {
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
           this.props.dispatch(onboardActions.uploadParticipantFile(this.state.files));
           if(this.state.files.length>0){
            this.props.dispatch(onboardActions.changeFormState(true));
           }
           else{
            this.props.dispatch(onboardActions.changeFormState(false));
           }
          }}
                labelIdle='Upload Files <span class="filepond--label-action">Upload Files</span>'/> 

                {this.props.onboard.downloadDocumentslist!==undefined && this.props.onboard.downloadDocumentslist!==null && this.props.onboard.downloadDocumentslist.length>0 && this.props.mode!=='create'?<div >
                    <ul className="fa-ul">
                    {this.props.onboard.downloadDocumentslist.map(item=>
                    <li><span class="fa-li"><i class="fa fa-file"></i></span><a href={item.path}>{item.filename}</a></li>
                   )}
                    </ul>
                </div>:null}
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
