import React, { useState, useContext, useEffect } from "react";
import { Upload, Descriptions, Image } from "antd";
import moment from "moment";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ProductContext } from "../../../../../Store/Context/ProductContext";
import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
} from "antd";
import { useHistory } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "../css/styleshow.module.css";

const cx = classNames.bind(styles);

const { Option, OptGroup } = Select;

const ShowDrawerInsurance = ({ visible, onClose }) => {
    const [listItem, setListItem] = useState([]);
    const { getProductWithIdInvoiceIn } = useContext(ProductContext);
    const [id, setId] = useState(0);
    const history = useHistory();
    const handleExport = () => {
        history.push({
            pathname: "/Insurance",
            state: { dataProduct: listItem, idInvoiceIn: id },
        });
        window.location.reload();
    };

    const onFinish = async (values) => {
        setId(values.idCT);
        const result = await getProductWithIdInvoiceIn(values.idCT);
        setListItem(result);
    };

    return (
        <Drawer
            destroyOnClose
            title={"Phiếu nhập kho"}
            visible={visible}
            width={800}
            onClose={onClose}
        >
            <Form layout='vertical' hideRequiredMark onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name='idCT'
                            label='Mã chứng từ'
                            rules={[
                                {
                                    required: true,
                                    message: "Không được để trống",
                                },
                            ]}
                        >
                            <Input placeholder='Mã chứng từ' allowClear />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        Kiểm tra
                    </Button>
                </Form.Item>
            </Form>
            <div>Bảng kê khai sản phẩm</div>
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
                                                {item.priceIn.toLocaleString(
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
                                                    {item.quantityIn}
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
                                                    item.quantityIn *
                                                    item.priceIn
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
            <Button type='primary' htmlType='submit' onClick={handleExport}>
                In phiếu nhập kho
            </Button>
        </Drawer>
    );
};

export default ShowDrawerInsurance;
