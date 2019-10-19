import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux';
import {onboardActions} from '../_actions';
class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: this.props.onboard.documentslist!==undefined?this.props.onboard.documentslist:[]
          };
    }
    render(){
        return(
            <div>
                <FilePond allowMultiple={true} files={this.state.files}  onupdatefiles={fileItems => {
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
           this.props.dispatch(onboardActions.uploadParticipantFile(this.state.files));
          }}
                labelIdle='Upload Files <span class="filepond--label-action">Upload Files</span>'/> 
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
