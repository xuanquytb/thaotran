import React, { useState, useContext, useEffect } from "react";
import { Upload } from "antd";
import { CategoryContext } from "../../../../../Store/Context/CategoryContext";
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

const { TextArea } = Input;

const ShowDrawerProduct = ({ input, visible, onClose, onUpdate }) => {
    const [fileList, setFileList] = useState([]);
    const { getCategory } = useContext(CategoryContext);
    useEffect(() => {
        setFileList([
            {
                uid: "-1",
                name: "Avata",
                status: "done",
                url: `http://localhost:8080/image/${input.image}`,
            },
        ]);
    }, [input]);

    const onFinish = (values) => {
        const categoryUpdate = {
            id: input.id,
            nameCategory: values.nameCategory,
            description: values.description,
        };
        onUpdate(categoryUpdate);
    };

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        getCategory();
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
                    ["nameCategory"]: input.nameCategory,
                    ["description"]: input.description,
                }}
            >
                <Row gutter={16}>
                    <Col span={9}></Col>
                    <Col span={9}>
                        <Upload
                            action={`http://localhost:8080/api/upload/image/category/${input.id}`}
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

export default ShowDrawerProduct;
