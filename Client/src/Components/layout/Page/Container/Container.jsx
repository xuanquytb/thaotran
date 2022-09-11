import React, { useState, useContext, useEffect } from "react";
import { Pagination } from "antd";
import ListProduct from "../Product/ListProduct";

import "../../../Style/detailProduct.css";
import { ProductContext } from "../../../../Store/Context/ProductContext";
import { animateScroll as scroll } from "react-scroll";

const ScrollSelection = () => {
    scroll.scrollTo(1900);
};

const Container = () => {
    const {
        productState: { products },
        getProduct,
    } = useContext(ProductContext);

    useEffect(async () => {
        await getProduct();
    }, []);

    const [show, setShow] = useState(products.slice(0, 20));
    const handChangePage = (page, pageSize) => {
        var start = (page - 1) * pageSize;
        var end = page * pageSize;
        setShow(products.slice(start, end));
        ScrollSelection();
    };

    return (
        <>
            <div className='main'>
                <div className='slider slider__noTop'>
                    <div className='slider__section9'>
                        <div className='slider__section9-item'>
                            <img
                                src='../../../image/slider__body/image-8-1.png'
                                alt=''
                            />
                        </div>
                        <div className='slider__section9-item'>
                            <img
                                src='../../../image/slider__body/image-8-2.png'
                                alt=''
                            />
                        </div>
                        <div className='slider__section9-item'>
                            <img
                                src='../../../image/slider__body/image-8-3.png'
                                alt=''
                            />
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='content__head' id='content__sticky'>
                        <div
                            className='content__heading'
                            onClick={(e) => console.log(e)}
                        >
                            <h3>Gợi Ý Hôm Nay</h3>
                        </div>
                        <div className='content__lists'>
                            <div className='content__list-item border__active'>
                                <img
                                    src='../../../image/content/icon1.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Dành cho bạn
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon2.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Flash coupon 50K
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon3.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Giảm đến 40%
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon4.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Deal siêu hot
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon5.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Rẻ vô đối
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon6.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Đi chợ siêu sale
                                </span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon7.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>Hàng mới</span>
                            </div>
                            <div className='content__list-item'>
                                <img
                                    src='../../../image/content/icon8.png'
                                    alt=''
                                    className='list-item-img'
                                />
                                <span className='list-item-info'>
                                    Xu hướng thời trang
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='content__body'>
                        <div className='grid wide'>
                            <ListProduct data={show} products={products} />
                            <div className='content__show'>
                                <Pagination
                                    showSizeChanger={true}
                                    defaultPageSize={20}
                                    pageSizeOptions={[20, 30, 40]}
                                    defaultCurrent={1}
                                    total={products.length}
                                    style={{ width: 800, marginTop: 60 }}
                                    onChange={handChangePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='slider slider__noTop'></div>
            </div>
        </>
    );
};

export default Container;
