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

const ShowDrawer = ({ visible, onClose, handleRegister }) => {
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
        const userUpdate = {
            username: values.username,
            password: values.password,
            passwordRe: values.passwordRe,
            fullname: values.fullname,
            email: values.email,
            phone: values.phone,
            address: values.address,
            sex: values.sex,
            dateOfBirth: values.ngaysinh.format("YYYY/MM/DD"),
        };
        handleRegister(userUpdate);
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
                    ["sex"]: "Khác",
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
                    <Col span={12}>
                        <Form.Item
                            label='Tên đăng nhập'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Tên đăng nhập không được để trống",
                                },
                            ]}
                        >
                            <Input placeholder='Tên đăng nhập' allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Họ và tên'
                            name='fullname'
                            rules={[
                                {
                                    required: true,
                                    message: "Họ tên không được để trống",
                                },
                            ]}
                        >
                            <Input placeholder='Họ và tên' allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name='sex'
                            label='Giới tính'
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn giới tính",
                                },
                            ]}
                        >
                            <Select style={{ width: 200 }}>
                                <OptGroup label='Giới tính'>
                                    <Option value='Nam'>Nam</Option>
                                    <Option value='Nữ'>Nữ</Option>
                                </OptGroup>
                                <OptGroup label='Khác'>
                                    <Option value='Khác'>Khác</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='ngaysinh' label='Ngày sinh'>
                            <DatePicker
                                format='DD-MM-YYYY'
                                placeholder='DD-MM-YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[
                                {
                                    required: true,
                                    message: "Email không được để trống",
                                    email: true,
                                },
                            ]}
                        >
                            <Input placeholder='abcxyz@gmail.com' allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='phone'
                            label='Số điện thoại'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Số điện thoại không được để trống",
                                },
                            ]}
                        >
                            <Input
                                placeholder='0xxxx.xxx.xxx'
                                allowClear
                                maxLength={11}
                                showCount
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[
                                {
                                    required: true,
                                    message: "Không được để trống",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder='Mật khẩu'
                                allowClear
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='passwordRe'
                            label='Nhập lại mật khẩu'
                            rules={[
                                {
                                    required: true,
                                    message: "Không được để trống",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder='Nhập lại mật khẩu'
                                allowClear
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
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
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ShowDrawer;
