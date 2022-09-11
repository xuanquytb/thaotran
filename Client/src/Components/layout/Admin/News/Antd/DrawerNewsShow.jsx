import React from "react";
import { Drawer, Descriptions, Badge, Image } from "antd";

import HTMLReactParser from "html-react-parser";

const ShowDrawer = ({ input, visible, onClose }) => {
  console.log(input.nameImage);
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
        style={{ height: 200, width: 550 }}
        src={`http://localhost:8080/image/news/${input.nameImage}`}
      />
      <Descriptions title="Thông tin sản phẩm" layout="vertical" bordered>
        <Descriptions.Item label="Tên chủ đề">
          {input.nameNews}
        </Descriptions.Item>

        <Descriptions.Item label="Tóm tắt" span={2}>
          {input.brief}
        </Descriptions.Item>
        <Descriptions.Item label="Tác giả">{input.author}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="" layout="vertical" bordered>
        <Descriptions.Item label="Chi tiết bài đăng">
          {HTMLReactParser(`${input.content}`)}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ padding: 10 }}></div>
    </Drawer>
  );
};

export default ShowDrawer;
