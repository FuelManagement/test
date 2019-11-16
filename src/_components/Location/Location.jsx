import React from "react";
import GoogleMapReact from "google-map-react";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatutility } from '../../_helpers';
const AnyReactComponent = props => (
  <div>
    <div
      data-for="Tooltiploc"
      data-tip={props.title}
      style={{

        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        //borderRadius: "100%",
        transform: "translate(-50%, -50%)"
      }}

    >
      <FontAwesomeIcon icon="truck-moving" size="3x"/>

      {/* {props.text} */}
    </div>
    <ReactTooltip
      id="Tooltiploc"
      getContent={dataTip => (
        <div className="user-info">
          <span className="user-role">Order #: {props.orderId} </span> <br />
          <span className="user-role">Origin: {props.origin} </span> <br />
          <span className="user-role">Destination: {props.destination} </span> <br />
          <span className="user-role">License plate: {props.licensePlate} </span> <br />
          <span className="user-role">Driver Name: {props.driverName} </span> <br />

        </div>
      )}
      place="top" type="light" effect="float"
    />
  </div>
);

class Locations extends React.Component {
  constructor(props) {
    super(props);
  //  this.state={location:this.props.location,orderId:this.props.orderId}
    this.state={location:this.props.location}
  }
  UNSAFE_componentWillReceiveProps(prevProps) {
    if(!formatutility.isEmpty(prevProps.location) && JSON.stringify(prevProps.location)!==JSON.stringify(this.state.location))
 {
    // this.setState({location:prevProps.location,orderId:prevProps.orderId})
    this.setState({location:prevProps.location})
 }
 }
 shouldComponentUpdate(){
   return true;
 }
  render() {
//   console.log("location render state"+this.state.location.status_latitudeId);
console.log('lat :'+this.state.location.status_latitudeId+'lng :',this.state.location.status_longitudeId);

let latitutude = this.state.location.status_latitudeId;
let longitudeId = this.state.location.status_longitudeId;
latitutude = latitutude === undefined ? 39.0458 :  parseFloat(latitutude);
longitudeId = longitudeId === undefined ? -76.6413 : parseFloat(longitudeId);



console.log('lat :'+latitutude+'lng :',longitudeId);
console.log("lat "+ typeof latitutude);
   
    let defaultProps = {
      center: {

        lat:latitutude,
        lng:longitudeId,
      },
      zoom: 11
    };
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDkOeTTfLlfdMFdU6HbXP5sHTfO9T8Ctgk" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
         
            <AnyReactComponent
              // lat={this.state.location.status_latitudeId}
              // lng={this.state.location.status_longitudeId}
            
              title="order"
              orderId = {this.state.location!==undefined && this.state.location.orderId!==undefined?this.state.location.orderId:''}
              origin = {this.state.location!==undefined && this.state.location.origin!==undefined?this.state.location.origin:''}
              destination = {this.state.location!==undefined && this.state.location.destination!==undefined?this.state.location.destination:''}
              driverName={this.state.location!==undefined && this.state.location.driverName!==undefined?this.state.location.driverName:''}
              licensePlate={this.state.location!==undefined && this.state.location.licensePlate!==undefined?this.state.location.licensePlate:''}
              transportMode={this.state.location!==undefined && this.state.location.transportMode!==undefined?this.state.location.transportMode:''}
              status={this.state.location!==undefined && this.state.location.status!==undefined?this.state.location.status:''}
              // orderId={this.state.orderId}
            />
        
        </GoogleMapReact>
      </div>
    );
  }
}

export { Locations };
