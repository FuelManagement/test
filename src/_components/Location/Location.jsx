import React from "react";
import GoogleMapReact from "google-map-react";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <span className="user-role">Order #: 1234 </span> <br />
        <span className="user-role">Origin: Texas </span> <br />
        <span className="user-role">Designation: Tuspan </span> <br />
        <span className="user-role">License plate: I1234 </span> <br />
        <span className="user-role">Driver Name: Tom </span> <br />
        
    </div>
      )}
      place="top" type="light" effect="float"
    />
  </div>
);

class Locations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultProps = {
      center: {
        lat:
          this.props.location !== undefined && this.props.location.length > 0
            ? this.props.location[0].lat
            : 40.73061,
        lng:
          this.props.location !== undefined && this.props.location.length > 0
            ? this.props.location[0].lng
            : -73.935242
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
          {this.props.location.map((loc, index) => (
            <AnyReactComponent
              lat={loc.lat}
              lng={loc.lng}
              title="order"
             
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Locations;
