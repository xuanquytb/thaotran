import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { modules, formats } from "./Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./Editor/style.css";
import { CategoryContext } from "../../../../../Store/Context/CategoryContext";
import { BrandContext } from "../../../../../Store/Context/BrandContext";

import {
    Modal,
    Tabs,
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    Upload,
    InputNumber,
    notification,
} from "antd";

import { SmileOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const { Option, OptGroup } = Select;

const ShowModalProduct = ({ visible, onClose, handleRegister }) => {
    const {
        categoryState: { categorys },
        getCategory,
    } = useContext(CategoryContext);
    useEffect(() => getCategory(), []);
    const {
        brandState: { brands },
        getBrand,
    } = useContext(BrandContext);
    useEffect(() => getBrand(), []);

    const [state, setState] = useState({ value: "" });

    const [quantityUnit, setQuantityUnit] = useState(1);
    const [disable, setDisable] = useState(true);
    const [fileList, setFileList] = useState([]);

    //////////////////////////////////////////////////////////
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [warranty, setWarranty] = useState("");
    const [origin, setOrigin] = useState("");
    const [unit, setUnit] = useState("");
    //////////////////////////////////////////////////////////

    const handleChange = (value) => {
        console.log(value);
        setState({ value });
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = (values) => {
        if (state.value === "") {
            notification.open({
                className: "custom-class",
                description: "Chưa nhập chi tiết sản phẩm",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        } else {
            const productCreate = {
                nameProduct: values.nameProduct,
                description: state.value,
                warranty: warranty,
                quantity: quantity,
                price: values.price,
                priceIn: values.priceIn,
                promotional: values.discount,
                status: values.state,
                image: values.nameImage.file.name,
                idCategory: category,
                idInvoiceIn: values.idInvoiceIn,
                idUnit: unit,
                idManufacturer: brand,
                idOrigin: origin,
            };
            handleRegister(productCreate);
        }
    };

    const ModalProduct = ({ visible, onClose }) => {
        function onChange(value) {
            console.log(value);
        }
    };

    const handChangeQuantityUniti = (e) => {
        setQuantityUnit(e.target.value);
    };

    const handChangeQuantity = (e) => {
        if (disable == true) {
            setQuantity(e.target.value * 1);
        }
        if (disable == false) {
            setQuantity(e.target.value * quantityUnit);
        }
    };

    const onChangeUnit = (e) => {
        setUnit(e);
        if (e === "1") {
            setDisable(true);
        }
        if (e === "2") {
            setDisable(false);
        }
    };
    return (
        <>
            <Modal
                centered
                visible={visible}
                onCancel={onClose}
                width={1000}
                footer={[]}
            >
                <Tabs type='card'>
                    <TabPane tab='Thông tin chính' key='1'>
                        <Form
                            layout='vertical'
                            hideRequiredMark
                            onFinish={onFinish}
                            initialValues={{
                                ["quantityUniti"]: "1",
                                ["unitSL"]: "1",
                                ["discount"]: "1",
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label='Mã chứng từ'
                                        name='idInvoiceIn'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Mã chứng từ bắt buộc phải nhập",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Mã chứng từ'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={9}></Col>
                                <Col span={9}></Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        label='Tên sản phẩm'
                                        name='nameProduct'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Tên sản phẩm không được để trống",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Tên sản phẩm'
                                            allowClear
                                            maxLength={50}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label='Giá nhập sản phẩm'
                                        name='priceIn'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Giá sản phẩm không được để trống",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Giá nhập sản phẩm'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label='Giá bán sản phẩm'
                                        name='price'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Giá sản phẩm không được để trống",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='Giá bán sản phẩm'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name='discount'
                                        label='Giảm giá (%)'
                                    >
                                        <InputNumber
                                            min={1}
                                            maxLength={2}
                                            style={{ height: 39 }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        name='category'
                                        label='Chọn danh mục sản phẩm'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Bạn chưa chọn danh mục sản phẩm",
                                            },
                                        ]}
                                    >
                                        <Select
                                            onChange={(e) => setCategory(e)}
                                        >
                                            {categorys.map((item, index) => {
                                                return (
                                                    <Select.Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.nameCategory}
                                                    </Select.Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name='warranty'
                                        label='Thời gian bảo hành'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Bạn chưa chọn danh mục sản phẩm",
                                            },
                                        ]}
                                    >
                                        <Select
                                            onChange={(e) => setWarranty(e)}
                                        >
                                            <OptGroup label='Thời gian bảo hành'>
                                                <Option value='1'>
                                                    1 tháng
                                                </Option>
                                                <Option value='6'>
                                                    6 tháng
                                                </Option>
                                                <Option value='12'>
                                                    12 tháng
                                                </Option>
                                            </OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name='brand'
                                        label='Chọn thương hiệu sản phẩm'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Bạn chưa chọn thương hiệu sản phẩm",
                                            },
                                        ]}
                                    >
                                        <Select onChange={(e) => setBrand(e)}>
                                            {brands.map((item, index) => {
                                                return (
                                                    <Select.Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.nameManufacturer}
                                                    </Select.Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name='origin'
                                        label='Xuất xứ'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Bạn chưa chọn xuất xứ",
                                            },
                                        ]}
                                    >
                                        <Select onChange={(e) => setOrigin(e)}>
                                            <OptGroup label='Xuất xứ'>
                                                <Option value='1'>
                                                    Việt Nam
                                                </Option>
                                                <Option value='2'>
                                                    Trung Quốc
                                                </Option>
                                            </OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={7}>
                                    <Form.Item
                                        name='uniti'
                                        label='Chọn đơn vị tính'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Bạn chưa chọn đơn vị tính",
                                            },
                                        ]}
                                    >
                                        <Select
                                            style={{ width: 250 }}
                                            onChange={onChangeUnit}
                                        >
                                            <OptGroup label='Đơn vị tính'>
                                                <Option value='1'>Chiếc</Option>
                                                <Option value='2'>Thùng</Option>
                                            </OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item
                                        name='quantityUniti'
                                        label='Số lượng'
                                    >
                                        <Input
                                            disabled={disable}
                                            allowClear
                                            onChange={handChangeQuantityUniti}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={5}>
                                    <Form.Item
                                        name='unitSL'
                                        label='Số lượng / đơn vị'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Số lượng / đơn vị không dược để trống",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder='00000000000000'
                                            allowClear
                                            onChange={handChangeQuantity}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item
                                        name='quantity'
                                        label='Số lượng sản phẩm'
                                    >
                                        <Input
                                            placeholder={quantity}
                                            // onChange={(quantity) =>
                                            //     console.log(quantity)
                                            // }
                                            disabled
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name='nameImage'
                                        label='Hình ảnh sản phẩm'
                                    >
                                        <Upload
                                            action={`http://localhost:8080/api/upload/image/product`}
                                            listType='picture'
                                            fileList={fileList}
                                            onChange={onChange}
                                            name='photo'
                                        >
                                            {fileList.length < 1 &&
                                                "+ Chọn ảnh"}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={19}>
                                <Col span={20}>
                                    <Form.Item
                                        name='state'
                                        label='Trạng thái'
                                        width={600}
                                    >
                                        <Select
                                            style={{ width: 250 }}
                                            onChange={(value) => {
                                                console.log(value);
                                            }}
                                        >
                                            <OptGroup label='Trạng thái'>
                                                <Option value='Còn hàng'>
                                                    Còn hàng
                                                </Option>
                                                <Option value='Hết hàng'>
                                                    Hết hàng
                                                </Option>
                                            </OptGroup>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <Button type='primary' htmlType='submit'>
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab='Mô tả sản phẩm' key='2'>
                        <div className='addNew__container'>
                            {/* <EditorToolbar /> */}
                            <ReactQuill
                                style={{ minHeight: 500 }}
                                theme='snow'
                                value={state.value}
                                onChange={handleChange}
                                placeholder={"Nội dung bài viết..."}
                                modules={modules}
                                formats={formats}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default ShowModalProduct;
