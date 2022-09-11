import { useContext, useEffect, useRef, useState } from "react";

import { Card, Col, Row, Typography } from "antd";
import { Table, Button } from "antd";
import * as XLSX from "xlsx/xlsx.mjs";

import Echart from "./chart/EChart";
import { OrderContext } from "../../../../Store/Context/OrderContext";
import { ProductContext } from "../../../../Store/Context/ProductContext";
import { FundOutlined } from "@ant-design/icons";

import "./style.css";

function DashboardAdmin() {
    const { Title } = Typography;
    const countOrderCus = useRef([]);
    const {
        orderState: { sumMoney, monneyDay, countUser, orders, countMonth },
        getCountOrderCustomer,
    } = useContext(OrderContext);
    const { getProductSold } = useContext(ProductContext);

    useEffect(async () => {
        const result = await getProductSold();
        setSoldProduct(result);
        const resultCountOrderCus = await getCountOrderCustomer();
        countOrderCus.current = resultCountOrderCus;
    }, []);

    console.log(countOrderCus.current);

    const [soldProduct, setSoldProduct] = useState([]);

    const dataSource = orders.map((order) => {
        return {
            ["Họ và tên"]: order.fullname,
            ["Số điện thoại"]: order.phone,
            ["Thành tiền"]: order.sumPayment.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
            ["Trạng thái"]: order.state,
            key: order.id,
        };
    });
    const dataSourceProducts =
        soldProduct.length > 0
            ? soldProduct.map((product) => {
                  return {
                      nameProduct: product.nameProduct,
                      price: product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                      }),
                      image: product.image,
                      sold: product.sold,
                      key: product.id,
                  };
              })
            : "";
    const datacountOrderCus =
        countOrderCus.current.length > 0
            ? countOrderCus.current.map((item, index) => {
                  return {
                      fullname: item.fullname,
                      donhang: item.DonHang,
                      key: index,
                  };
              })
            : "";

    const dollor = [
        <svg
            width='22'
            height='22'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            key={0}
        >
            <path
                d='M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z'
                fill='#fff'
            ></path>
            <path
                d='M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z'
                fill='#fff'
            ></path>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z'
                fill='#fff'
            ></path>
        </svg>,
    ];
    const profile = [
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            // style={{ backgroundColor: "#ffff" }}
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
                d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm4.5 9H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z'
                fill='#fff'
            />
        </svg>,
    ];
    const heart = [
        <svg
            width='22'
            height='22'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            key={0}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z'
                fill='#fff'
            ></path>
        </svg>,
    ];
    const cart = [
        <svg
            width='22'
            height='22'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            key={0}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z'
                fill='#fff'
            ></path>
        </svg>,
    ];

    const count = [
        {
            today: "Doanh thu",
            title: sumMoney.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            }),
            icon: dollor,
            bnb: "bnb2",
        },
        {
            today: "Doanh thu trong ngày",
            title:
                monneyDay !== null
                    ? monneyDay.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                      })
                    : 0,
            icon: profile,
            bnb: "bnb2",
        },
        {
            today: "Khách hàng",
            title: countUser,
            icon: heart,
            bnb: "redtext",
        },
        {
            today: "Số đơn hàng",
            title: orders.length,
            icon: cart,
            bnb: "bnb2",
        },
    ];

    const columns = [
        {
            title: "Họ và tên",
            dataIndex: "Họ và tên",
            key: "Họ và tên",
            width: "30%",
        },
        {
            title: "Số điện thoại",
            dataIndex: "Số điện thoại",
            key: "Số điện thoại",
            width: "30%",
        },
        {
            title: "Trạng thái",
            dataIndex: "Trạng thái",
            key: "Trạng thái",
            width: "35%",
        },
        {
            title: "Thành tiền",
            dataIndex: "Thành tiền",
            key: "Thành tiền",
            width: "25%",
        },
    ];
    const countOrderCusColums = [
        {
            title: "Họ và tên",
            dataIndex: "fullname",
            key: "fullname",
            width: "30%",
        },
        {
            title: "Số đơn hàng",
            dataIndex: "donhang",
            key: "donhang",
            width: "30%",
        },
    ];
    const columnsProducts = [
        {
            title: "Tên sản phẩm",
            dataIndex: "nameProduct",
            key: "nameProduct",
            width: "50%",
        },
        {
            title: "Giá Bán",
            dataIndex: "price",
            key: "price",
            width: "20%",
        },
        {
            title: "Đã bán",
            dataIndex: "sold",
            key: "sold",
            width: "6%",
        },
    ];

    const exportToExcel = () => {
        const data = dataSourceProducts.slice(0, 20).map((item) => {
            return {
                ["Mã sản phẩm"]: item.key,
                ["Tên sản phẩm"]: item.nameProduct,
                ["Giá Bán"]: item.price,
                ["Đã bán"]: item.sold,
            };
        });

        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws), "Sản phẩm bán chạy";
        XLSX.writeFile(wb, "Sản phẩm bán chạy.xlsx");
    };

    return (
        <>
            <div className='layout-content'>
                <Row className='rowgap-vbox' gutter={[24, 0]}>
                    {count.map((c, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={6}
                            xl={6}
                            className='mb-24'
                        >
                            <Card bordered={false} className='criclebox '>
                                <div className='number'>
                                    <Row align='middle' gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span>{c.today}</span>
                                            <Title
                                                level={3}
                                                style={{
                                                    color: "gray",
                                                    fontSize: 25,
                                                }}
                                            >
                                                {c.title}{" "}
                                                <small
                                                    className={c.bnb}
                                                ></small>
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div className='icon-box'>
                                                {c.icon}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row gutter={[24, 0]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={10}
                        className='mb-24'
                    >
                        <Card bordered={false} className='criclebox h-full'>
                            <Echart data={countMonth} />
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={14}
                        className='mb-24'
                    >
                        <Card bordered={false} className='criclebox h-full'>
                            <div style={{ fontSize: 20 }}>
                                Đơn đặt hàng mới nhất
                            </div>

                            <div>
                                <Table
                                    key={orders._id}
                                    size='small'
                                    bordered={false}
                                    rowClassName={() => "editable-row"}
                                    dataSource={dataSource}
                                    columns={columns}
                                    scroll={{ y: 350 }}
                                    style={{ marginTop: 50 }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={16}
                        className='mb-24'
                    >
                        <Card
                            bordered={false}
                            className='criclebox cardbody h-full'
                            style={{ minWidth: 819, minHeight: 567 }}
                        >
                            <div style={{ fontSize: 20 }}>
                                Top 20 sản phẩm bán chạy
                                <Button style={{ marginLeft: 15 }}>
                                    <FundOutlined
                                        style={{ marginTop: 6 }}
                                        onClick={exportToExcel}
                                    />
                                </Button>
                            </div>
                            <div>
                                <Table
                                    key={orders._id}
                                    size='small'
                                    bordered={false}
                                    rowClassName={() => "editable-row"}
                                    dataSource={dataSourceProducts}
                                    columns={columnsProducts}
                                    scroll={{ y: 405 }}
                                    style={{ marginTop: 50 }}
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={8}
                        className='mb-24'
                    >
                        <Card
                            bordered={false}
                            className='criclebox h-full'
                            style={{ minWidth: 393, minHeight: 567 }}
                        >
                            <div style={{ marginTop: 51 }}>
                                <Table
                                    key={orders._id}
                                    size='small'
                                    bordered={false}
                                    rowClassName={() => "editable-row"}
                                    dataSource={datacountOrderCus}
                                    columns={countOrderCusColums}
                                    scroll={{ y: 350 }}
                                    style={{ marginTop: 50 }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DashboardAdmin;
