import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../Store/Context/AuthContext";
import moment from "moment";
import {
    Form,
    Button,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    notification,
} from "antd";
import { UserContext } from "../../../../../Store/Context/UserContext";
import "./style.css";
const { Option, OptGroup } = Select;
import { SmileOutlined } from "@ant-design/icons";
import stylesCus from "../scss/antd.module.scss";

const Infomation = () => {
    const { authState } = useContext(AuthContext);

    const {
        userState: { users },
        updateUser,
    } = useContext(UserContext);

    const onFinish = async (values) => {
        const data = {
            id: authState.user[0].id,
            fullname: values.fullname,
            email: values.email,
            phone: values.phone,
            address: values.address,
            sex: values.sex,
            dateOfBirth: values.ngaysinh.format("YYYY/MM/DD"),
        };
        const result = await updateUser(data);
        if (result.success) {
            notification.open({
                className: "custom-class",
                description: "Cập nhật thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
        } else {
            notification.open({
                description: result.message,
                message: "Cập nhật thất bại",
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
        <div style={{ minWidth: 900, padding: 10 }}>
            <Form
                layout='vertical'
                hideRequiredMark
                onFinish={onFinish}
                initialValues={{
                    ["id"]: authState.user[0].id,
                    ["username"]: authState.user[0].username,
                    ["fullname"]: authState.user[0].fullname,
                    ["sex"]: authState.user[0].sex,
                    ["email"]: authState.user[0].email,
                    ["phone"]: authState.user[0].phone,
                    ["address"]: authState.user[0].address,
                    ["ngaysinh"]: moment(authState.user[0].dateOfBirth),
                }}
            >
                <Row gutter={16}>
                    <Col span={9}></Col>
                    <Col span={9}></Col>
                    <Col span={9}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            label='Tên đăng nhập'
                        >
                            <Input
                                style={{
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                                disabled
                                placeholder={authState.user[0].username}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            label='Họ và tên'
                            name='fullname'
                            rules={[
                                {
                                    required: true,
                                    message: "Họ tên không được để trống",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            name='sex'
                            label='Giới tính'
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn giới tính",
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 168,
                                    borderRadius: "24px !important",
                                }}
                                className={stylesCus.select_ant_custom}
                            >
                                <OptGroup
                                    label='Giới tính'
                                    style={{
                                        borderRadius: "24px !important",
                                    }}
                                >
                                    <Option value='Nam'>Nam</Option>
                                    <Option value='Nữ'>Nữ</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            name='ngaysinh'
                            label='Ngày sinh'
                        >
                            <DatePicker
                                style={{
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                                format='DD-MM-YYYY'
                                placeholder='DD-MM-YYYY'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            name='email'
                            label='Email'
                            rules={[
                                {
                                    required: true,
                                    message: "Email không được để trống",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
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
                                style={{
                                    borderRadius: 24,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={19}>
                    <Col span={20}>
                        <Form.Item
                            className={stylesCus.ant_form_item_required}
                            name='address'
                            label='Địa chỉ nhận hàng'
                            width={435}
                        >
                            <Input
                                style={{
                                    borderRadius: 24,
                                    width: 435,
                                    background:
                                        "linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    className={stylesCus.ant_form_item_required}
                    wrapperCol={{ offset: 20, span: 16 }}
                >
                    <Button type='primary' htmlType='submit'>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Infomation;
