import React, { useState, useContext, useEffect } from "react";
import "../../../Style/orderSuccess.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const orderSuccess = (props) => {
    const location = useLocation();

    return (
        <>
            <Header />
            <div className='main-success'>
                <div className='notify-order-success'>
                    <div className='container'>
                        <div>
                            <img
                                src='../../../../../public/gif/1103-confetti-lineal.gif'
                                alt=''
                                className='img-success'
                            />
                        </div>

                        <div className='content'>
                            <p
                                className='style-font'
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 290px",
                                    marginBottom: 50,
                                }}
                            >
                                Đặt hàng thành công
                            </p>
                        </div>
                        <div>
                            <p
                                className='style-font'
                                style={{ margin: "0 129px", color: "green" }}
                            >
                                Cảm ơn đã bạn tin tưởng và mua hàng tại Website
                            </p>
                            <p
                                className='style-font'
                                style={{ color: "green" }}
                            >
                                Bạn vui lòng hãy chuẩn bị số tiền{" "}
                                {location.state.info.sumPayment.toLocaleString(
                                    "vi-VN",
                                    {
                                        style: "currency",
                                        currency: "VND",
                                    }
                                )}{" "}
                                để thanh toán đơn hàng
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default orderSuccess;
