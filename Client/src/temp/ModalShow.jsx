import React, { useState, useContext, useEffect } from "react";
import { Descriptions, Badge, Modal, Button, Popconfirm } from "antd";
import axios from "axios";
import "./style/myorder.css";

const ModalShow = ({ input, visible, onClose }) => {
    const [listItem, setListItem] = useState();
    useEffect(async () => {
        const result = await axios.post(
            `http://localhost:8080/api/card/allItemCardOrder`,
            {
                idCard: input.idCard,
                idPayOrder: input.id,
            }
        );
        setListItem(result.data.orderPayment);
    }, [input]);

    const cancelOrder = (input) => {
        console.log(input);
    };
    return (
        <Modal
            title='Chi tiết đơn hàng'
            centered
            visible={visible}
            onCancel={onClose}
            width={1000}
            footer={[]}
        >
            <Descriptions
                layout='vertical'
                bordered
                extra={
                    <Popconfirm
                        title='Hủy đơn hàng ?'
                        onConfirm={(e) => cancelOrder(input.id)}
                    >
                        <Button type='primary'>Hủy đơn hàng</Button>
                    </Popconfirm>
                }
            >
                <Descriptions.Item label='Trạng thái' span={5}>
                    <Badge status='processing' text={input.state} />
                </Descriptions.Item>
                <Descriptions.Item label='Tên khách hàng'>
                    {input.fullname}
                </Descriptions.Item>

                <Descriptions.Item label='Số điện thoại' span={2}>
                    {input.phone}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Email'>
                    {input.email}
                </Descriptions.Item>
                <Descriptions.Item label='Địa chỉ'>
                    {input.address}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                {/* <div class='tbl-content'>
                    {listItem !== undefined ? (
                        listItem.map((item) => {
                            return (
                                <div className='cartdetailItem' key={item.id}>
                                    <img
                                        className='img-product-detail'
                                        src={`http://localhost:8080/image/procuct/${item.image}`}
                                        alt=''
                                    />
                                    <div className='infoProduct'>
                                        <p className='text-info name-Product'>
                                            {item.nameProduct}
                                        </p>
                                        <p className='text-info price-Product-detail-order'>
                                            Thành tiền:{" "}
                                            {(
                                                item.quantity * item.price
                                            ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </p>
                                        <p className='text-info warehouseCount-Product'>
                                            {item.price.toLocaleString(
                                                "vi-VN",
                                                {
                                                    style: "currency",
                                                    currency: "VND",
                                                }
                                            )}{" "}
                                            <span
                                                style={{
                                                    color: "gray",
                                                    fontSize: 15,
                                                }}
                                            >
                                                *
                                            </span>{" "}
                                            <span
                                                style={{
                                                    color: "gray",
                                                    fontSize: 15,
                                                }}
                                            >
                                                {item.quantity}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p></p>
                    )}
                </div> */}
            </Descriptions>
        </Modal>
    );
};

export default ModalShow;
