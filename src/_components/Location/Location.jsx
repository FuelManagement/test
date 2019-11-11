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
          <span className="user-role">Origin: Louisiana </span> <br />
          <span className="user-role">Destination: Mexico City </span> <br />
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
    this.state={location:this.props.location,orderId:this.props.orderId}
  }
  UNSAFE_componentWillReceiveProps(prevProps) {
    if(!formatutility.isEmpty(prevProps.location) && JSON.stringify(prevProps.location)!==JSON.stringify(this.state.location))
 {
     this.setState({location:prevProps.location,orderId:prevProps.orderId})
 }
 }
 shouldComponentUpdate(){
   return true;
 }
  render() {
   
    let defaultProps = {
      center: {
        lat: 40.73061,
        lng: -73.935242
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
              
              lat={40.73061}
              lng={-73.935242}
              title="order"
              driverName={this.state.location!==undefined && this.state.location.driverName!==undefined?this.state.location.driverName:''}
              licensePlate={this.state.location!==undefined && this.state.location.licensePlate!==undefined?this.state.location.licensePlate:''}
              transportMode={this.state.location!==undefined && this.state.location.transportMode!==undefined?this.state.location.transportMode:''}
              status={this.state.location!==undefined && this.state.location.status!==undefined?this.state.location.status:''}
              orderId={this.state.orderId}
            />
        
        </GoogleMapReact>
      </div>
    );
  }
}

export { Locations };
