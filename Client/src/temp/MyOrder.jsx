import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { OrderContext } from "../../../../Store/Context/OrderContext";
import { Layout } from "antd";
const { Content } = Layout;
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../../../layout/Page/Header/Header";
import ModalShow from "./ModalShow";
import { Steps, Button, Modal } from "antd";

const { Step } = Steps;

import "./style/myorder.css";

const MyOrder = () => {
    const [visibleShow, setVisibleShow] = useState(false);
    const [orderDetail, setOrderDetail] = useState({});

    const {
        authState: { user },
    } = useContext(AuthContext);

    const handleShow = async (record) => {
        const input = {
            idCard: user[0].idCard,
            address: record.address,
            email: record.email,
            fullname: record.fullname,
            id: record.id,
            idCustomer: record.idCustomer,
            phone: record.phone,
            idPayment: record.idPayment,
            state: record.state,
            sumPayment: record.sumPayment,
        };
        setOrderDetail(input);
        setVisibleShow(true);
    };

    const handConfirm = async (record) => {
        const input = {
            idCard: user[0].idCard,
            address: record.address,
            email: record.email,
            fullname: record.fullname,
            id: record.id,
            idCustomer: record.idCustomer,
            phone: record.phone,
            idPayment: record.idPayment,
            state: "Đơn hàng hoàn thành",
            sumPayment: record.sumPayment,
        };
        updateOrderState(input);
        window.location.reload();
    };

    const {
        orderState: { orders },
        getOrderCustomer,
        updateOrderState,
    } = useContext(OrderContext);
    useEffect(() => getOrderCustomer(), []);
    return (
        <>
            <Header />
            <div className='body-myorder'>
                <div id='my-info' className='grid wide' style={{}}>
                    <div className='contain-myorder'>
                        <div className='app-MyOrder'>
                            <div className='Title-name'>Danh sách đơn hàng</div>
                            {orders.map((order) => (
                                <div className='block-image-Order'>
                                    <div className='info-MyOrder'>
                                        <Steps
                                            current={
                                                order.state === "Chờ xác nhận"
                                                    ? 0
                                                    : order.state ===
                                                      "Đang giao hàng"
                                                    ? 1
                                                    : order.state ===
                                                      "Đã giao hàng"
                                                    ? 2
                                                    : order.state ===
                                                      "Đơn hàng hoàn thành"
                                                    ? 4
                                                    : 0
                                            }
                                        >
                                            <Step
                                                key='1'
                                                title='Chờ xác nhận'
                                            />
                                            <Step
                                                key='2'
                                                title='Đang giao hàng'
                                            />
                                            <Step
                                                key='3'
                                                title='Đã giao hàng'
                                            />
                                            <Step
                                                key='4'
                                                title='Đơn hàng hoàn thành'
                                            />
                                        </Steps>
                                        <Button
                                            type='primary'
                                            shape='round'
                                            onClick={(e) => handleShow(order)}
                                            style={{
                                                width: 190,
                                                height: 35,
                                                margin: 15,
                                            }}
                                        >
                                            Chi tiết đơn hàng
                                        </Button>
                                        {order.state === "Đã giao hàng" ? (
                                            <Button
                                                type='primary'
                                                shape='round'
                                                onClick={(e) =>
                                                    handConfirm(order)
                                                }
                                                style={{
                                                    width: 190,
                                                    height: 35,
                                                    marginLeft: 790,
                                                }}
                                            >
                                                Xác nhận đã nhận hàng
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                        <ModalShow
                                            input={orderDetail}
                                            visible={visibleShow}
                                            onClose={() =>
                                                setVisibleShow(false)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='shape circle'></div>
                <div className='shape square'></div>
                <div className='shape star'></div>
                <div className='shape heart'></div>
            </div>
        </>
    );
};

export default MyOrder;
