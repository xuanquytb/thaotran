import React, { useState, useContext, useEffect } from "react";
import { Upload } from "antd";
import { BrandContext } from "../../../../../Store/Context/BrandContext";
import { Drawer, Form, Button, Col, Row, Input } from "antd";

const { TextArea } = Input;

const ShowDrawerProduct = ({ input, visible, onClose, onUpdate }) => {
    console.log(input);
    const [fileList, setFileList] = useState([]);
    const { getBrand } = useContext(BrandContext);
    useEffect(() => {
        setFileList([
            {
                uid: "-1",
                name: "Avata",
                status: "done",
                url: `http://localhost:8080/image/${input.nameImage}`,
            },
        ]);
    }, [input]);

    const onFinish = (values) => {
        const brandUpdate = {
            id: input.id,
            nameManufacturer: values.nameManufacturer,
            phone: values.phone,
            address: values.address,
            mail: values.mail,
        };
        // console.log(brandUpdate);
        onUpdate(brandUpdate);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        getBrand();
    };

    return (
        <Drawer
            destroyOnClose
            title={input.fullname}
            visible={visible}
            width={500}
            onClose={onClose}
        >
            <Form
                layout='vertical'
                hideRequiredMark
                onFinish={onFinish}
                initialValues={{
                    ["nameManufacturer"]: input.nameManufacturer,
                    ["phone"]: input.phone,
                    ["address"]: input.address,
                    ["mail"]: input.mail,
                }}
            >
                <Row gutter={16}>
                    <Col span={9}></Col>
                    <Col span={9}>
                        <Upload
                            action={`http://localhost:8080/api/upload/image/brand/${input.id}`}
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
                            label='Tên thương hiệu'
                            name='nameManufacturer'
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label='Số điện thoại' name='phone'>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Email'
                            name='mail'
                            rules={[
                                {
                                    required: true,
                                    message: "Họ tên không được để trống",
                                },
                            ]}
                        >
                            <Input placeholder={input.fullname} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label='Địa chỉ' name='address'>
                            <Input />
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

export default ShowDrawerProduct;
