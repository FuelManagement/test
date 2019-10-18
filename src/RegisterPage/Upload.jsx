import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class Upload extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <FilePond allowMultiple={true} 
                labelIdle='Upload Files <span class="filepond--label-action">Upload Files</span>'/> 
            </div>
        )
    }
}
export default Upload;