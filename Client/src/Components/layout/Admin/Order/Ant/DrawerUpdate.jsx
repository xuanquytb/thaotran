import React, { useState, useContext, useEffect } from "react";
import { Upload } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
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

const { Option, OptGroup } = Select;

const DrawerUpdate = ({ input, visible, onClose, handleUpdate }) => {
    console.log(input);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        setFileList([
            {
                uid: "-1",
                name: "Avata",
                status: "done",
                url: `http://localhost:8080/image/${"default.png"}`,
            },
        ]);
    }, []);

    const onFinish = (values) => {
        console.log(values);
        const orderUpdate = {
            id: input.id,
            state: values.state,
        };
        handleUpdate(orderUpdate);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <Drawer
            destroyOnClose
            title={"Tạo mới"}
            visible={visible}
            width={500}
            onClose={onClose}
        >
            <Form
                layout='vertical'
                hideRequiredMark
                onFinish={onFinish}
                initialValues={{
                    ["fullname"]: input.fullname,
                    ["address"]: input.address,
                    ["email"]: input.email,
                    ["phone"]: input.phone,
                    ["state"]: input.state,
                }}
            >
                <Row gutter={16}>
                    <Col span={9}></Col>
                    <Col span={9}>
                        <Upload
                            disabled
                            listType='picture-card'
                            fileList={fileList}
                            onChange={onChange}
                            name='photo'
                        >
                            {fileList.length < 1 && "+ Upload"}
                        </Upload>
                    </Col>
                    <Col span={9}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item label='Tên khách hàng' name='fullname'>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name='email' label='Email'>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='phone' label='Số điện thoại'>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name='state' label='Trạng thái đơn hàng'>
                            <Select style={{ width: 435 }}>
                                <OptGroup label='Giới tính'>
                                    <Option value='Chờ xác nhận'>
                                        Chờ xác nhận
                                    </Option>
                                    <Option value='Đang giao hàng'>
                                        Đang giao hàng
                                    </Option>
                                    <Option value='Đã giao hàng'>
                                        Đã giao hàng
                                    </Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={19}>
                    <Col span={20}>
                        <Form.Item
                            name='address'
                            label='Địa chỉ nhận hàng'
                            width={600}
                        >
                            <Input placeholder='Địa chỉ' allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default DrawerUpdate;
