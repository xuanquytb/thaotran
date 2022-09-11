import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { OrderContext } from "../../../../Store/Context/OrderContext";
import { Tabs } from "antd";
import { Descriptions, Badge, Modal, Button, Popconfirm } from "antd";
import Header from "../../../layout/Page/Header/Header";
import ModalShow from "./ModalShow";
const { TabPane } = Tabs;

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
            address: user[0].address,
            email: user[0].email,
            fullname: user[0].fullname,
            id: record.id,
            phone: user[0].phone,
            state: record.state,
            sumPayment: record.sumPayment,
        };
        setOrderDetail(input);
        setVisibleShow(true);
    };

    const {
        orderState: { orders },
        getOrderCustomer,
        updateOrderState,
    } = useContext(OrderContext);
    useEffect(() => getOrderCustomer(), []);

    const handConfirm = async (record) => {
        const input = {
            id: record.id,
            state: "Đơn hàng hoàn thành",
        };
        await updateOrderState(input);
        await getOrderCustomer();
    };
    const wait =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Chờ thanh toán";
              })
            : "";
    const waitConfirmation =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Chờ xác nhận";
              })
            : "";
    const delivery =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Đang giao hàng";
              })
            : "";
    const success =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Đã giao hàng";
              })
            : "";
    const complete =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Đơn hàng hoàn thành";
              })
            : "";
    const cancelOr =
        orders[0] !== undefined
            ? orders[0].filter(function (order, index) {
                  return order.state === "Đã hủy";
              })
            : "";

    const onChange = (key) => {
        console.log(key);
    };
    console.log(wait.length);
    return (
        <>
            <Header />
            <div className='body-myorder'>
                <div id='my-info' className='grid wide'>
                    <div className='contain-myorder'>
                        <Tabs onChange={onChange} type='card'>
                            <TabPane tab='Tất cả' key='1'>
                                {orders[0] !== undefined ? (
                                    <ul>
                                        {orders[0].map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src='../../../../../image/header/TN__logo.png'
                                                                        alt=''
                                                                        style={{
                                                                            width: 60,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Chờ thanh toán' key='2'>
                                {wait.length > 0 ? (
                                    <ul>
                                        {wait.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Chờ xác nhận' key='3'>
                                {waitConfirmation.length > 0 ? (
                                    <ul>
                                        {waitConfirmation.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Đang giao hàng' key='4'>
                                {delivery.length > 0 ? (
                                    <ul>
                                        {delivery.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Đã giao' key='5'>
                                {success.length > 0 ? (
                                    <ul>
                                        {success.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 150,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                        <Popconfirm
                                                            title='Xác nhận đã nhận được hàng ?'
                                                            onConfirm={(e) =>
                                                                handConfirm(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <Button
                                                                type='primary'
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    right: 0,
                                                                }}
                                                            >
                                                                Đã nhận được
                                                                hàng
                                                            </Button>
                                                        </Popconfirm>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Đơn hàng đã hoàn thành' key='6'>
                                {complete.length > 0 ? (
                                    <ul>
                                        {complete.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                            <TabPane tab='Đã hủy' key='6'>
                                {cancelOr.length > 0 ? (
                                    <ul>
                                        {cancelOr.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    style={{
                                                        position: "relative",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    <div className='item-order'>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-around",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: 2,
                                                                    marginLeft: 20,
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <img
                                                                    src='../../../../../image/header/TN__logo.png'
                                                                    alt=''
                                                                    style={{
                                                                        width: 60,
                                                                    }}
                                                                />
                                                                <div>
                                                                    Ngày đặt
                                                                    hàng:{" "}
                                                                    {new Date(
                                                                        item.createAt
                                                                    ).toLocaleDateString(
                                                                        "vn-VN"
                                                                    )}
                                                                    <div>
                                                                        ID ĐƠN
                                                                        HÀNG:{" "}
                                                                        {
                                                                            item.id
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flex: "5 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div>
                                                                    08:12
                                                                    13-06-2022
                                                                    Đơn hàng đã
                                                                    đến kho
                                                                    50-HCM Tan
                                                                    Phu/Tan Quy
                                                                    SOC
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    flex: "3 1 0",
                                                                    borderLeft:
                                                                        "1px solid gray",
                                                                    paddingLeft: 10,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        minWidth: 137,
                                                                    }}
                                                                >
                                                                    {/* {item.state} */}
                                                                    Đơn vị vận
                                                                    chuyển :{" "}
                                                                    GHTK
                                                                </div>
                                                                <div>
                                                                    Mã vận đơn :
                                                                    SPXVN020548129406
                                                                </div>
                                                                <div>
                                                                    Thành tiền:{" "}
                                                                    {
                                                                        item.sumPayment
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            minHeight: 50,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={(e) =>
                                                                handleShow(item)
                                                            }
                                                            type='primary'
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: 0,
                                                            }}
                                                        >
                                                            Chi tiết đơn hàng
                                                        </Button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <>Chưa có đơn hàng</>
                                )}
                            </TabPane>
                        </Tabs>
                        <ModalShow
                            input={orderDetail}
                            visible={visibleShow}
                            onClose={() => setVisibleShow(false)}
                        />
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
