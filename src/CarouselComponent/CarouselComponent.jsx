import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <div className="container-fluid">
                 <Carousel showArrows={false} showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false}>
                    <div>
                        <img src={require('../../assets/img/image1.jpg')} />
                    </div>
                    <div>
                        <img src={require('../../assets/img/image2.jpg')} />
                    </div>
                </Carousel>
            </div>
        );
    }
}

export { CarouselComponent as CarouselComponent };