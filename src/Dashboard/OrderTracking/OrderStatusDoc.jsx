import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatutility, fileUtility } from '../../_helpers';
import {downloadFileService} from '../../_services/downloadFile.service';
class OrderStatusDoc extends React.Component {
  constructor(props) {
    super(props);
   this.state={document:this.props.document}
  }
  UNSAFE_componentWillReceiveProps(prevProps) {
      console.log(prevProps.document);
    if(!formatutility.isEmpty(prevProps.document) && JSON.stringify(prevProps.document)!==JSON.stringify(this.state.document))
 {
    this.setState({document:prevProps.document})
 }
 }
 shouldComponentUpdate(){
   return true;
 }
 download(collection){
   
    downloadFileService.downloadFileForOrder(collection)
}
  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
       {this.state.document.map(item=>
        <div className="row">
            <div className="col-md-8"><a onClick={()=>this.download(item)} href="JavaScript:Void(0);">{item.originalname}</a></div>
            <div className="col-md-4"><span  onClick={()=>this.download(item)}><FontAwesomeIcon icon={fileUtility.fileIcon(item.originalname)} size="2x"/></span></div>
        </div>
        )}
      </div>
    );
  }
}

export { OrderStatusDoc };
