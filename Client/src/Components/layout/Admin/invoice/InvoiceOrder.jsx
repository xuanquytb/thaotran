import React, { useState, useRef } from "react";
import { Table, Button } from "antd";
import { useLocation } from "react-router-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import classNames from "classnames/bind";

import styles from "./css/style.module.css";
const cx = classNames.bind(styles);
import styleTables from "./css/styleTables.module.scss";

const invoiceOrder = () => {
    const location = useLocation();
    const [listProduct, setListProduct] = useState(location.state.dataProduct);
    const [customer, setCustomer] = useState(location.state.dataCus);
    const dataSourch = listProduct.map((item, index) => {
        return {
            key: index,
            nameProduct: item.nameProduct,
            promotional: item.promotional,
            quantity: item.quantity,
            price:
                (item.price - (item.price * item.promotional) / 100) *
                item.quantity,
        };
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5%",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "nameProduct",
            width: "50%",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            width: "5%",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            width: "9%",
        },
    ];

    const iconPrint = [
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M7 17h10v5H7v-5zm12 3v-5H5v5H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2zM5 10v2h3v-2H5zm2-8h10a1 1 0 0 1 1 1v3H6V3a1 1 0 0 1 1-1z' />
        </svg>,
    ];

    const pdfExportComponent = useRef(null);
    const handleExportWithComponent = (event) => {
        pdfExportComponent.current.save();
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 35,
                fontFamily: "Times New Roman",
            }}
        >
            <div style={{ padding: 10 }}>
                <Button onClick={handleExportWithComponent}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                    >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path d='M7 17h10v5H7v-5zm12 3v-5H5v5H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2zM5 10v2h3v-2H5zm2-8h10a1 1 0 0 1 1 1v3H6V3a1 1 0 0 1 1-1z' />
                    </svg>
                </Button>
            </div>
            <PDFExport ref={pdfExportComponent}>
                <div className={cx("invoice-content")} ref={pdfExportComponent}>
                    <div className={cx("top-invoice")}>
                        <div className={cx("left-invoice")}>
                            <div className={cx("logo-invoice")}>
                                <img
                                    src='../../../../../image/header/TN__logo.png'
                                    alt=''
                                    className=''
                                />
                            </div>
                            <strong className={cx("")}>
                                32, LK18-KĐT Văn Khê, La Khê, Hà Đông <br />{" "}
                                SĐT: 096538555
                            </strong>
                        </div>
                        <div className={cx("title-invoice")}>
                            <h2>HÓA ĐƠN BÁN HÀNG</h2>
                        </div>
                        <div className={cx("right-invoice")}>
                            <div style={{ fontSize: 13, paddingTop: 5 }}>
                                Số hóa đơn: ................
                            </div>
                        </div>
                    </div>
                    <div className={cx("address-invoice")}>
                        <div style={{ marginLeft: 58, fontSize: 15 }}>
                            Liên 2
                        </div>
                        <div style={{ fontSize: 15 }}>
                            Ngày ...Tháng ...Năm 20...
                        </div>
                    </div>

                    <div
                        style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                            padding: "10px 10px",
                        }}
                    >
                        <div className={cx("infomation-invoice")}>
                            <p>Tên công ty: {`${"CÔNG TY TNHH Thảo Trần"}`} </p>
                            <p>Mã số thuế: {`${"4900 260 875"}`} </p>
                            <p>
                                Địa chỉ:{" "}
                                {`${"LK 18-32 KĐT VĂN KHÊ-HÀ ĐÔNG-HÀ NỘI"}`}{" "}
                            </p>
                            <p>
                                Số tài khoản:{" "}
                                {`${"................................................................................."}`}{" "}
                            </p>
                            <p>
                                Số điện thoại:{" "}
                                {`${"................................................................................"}`}{" "}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div
                            className={cx("infomation-invoice")}
                            style={{
                                borderBottom: "1px solid black",
                                padding: "10px 10px",
                            }}
                        >
                            <p>
                                Họ tên người mua hàng :{" "}
                                <span
                                    style={{
                                        textDecoration: "underline",
                                        textDecorationStyle: "dotted",
                                    }}
                                >{`${customer.fullname}`}</span>{" "}
                            </p>
                            <p>
                                Địa chỉ:{" "}
                                <span
                                    style={{
                                        textDecoration: "underline",
                                        textDecorationStyle: "dotted",
                                    }}
                                >{`${customer.address}`}</span>
                            </p>
                            <p>
                                Email:{" "}
                                <span
                                    style={{
                                        textDecoration: "underline",
                                        textDecorationStyle: "dotted",
                                    }}
                                >{`${customer.email}`}</span>
                            </p>
                            <p>
                                Tổng thanh toán:{" "}
                                <span
                                    style={{
                                        textDecoration: "underline",
                                        textDecorationStyle: "dotted",
                                    }}
                                >{`${customer.sumPayment + 35000} VNĐ`}</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx("box-table-invoice")}>
                        <div
                            className={cx("table-invoice")}
                            style={{ padding: "0 15px" }}
                        >
                            <Table
                                columns={columns}
                                dataSource={dataSourch}
                                pagination={false}
                                className={
                                    styleTables.booking_information_table
                                }
                            />
                        </div>
                    </div>

                    <div className={cx("sign-invoice")}>
                        <div className={cx("payment-invoice")}>
                            <p>
                                Người mua hàng <br />{" "}
                                <span
                                    style={{
                                        marginLeft: 25,
                                        fontStyle: "italic",
                                    }}
                                >
                                    (Chữ kí)
                                </span>
                            </p>
                        </div>
                        <div className={cx("payment-invoice")}>
                            <p>
                                Người bán hàng <br />{" "}
                                <span
                                    style={{
                                        marginLeft: 25,
                                        fontStyle: "italic",
                                    }}
                                >
                                    (Chữ kí)
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={cx("note")}>
                        (Cần kiểm tra, đối chiếu khi lập, nhận hóa đơn)
                    </div>
                </div>
            </PDFExport>
        </div>
    );
};

export default invoiceOrder;
