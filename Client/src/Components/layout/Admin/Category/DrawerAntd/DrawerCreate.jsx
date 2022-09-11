import React, { useState, useContext, useEffect } from "react";
import { Upload } from "antd";
import moment from "moment";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Drawer, Form, Button, Col, Row, Input } from "antd";

const { TextArea } = Input;

const ShowDrawer = ({ visible, onClose, handleCreate }) => {
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
        const categoryUpdate = {
            nameCategory: values.nameCategory,
            description: values.description,
        };
        handleCreate(categoryUpdate);
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
            <Form layout='vertical' hideRequiredMark onFinish={onFinish}>
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
                        <Form.Item label='Tên ngành hàng' name='nameCategory'>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Form.Item
                        style={{ marginLeft: "8px" }}
                        name='description'
                        label='Mô tả'
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <TextArea
                            rows={15}
                            style={{ width: "443px", resize: "none" }}
                        />
                    </Form.Item>
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

export default ShowDrawer;
