import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.css";

import { ProductContext } from "../../../../../Store/Context/ProductContext";
import Header from "../../Header/Header";
import { Card } from "antd";
import ModalProduct from "../../Product/modalProduct";

const cx = classNames.bind(styles);

const PageShowResultSearch = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const searchValue = params.get("search");
    const [searchResult, setSearchResult] = useState([]);

    const [product, setProduct] = useState();
    const [visible, setVisible] = useState(false);

    const showModal = async (e, id) => {
        e.preventDefault();
        setProduct(id);
        setVisible(true);
    };

    const { getProductWithName } = useContext(ProductContext);

    useEffect(async () => {
        const result = await getProductWithName(searchValue);
        setSearchResult(result);
    }, [searchValue]);
    return (
        <>
            <Header />
            <div className='app__container' style={{ color: "#fff" }}>
                <div
                    className='grid wide'
                    style={{ marginLeft: 211, marginTop: 42 }}
                >
                    <h1
                        style={{
                            display: "inline",
                            fontWeight: 300,
                            fontSize: 24,
                        }}
                    >
                        Kết quả tìm kiếm cho từ khóa "{searchValue}"
                    </h1>
                    <div className='row sm-gutter app__content'>
                        <div
                            style={{
                                minWidth: 1080,
                                display: "flex",
                                flexWrap: "wrap",
                                margin: "-30px 15px",
                            }}
                        >
                            {searchResult.map((item) => {
                                return (
                                    <Card
                                        style={{
                                            padding: 0,
                                            margin: " 0px 10px",
                                            position: "inherit",
                                            top: 0,
                                        }}
                                        className='col l-2'
                                        type='text'
                                        key={item.id}
                                        onClick={(event) =>
                                            showModal(event, item.id)
                                        }
                                    >
                                        <div className='content__body-item'>
                                            <img
                                                src={`http://localhost:8080/image/procuct/${item.image}`}
                                                alt=''
                                                className='content__body-img'
                                            />
                                            <div className='content__body-info'>
                                                <span className='info__name'>
                                                    {item.nameProduct}
                                                </span>
                                                <div className='info__vote'>
                                                    <div className='info__vote-icon'>
                                                        <i className='fas fa-star'></i>
                                                        <i className='fas fa-star'></i>
                                                        <i className='fas fa-star'></i>
                                                        <i className='fas fa-star'></i>
                                                        <i className='fas fa-star'></i>
                                                    </div>
                                                    <span className='info__vote-quantily'>
                                                        124 đã bán
                                                    </span>
                                                </div>
                                                <div className='slider__content-price'>
                                                    <span className='item__price'>
                                                        {item.price} đ
                                                    </span>
                                                    <span className='item__discount'>
                                                        -35%
                                                    </span>
                                                </div>
                                                <img
                                                    src='https://salt.tikicdn.com/ts/upload/51/ac/cc/528e80fe3f464f910174e2fdf8887b6f.png'
                                                    alt=''
                                                    width='124px'
                                                    height='18px'
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <ModalProduct
                            visible={visible}
                            onClose={() => setVisible(false)}
                            product={product}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageShowResultSearch;
