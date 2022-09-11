import React, { useState, useEffect, useRef } from "react";
import { Drawer, Descriptions, Badge, Button } from "antd";

import HTMLReactParser from "html-react-parser";
import { PDFExport } from "@progress/kendo-react-pdf";

import axios from "axios";
import { useHistory } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./css/styleshow.module.css";

const cx = classNames.bind(styles);

const ShowDrawer = ({ input, visible, onClose }) => {
    const history = useHistory();
    console.log(input);

    const [listItem, setListItem] = useState();
    useEffect(async () => {
        const resultIdCard = await axios.get(
            `http://localhost:8080/api/Order/findIdCard/${input.id}`
        );

        const result = await axios.post(
            `http://localhost:8080/api/card/allItemCardOrder`,
            {
                idCard: resultIdCard.data.value.idCard,
                idPayOrder: input.id,
            }
        );
        setListItem(result.data.orderPayment);
    }, [input]);
    const pdfExportComponent = useRef(null);
    // const handleExportWithComponent = (event) => {
    //     pdfExportComponent.current.save();
    // };
    const handleExport = () => {
        history.push({
            pathname: "/invoice",
            state: { dataProduct: listItem, dataCus: input },
        });
        window.location.reload();
    };
    const handleExportInsuance = () => {
        history.push({
            pathname: "/InvoiceInsuance",
            state: { dataProduct: listItem, dataCus: input },
        });
        window.location.reload();
    };
    const handleExportOutWarehouse = () => {
        history.push({
            pathname: "/InvoiceOutWarehouse",
            state: { dataProduct: listItem, dataCus: input },
        });
        window.location.reload();
    };
    return (
        <Drawer
            destroyOnClose
            title={input.fullname}
            visible={visible}
            width={800}
            onClose={onClose}
        >
            <Descriptions
                title='Thông tin sản phẩm'
                layout='vertical'
                bordered
                className='pdf-page'
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
                <Descriptions.Item label='Tổng thanh toán'>
                    {input.sumPayment !== undefined
                        ? input.sumPayment.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                          })
                        : ""}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Email'>
                    {HTMLReactParser(`${input.email}`)}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Địa chỉ'>
                    {HTMLReactParser(`${input.address}`)}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <div class='tbl-content'>
                    {listItem !== undefined ? (
                        listItem.map((item) => {
                            return (
                                <div
                                    className={cx("cartdetailItem")}
                                    key={item.id}
                                >
                                    <img
                                        className={cx("img-product-detail")}
                                        src={`http://localhost:8080/image/procuct/${item.image}`}
                                        alt=''
                                    />
                                    <div className={cx("infoProduct")}>
                                        <div>
                                            <p
                                                className={cx(
                                                    "text-info",
                                                    "name-Product"
                                                )}
                                            >
                                                {item.nameProduct}
                                            </p>
                                            <p
                                                className={cx(
                                                    "text-info",
                                                    "warehouseCount-Product"
                                                )}
                                            >
                                                {item.price.toLocaleString(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
                                                <span
                                                    style={{
                                                        color: "gray",
                                                        fontSize: 15,
                                                    }}
                                                >
                                                    {" "}
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
                                        <div>
                                            <p
                                                className={cx(
                                                    "text-info",
                                                    "price-Product-detail-order"
                                                )}
                                            >
                                                Thành tiền:{" "}
                                                {(
                                                    item.quantity * item.price
                                                ).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p></p>
                    )}
                </div>
            </Descriptions>
            <div style={{ padding: 10 }}>
                <Button onClick={handleExport}>Xuất hóa đơn</Button>
                <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => handleExportInsuance()}
                >
                    Xuất phiếu bảo hành
                </Button>
                <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => handleExportOutWarehouse()}
                >
                    Tạo phiếu xuất kho
                </Button>
            </div>
        </Drawer>
    );
};

export default ShowDrawer;
