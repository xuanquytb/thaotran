import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../Store/Context/AuthContext";
import moment from "moment";
import { Form, Button, Col, Row, Input, Select, DatePicker } from "antd";

const { Option, OptGroup } = Select;

const Infomation = () => {
  const { authState } = useContext(AuthContext);
  const onFinish = (values) => {
    const userUpdate = {
      id: values.id,
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      address: values.address,
      sex: values.sex,
      dateOfBirth: values.ngaysinh.format("YYYY/MM/DD"),
    };
    onUpdate(userUpdate);
  };

  return (
    <div>
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        initialValues={{
          ["username"]: authState.user[0].username,
          ["fullname"]: authState.user[0].fullname,
          ["sex"]: authState.user[0].sex,
          ["email"]: authState.user[0].email,
          ["phone"]: authState.user[0].phone,
          ["address"]: authState.user[0].address,
          ["ngaysinh"]: moment(authState.user[0].ngaysinh),
        }}
      >
        <Row gutter={16}>
          <Col span={9}></Col>
          <Col span={9}></Col>
          <Col span={9}></Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tên đăng nhập">
              <Input disabled placeholder={authState.user[0].username} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="sex"
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa chọn giới tính",
                },
              ]}
            >
              <Select style={{ width: 200 }}>
                <OptGroup label="Giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </OptGroup>
                <OptGroup label="Khác">
                  <Option value="Khác">Khác</Option>
                </OptGroup>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngaysinh" label="Ngày sinh">
              <DatePicker format="DD-MM-YYYY" placeholder="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={19}>
          <Col span={20}>
            <Form.Item name="address" label="Địa chỉ nhận hàng" width={600}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Infomation;
