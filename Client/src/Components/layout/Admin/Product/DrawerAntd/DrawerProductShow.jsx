import React from "react";
import { Drawer, Descriptions, Badge, Image, Button } from "antd";

import HTMLReactParser from "html-react-parser";

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
                src={`http://localhost:8080/image/procuct/${input.image}`}
            />
            <Descriptions title='Thông tin sản phẩm' layout='vertical' bordered>
                <Descriptions.Item label='Trạng thái' span={5}>
                    <Badge status='processing' text='Đang hoạt động' />
                </Descriptions.Item>
                <Descriptions.Item label='Tên sản phẩm'>
                    {input.nameProduct}
                </Descriptions.Item>

                <Descriptions.Item label='Bảo hành' span={2}>
                    {input.warranty}
                </Descriptions.Item>

                <Descriptions.Item label='Số lượng'>
                    {input.quantity}
                </Descriptions.Item>

                <Descriptions.Item label='Giá gốc'>
                    {input.price}
                </Descriptions.Item>
                <Descriptions.Item label='Giảm giá'>
                    {input.promotional}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title='' layout='vertical' bordered>
                <Descriptions.Item label='Chi tiết sản phẩm'>
                    {HTMLReactParser(`${input.description}`)}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ padding: 10 }}></div>
        </Drawer>
    );
};

export default ShowDrawer;
