import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../../../../Store/Context/CategoryContext";
import { useHistory, Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const ListCategoryTopHeader = () => {
    const history = useHistory();
    const {
        categoryState: { categorys },
        getCategory,
    } = useContext(CategoryContext);

    useEffect(() => {
        getCategory();
    }, []);

    const renderSlides = () =>
        categorys !== undefined ? (
            categorys.map((item, index) => {
                return (
                    <Link
                        to={`/categoryProduct?id=${item.id}`}
                        key={index}
                        className='list__category-link'
                        style={{ width: "195px", paddingright: 30 }}
                    >
                        {item.nameCategory}
                    </Link>
                );
            })
        ) : (
            <></>
        );

    return (
        <>
            <div className='list__category'>
                <div
                    className='list__category-content'
                    id='slider__category'
                    style={{ transform: "translateX(0)" }}
                >
                    <Slider
                        dots={false}
                        slidesToShow={8}
                        slidesToScroll={3}
                        autoplay={true}
                        autoplaySpeed={3000}
                        style={{
                            width: 1350,
                            paddingLeft: 42,
                            paddingright: 20,
                        }}
                    >
                        {renderSlides()}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default ListCategoryTopHeader;
