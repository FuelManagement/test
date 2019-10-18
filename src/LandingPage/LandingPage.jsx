import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { LandingPageHeader } from '../_components/LandingPageHeader'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid landing-page">
                <LandingPageHeader />
                <div className="row">                    
                    <Carousel showArrows={false} showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false}>
                        <div>
                            <img src={require('../../assets/img/image1.jpg')} />
                        </div>
                        <div>
                            <img src={require('../../assets/img/image2.jpg')} />
                        </div>
                    </Carousel>
                </div>
                <div className="row">
                    <div className="heading">
                        <h1>Fuel Tracking Management</h1>
                        <p>Blockchain Powered Application</p>
                        <Link to="/login" className="link-bg">Get Started</Link>
                    </div>
                </div>
             </div>
        );
    }
}

export { LandingPage as LandingPage };