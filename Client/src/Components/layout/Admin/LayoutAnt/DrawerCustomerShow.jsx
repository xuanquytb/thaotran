import React from "react";
import { Drawer, Descriptions, Badge, Image } from "antd";

const ShowDrawer = ({ input, visible, onClose }) => {
    return (
        <Drawer
            destroyOnClose
            title={input.fullname}
            visible={visible}
            width={600}
            onClose={onClose}
        >
            <Image
                width={100}
                style={{
                    borderRadius: "50%",
                }}
                src={`http://localhost:8080/image/${input.nameAvata}`}
            />
            <Descriptions
                title='Thông tin tài khoản'
                layout='vertical'
                bordered
            >
                <Descriptions.Item label='Trạng thái' span={5}>
                    <Badge status='processing' text='Đang hoạt động' />
                </Descriptions.Item>
                <Descriptions.Item label='Tên đăng nhập'>
                    {input.username}
                </Descriptions.Item>

                <Descriptions.Item label='Họ và tên'>
                    {input.fullname}
                </Descriptions.Item>

                <Descriptions.Item label='Giới tính'>
                    {input.sex}
                </Descriptions.Item>

                <Descriptions.Item label='Email' span={2}>
                    {input.email}
                </Descriptions.Item>

                <Descriptions.Item label='Số điện thoại'>
                    {input.phone}
                </Descriptions.Item>

                <Descriptions.Item label='Địa chỉ'>
                    {input.address}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ padding: 10 }}></div>
        </Drawer>
    );
};

export default ShowDrawer;
