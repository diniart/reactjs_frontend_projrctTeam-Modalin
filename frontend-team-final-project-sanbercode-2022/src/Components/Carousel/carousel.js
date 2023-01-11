import { Carousel } from "react-bootstrap";

import image from "../../Images/banner1.png"
import image2 from "../../Images/banner2.png"

const CarouselComp = () => {
    return (
        <div className="carousel-container flex-center">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={image}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={image2}
                        alt="Second slide"
                    />

                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselComp;