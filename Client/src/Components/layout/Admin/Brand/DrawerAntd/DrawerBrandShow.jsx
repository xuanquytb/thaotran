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
                src={`http://localhost:8080/image/${input.nameImage}`}
            />
            <Descriptions
                title='Thông tin nghành hàng'
                layout='vertical'
                bordered
            >
                <Descriptions.Item label='Tên thương hiệu'>
                    {input.nameManufacturer}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Số điện thoại'>
                    {input.phone}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                    {input.mail}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ padding: 10 }}></div>
        </Drawer>
    );
};

export default ShowDrawer;
