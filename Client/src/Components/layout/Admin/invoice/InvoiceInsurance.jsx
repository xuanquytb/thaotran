import React, { useState, useRef } from "react";
import { Table, Button } from "antd";
import { useLocation } from "react-router-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import classNames from "classnames/bind";

import styles from "./css/styleInsuance.module.css";
const cx = classNames.bind(styles);
import styleTables from "./css/styleTables.module.scss";

const InvoiceInsuance = () => {
    const location = useLocation();
    const [listProduct, setListProduct] = useState(location.state.dataProduct);
    console.log(listProduct);
    const [customer, setCustomer] = useState(location.state.dataCus);

    const dataSourch = listProduct.map((item, index) => {
        return {
            key: index,
            nameProduct: item.nameProduct,
            warranty: item.promotional,
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
            title: "Bảo hành",
            dataIndex: "warranty",
            width: "9%",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            width: "5%",
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
                            <strong className={cx("")}></strong>
                        </div>
                        <div className={cx("title-invoice")}>
                            <h2>PHIẾU ĐĂNG KÝ BẢO HÀNH</h2>
                        </div>
                        <div className={cx("right-invoice")}></div>
                    </div>

                    <div
                        style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                            padding: "10px 10px",
                        }}
                    >
                        <div className={cx("infomation-invoice")}>
                            <p>
                                Họ tên khách hàng:{" "}
                                {`${"................................................................................."}`}{" "}
                            </p>
                            <p>
                                Địa chỉ:{" "}
                                {`${"...................................................................................................."}`}{" "}
                            </p>
                            <p>
                                Email:{" "}
                                {`${"................................................................................"}`}{" "}
                                Số điện thoại:{" "}
                                {`${".........................................."}`}{" "}
                            </p>
                            <p>
                                Ngày đặt hàng:{" "}
                                {`${"........................................................................................"}`}{" "}
                            </p>
                            <p></p>
                        </div>
                    </div>
                    <div
                        style={{
                            margin: "0 109px",
                        }}
                    >
                        <p style={{ margin: 0, padding: 0 }}>
                            (Quý khách vui lòng trình phiếu bảo hành này đến
                            <strong> công ty</strong> ......... Hoặc <br />{" "}
                            <span style={{ marginLeft: 20 }}>
                                gọi đến Hotline 19005555 để được đăng ký bảo
                                hành)
                            </span>
                        </p>
                    </div>
                    <div>
                        <div
                            className={cx("infomation-invoice")}
                            style={{
                                borderBottom: "1px solid black",
                                padding: "10px 10px",
                            }}
                        >
                            {/* <p>
                                Họ tên người mua hàng :{" "}
                                <span
                                    style={{
                                        textDecoration: "underline",
                                        textDecorationStyle: "dotted",
                                    }}
                                >{`${customer.fullname}`}</span>{" "}
                            </p> */}
                            {/* <p>
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
                            </p> */}
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
                                Khách hàng <br />{" "}
                                <span
                                    style={{
                                        marginLeft: 9,
                                        fontStyle: "italic",
                                    }}
                                >
                                    (Chữ kí)
                                </span>
                            </p>
                        </div>
                        <div className={cx("payment-invoice")}>
                            <p>
                                Người lập <br />{" "}
                                <span
                                    style={{
                                        marginLeft: 5,
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

export default InvoiceInsuance;
