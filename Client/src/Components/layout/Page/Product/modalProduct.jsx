import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, InputNumber, Descriptions } from "antd";
import { Layout } from "antd";
const { Content } = Layout;
import axios from "axios";
import { Image } from "antd";
import HTMLReactParser from "html-react-parser";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { CardContext } from "../../../../Store/Context/CardContext";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const ModalProduct = ({ visible, onClose, product }) => {
    const [products, setProducts] = useState();
    const [quantityNum, setQuantityNum] = useState(1);
    const {
        authState: { user },
    } = useContext(AuthContext);

    const {
        cardState: { cards },
        createCard,
        getCard,
    } = useContext(CardContext);

    function onChange(value) {
        let quanty = +value.target.value;
        if (quanty > products.quantity) quanty = products.quantity;
        else if (quanty < 1) quanty = 1;

        console.log(quanty);
        setQuantityNum(quanty);
    }

    useEffect(async () => {
        const result = await axios.get(
            `http://localhost:8080/api/product/findproduct/${product}`
        );
        setProducts(result.data.products);
    }, [product]);

    const addToCarthandler = async () => {
        // console.log(products.quantity);
        const item = {
            idCard: user[0].idCard,
            idProduct: products.id,
            idCoupon: "",
            dongia:
                products.price - (products.price * products.promotional) / 100,
            quantity: quantityNum,
            sumMoney: "",
        };

        const result = await createCard(item);
        if (result) {
            getCard();
            notification.open({
                className: "custom-class",
                description: "Thêm vào giỏ thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                duration: 1,
            });
        } else {
            notification.open({
                description: "Thêm vào giỏ thất bại",
                className: "custom-class",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        }
    };
    return (
        <>
            <Modal
                centered
                visible={visible}
                onCancel={onClose}
                width={1300}
                footer={[]}
            >
                <div className='detailProduct'>
                    <div className='itemLeft' style={{ height: "475px" }}>
                        <Image
                            width={450}
                            src={
                                products !== undefined
                                    ? `http://localhost:8080/image/procuct/${products.image}`
                                    : ""
                            }
                            style={{
                                width: "450px",
                                height: "450px",
                            }}
                        />
                    </div>
                    <div className='itemRight'>
                        <div>
                            <h2 className='nameProduct'>
                                {products !== undefined
                                    ? products.nameProduct
                                    : ""}
                            </h2>
                            <div
                                className='reviewProduct'
                                style={{ marginTop: 85 }}
                            >
                                <div className='review-Damua'>
                                    Đã bán:
                                    {products !== undefined
                                        ? products.sold
                                        : ""}
                                </div>
                            </div>

                            <div className='price-product'>
                                <div
                                    className='origin-price'
                                    style={{ fontSize: 15 }}
                                >
                                    ₫{" "}
                                    {products !== undefined
                                        ? products.price.toLocaleString(
                                              "vi-VN",
                                              {
                                                  style: "currency",
                                                  currency: "VND",
                                              }
                                          )
                                        : ""}
                                </div>
                                <div
                                    className='price-buy'
                                    style={{ fontSize: 25 }}
                                >
                                    ₫
                                    {products !== undefined
                                        ? `${(
                                              products.price -
                                              (products.price *
                                                  products.promotional) /
                                                  100
                                          ).toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                          })}`
                                        : ""}
                                </div>
                                <div className='discount'>
                                    {products !== undefined
                                        ? products.promotional
                                        : ""}
                                    % GIẢM
                                </div>
                            </div>

                            <div className='qualiti-product'>
                                <span>Số lượng</span>
                                <input
                                    type={"number"}
                                    value={quantityNum}
                                    onChange={onChange}
                                    style={{ width: 72 }}
                                />
                                {/* <InputNumber
                                    min={1}
                                    defaultValue={1}
                                    onChange={onChange}
                                    type={"number"}
                                /> */}
                                <span className='avaliable-product'>
                                    {products !== undefined
                                        ? `${products.quantity}`
                                        : ""}{" "}
                                    sản phẩm có sẵn
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    marginTop: "15px",
                                }}
                            >
                                <Button
                                    size='large'
                                    shape='round'
                                    type='danger'
                                    onClick={addToCarthandler}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                            <div className='policy'>
                                <div className='return-policy'>
                                    7 ngày miễn phí trả hàng
                                </div>
                                <div className='price-ship'>
                                    Đảm bảo hàng chính hãng
                                </div>
                                <div className='price-real'>
                                    Giao hàng nhanh chóng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <strip></strip>
                <div className='detail-more-Product'>
                    <div className='more-detail'>
                        <h2 className='title-detail'>Chi tiết sản phẩm</h2>
                        <Descriptions>
                            <Descriptions.Item label='Thương hiệu: '>
                                {products !== undefined
                                    ? `${products.nameManufacturer}`
                                    : ""}
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label='Xuất xứ: '>
                                {products !== undefined
                                    ? `${products.nameOrigin}`
                                    : ""}
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label='Số lượng còn lại: '>
                                {products !== undefined
                                    ? `${products.quantity}`
                                    : ""}
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label='Gửi từ: '>
                                Hà nội
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div>
                        <h2 className='title-detail'>Mô tả sản phẩm</h2>
                        {products !== undefined
                            ? HTMLReactParser(`${products.description}`)
                            : ""}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalProduct;
