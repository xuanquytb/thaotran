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
                src={`http://localhost:8080/image/${input.image}`}
            />
            {/* id: 2, nameCategory: 'Nhà cửa đời sống', image: 'default.jpg', description: 'default.jpg'} */}
            <Descriptions
                title='Thông tin nghành hàng'
                layout='vertical'
                bordered
            >
                <Descriptions.Item label='Tên ngành hàng'>
                    {input.nameCategory}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Chi tiết ngành hàng'>
                    {input.description}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ padding: 10 }}></div>
        </Drawer>
    );
};

export default ShowDrawer;
