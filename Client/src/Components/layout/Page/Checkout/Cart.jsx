import React, { useState, useContext, useEffect } from "react";
import "../../../Style/checkout.css";
import Header from "../Header/Header";
import { InputNumber, Button } from "antd";
// import { AuthContext } from "../../../Store/Context/AuthContext";
import { CardContext } from "../../../../Store/Context/CardContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./css/style.css";

const Cart = () => {
    const history = useHistory();
    const {
        cardState: { cards, sumMoney },
        getCard,
        getSumMoneyCard,
    } = useContext(CardContext);

    const handDelete = async (id) => {
        const result = await axios.delete(
            `http://localhost:8080/api/card/cardDetail/${id}`
        );
        getCard();
        await getSumMoneyCard();
    };

    useEffect(async () => {
        getSumMoneyCard();
    }, []);

    const handNum = async (e, item) => {
        const data = {
            id: item.id,
            dongia: e * item.dongia,
            quantity: e,
        };
        console.log(data);
        const result = await axios.put(
            `http://localhost:8080/api/card/updateCardDetail`,
            data
        );
        await getCard();
        await getSumMoneyCard();
    };

    return (
        <>
            <Header />
            <div className='main-checkout'>
                <div className='body-checkout'>
                    <div className='body-checkout-Content'>
                        {cards.length > 0 ? (
                            <>
                                <h1 className='Title-checkout'>
                                    Sản phẩm trong giỏ hàng
                                </h1>
                                {cards.map((item, index) => {
                                    return (
                                        <div className='cartItem' key={index}>
                                            <img
                                                className='img-product'
                                                src={`http://localhost:8080/image/procuct/${item.image}`}
                                                alt=''
                                            />
                                            <div className='infoProduct'>
                                                <p className='text-info name-Product-card'>
                                                    {item.nameProduct}
                                                </p>
                                                <p className='text-info price-Product'>
                                                    <strong
                                                        style={{ fontSize: 15 }}
                                                    >
                                                        Giá bán
                                                    </strong>
                                                    : {item.dongia} đ
                                                </p>
                                                <p className='text-info warehouseCount-Product'>
                                                    Đơn giá:{" "}
                                                    {item.quantity *
                                                        item.dongia}
                                                </p>
                                            </div>
                                            <div className='btn-action'>
                                                <div className='btn-action-block'>
                                                    <InputNumber
                                                        min={1}
                                                        max={10}
                                                        defaultValue={
                                                            item.quantity
                                                        }
                                                        onChange={(event) =>
                                                            handNum(event, item)
                                                        }
                                                        style={{
                                                            width: 50,
                                                            height: 36,
                                                            justifyContent:
                                                                "center",
                                                            alignContent:
                                                                "center",
                                                            borderRadius: 10,
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className='btn-bin'
                                                    onClick={(e) =>
                                                        handDelete(item.id)
                                                    }
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        viewBox='0 0 24 24'
                                                        width='35'
                                                        height='35'
                                                        style={{
                                                            marginLeft: 10,
                                                            paddingTop: 5,
                                                        }}
                                                    >
                                                        <path
                                                            fill='none'
                                                            d='M0 0h24v24H0z'
                                                        />
                                                        <path
                                                            d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z'
                                                            fill='rgba(256,6,6,0.5)'
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <span>
                                <img
                                    className='image-cart-empty'
                                    style={{
                                        height: "456px",
                                        margin: " 60px 245px",
                                    }}
                                    src='../../../../image/header/cart_4.png'
                                    alt=''
                                />
                            </span>
                        )}
                    </div>
                </div>
                <div className='btn-checkout'>
                    <div className='sumMoney'>
                        <h2>
                            <strong>Tạm tính : </strong>
                            <span style={{ color: "red" }}>
                                {sumMoney !== null
                                    ? sumMoney.toLocaleString("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                      })
                                    : "0"}
                            </span>
                        </h2>
                    </div>
                    <div className='btn-action-block'>
                        <Button
                            type='primary'
                            className='btn-pay'
                            disabled={cards.length > 0 ? false : true}
                            onClick={(e) => history.push("/payment")}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
