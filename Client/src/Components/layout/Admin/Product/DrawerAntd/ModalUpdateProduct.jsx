import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import { modules, formats } from "./Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./Editor/style.css";
import { CategoryContext } from "../../../../../Store/Context/CategoryContext";
import { BrandContext } from "../../../../../Store/Context/BrandContext";
import axios from "axios";

import {
    Drawer,
    Tabs,
    Form,
    Col,
    Row,
    Input,
    Select,
    Button,
    InputNumber,
} from "antd";

const { TabPane } = Tabs;

const { Option, OptGroup } = Select;

const ModalUpdateProduct = ({ input, visible, onClose, onUpdate }) => {
    const [state, setState] = useState({ value: input.description });
    const [unit, setUnit] = useState("");
    const [quantitynew, setQuantityNew] = useState(0);
    const [disable, setDisable] = useState(true);
    const [quantityUnit, setQuantityUnit] = useState(1);

    const handleChange = (value) => {
        setState({ value });
    };

    useEffect(() => {
        setState({ value: input.description });
    }, [input]);

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

    const onFinish = (values) => {
        const productUpdate = {
            id: input.id,
            nameProduct: values.nameProduct,
            description: state.value,
            warranty: values.warranty,
            quantity: values.quantity + quantitynew,
            promotional: values.discount,
            price: values.price,
            status: values.state,
            nameCategory: values.category,
            nameBrand: values.brand,
            nameOrigin: values.origin,
        };
        onUpdate(productUpdate);
    };

    const handChangeQuantityUniti = (e) => {
        setQuantityUnit(e.target.value);
    };

    const handChangeQuantity = (e) => {
        if (disable == true) {
            setQuantityNew(e.target.value * 1);
        }
        if (disable == false) {
            setQuantityNew(e.target.value * quantityUnit);
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
            <Drawer
                destroyOnClose
                title={input.fullname}
                visible={visible}
                width={1100}
                onClose={onClose}
            >
                <Form
                    layout='vertical'
                    hideRequiredMark
                    onFinish={onFinish}
                    initialValues={{
                        ["nameProduct"]: input.nameProduct,
                        ["warranty"]: input.warranty + " Tháng",
                        ["quantity"]: input.quantity,
                        ["price"]: input.price,
                        ["discount"]: input.promotional,
                        ["state"]: input.status,
                        ["category"]: input.nameCategory,
                        ["uniti"]: input.nameUnit,
                        ["brand"]: input.nameManufacturer,
                        ["origin"]: input.nameOrigin,
                        ["quantityUniti"]: "1",
                        ["unitSL"]: "1",
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
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
                                    //   defaultValue={stateInput.nameProduct}
                                    placeholder='Tên sản phẩm'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Giá sản phẩm'
                                name='price'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Giá sản phẩm không được để trống",
                                    },
                                ]}
                            >
                                <Input placeholder='Giá sản phẩm' allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name='discount' label='Giảm giá (%)'>
                                <InputNumber
                                    min={1}
                                    max={100}
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
                                <Select>
                                    {categorys.map((item, index) => {
                                        return (
                                            <Select.Option
                                                key={item.nameCategory}
                                                value={item.nameCategory}
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
                                <Select>
                                    <OptGroup label='Thời gian bảo hành'>
                                        <Option value='1'>1 tháng</Option>
                                        <Option value='6'>6 tháng</Option>
                                        <Option value='12'>12 tháng</Option>
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
                                <Select>
                                    {brands.map((item, index) => {
                                        return (
                                            <Select.Option
                                                key={item.nameManufacturer}
                                                value={item.nameManufacturer}
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
                                        message: "Bạn chưa chọn xuất xứ",
                                    },
                                ]}
                            >
                                <Select>
                                    <OptGroup label='Xuất xứ'>
                                        <Option value='Việt Nam'>
                                            Việt Nam
                                        </Option>
                                        <Option value='Trung Quốc'>
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
                                        message: "Bạn chưa chọn đơn vị tính",
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
                            <Form.Item name='quantityUniti' label='Số lượng'>
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
                                name='quantitynew'
                                label='Số lượng sản phẩm mới nhập'
                            >
                                <Input
                                    placeholder={quantitynew}
                                    disabled
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name='quantity'
                                label='Số lượng sản phẩm trong kho'
                            >
                                <Input allowClear disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='quantityupdate'
                                label='Số lượng mới'
                            >
                                <Input
                                    placeholder={quantitynew + input.quantity}
                                    allowClear
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name='state'
                                label='Trạng thái'
                                width={600}
                            >
                                <Select style={{ width: 250 }}>
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
                    <Row gutter={16}>
                        <Form.Item
                            style={{ marginLeft: "8px" }}
                            name='description'
                            label='Mô tả'
                        >
                            <div className='addNew__container'>
                                {/* <EditorToolbar /> */}
                                <ReactQuill
                                    style={{ minHeight: 500 }}
                                    theme='snow'
                                    value={state.value}
                                    onChange={handleChange}
                                    placeholder={
                                        "Nhập nội dung sản phẩm tại đây..."
                                    }
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                        </Form.Item>
                    </Row>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default ModalUpdateProduct;
