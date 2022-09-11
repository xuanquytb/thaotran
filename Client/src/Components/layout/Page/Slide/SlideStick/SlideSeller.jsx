import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function SlideSeller() {
    const data = [
        "image-4-1.png",
        "image-4-2.png",
        "image-4-3.png",
        "image-4-4.png",
        "image-4-5.png",
        "image-4-6.png",
        "image-4-7.png",
        "image-4-8.png",
        "image-4-9.png",
        "image-4-10.png",
        "image-4-11.png",
        "image-4-12.png",
    ];
    const renderSlides = () =>
        data.map((item, index) => (
            <div key={index}>
                <img
                    style={{ width: "100%", maxHeight: "150px" }}
                    src={`../../../../image/slider__body/${item}`}
                />
            </div>
        ));

    return (
        <div>
            <Slider
                dots={false}
                slidesToShow={2}
                slidesToScroll={2}
                autoplay={true}
                autoplaySpeed={3000}
                style={{ width: 1230 }}
            >
                {renderSlides()}
            </Slider>
        </div>
    );
}
