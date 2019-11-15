import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatutility, fileUtility } from '../../_helpers';
import {downloadFileService} from '../../_services/downloadFile.service';
class OrderStatusDoc extends React.Component {
  constructor(props) {
    super(props);
    console.log("OrderStatusDoc ",this.props)
   this.state={document:this.props.document}
  }
  UNSAFE_componentWillReceiveProps(prevProps) {
      console.log("OrderStatusDoc prev props",prevProps.document);
    if(!formatutility.isEmpty(prevProps.document) && JSON.stringify(prevProps.document)!==JSON.stringify(this.state.document))
 {
  console.log("OrderStatusDoc prev props set value",prevProps.document);
    this.setState({document:prevProps.document},e => {
      console.log("current status state",this.state)
    })
 }
 }
 shouldComponentUpdate(){
   return true;
 }
 download(collection){
   
    downloadFileService.downloadFileForOrder(collection)
}
  render() {

    const spanStyle = {
      float : 'right'
    };

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
       {this.state.document.map(item=>
        <div className="row" key = {item._id}>
            <div className="col-md-8"><a onClick={()=>this.download(item)} href="JavaScript:Void(0);">{item.originalname}</a></div>
            <div className="col-md-4"><span style={spanStyle}  onClick={()=>this.download(item)}><FontAwesomeIcon icon={fileUtility.fileIcon(item.originalname)} size="2x"/></span></div>
        </div>
        )}
      </div>
    );
  }
}

export default OrderStatusDoc;
