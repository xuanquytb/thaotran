import React, { useContext, useEffect, useState } from "react";

import "../../../Style/Category.css";
import { CategoryContext } from "../../../../Store/Context/CategoryContext";
import { ProductContext } from "../../../../Store/Context/ProductContext";
import Header from "../Header/Header";
import { Card } from "antd";
import ModalProduct from "./modalProduct";

const CategoryProduct = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    const [product, setProduct] = useState();
    const [visible, setVisible] = useState(false);

    const showModal = async (e, id) => {
        e.preventDefault();
        setProduct(id);
        setVisible(true);
    };

    const {
        categoryState: { categorys },
        getCategory,
    } = useContext(CategoryContext);

    useEffect(() => {
        getCategory();
    }, []);

    const {
        productState: { products },
        getProductCategory,
    } = useContext(ProductContext);

    useEffect(() => {
        getProductCategory(id);
    }, []);

    const handleOnclick = (item) => {
        getProductCategory(item.id);
    };
    return (
        <>
            <Header />
            <div className='app__container' style={{ color: "#fff" }}>
                <div
                    className='grid wide'
                    style={{ marginLeft: 211, marginTop: 42 }}
                >
                    <div className='row sm-gutter app__content'>
                        <nav
                            onWheel={(e) => wheel(e)}
                            className='category'
                            style={{
                                position: "fixed",
                                left: 0,
                                top: 100,
                                maxHeight: 600,
                                overflowY: "auto",
                            }}
                        >
                            <h3 className='category__heading'>Danh mục</h3>

                            <ul className='category-list'>
                                {categorys.map((item) => {
                                    return (
                                        <li
                                            className='category-item category-item--active'
                                            onClick={(e) => handleOnclick(item)}
                                        >
                                            <span className='category-item__link'>
                                                {item.nameCategory}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div
                            style={{
                                minWidth: 1080,
                                display: "flex",
                                flexWrap: "wrap",
                                margin: "-30px 15px",
                            }}
                        >
                            {products.map((item) => {
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
                                                        {item.sold} đã bán
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

export default CategoryProduct;
