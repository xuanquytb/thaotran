import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { modules, formats } from "./Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./Editor/style.css";
import { CategoryContext } from "../../../../../Store/Context/CategoryContext";
import { CategoryNewsContext } from "../../../../../Store/Context/CategoryNewsContext";
import { AuthContext } from "../../../../../Store/Context/AuthContext";

import {
  Modal,
  Tabs,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Upload,
} from "antd";

const { TextArea } = Input;

import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const { Option, OptGroup } = Select;

const ShowModalCreateNews = ({ visible, onClose, handleCreate }) => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    newsCategoryState: { categoryNews },
    getNewsCategory,
  } = useContext(CategoryNewsContext);
  useEffect(() => getNewsCategory(), []);

  const [state, setState] = useState({ value: "" });
  const [categoryNew, setCategoryNew] = useState();
  const [fileList, setFileList] = useState([]);

  const handleChange = (value) => {
    setState({ value });
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (values) => {
    const newsCreate = {
      nameNews: values.nameNews,
      brief: values.brief,
      content: state.value,
      nameImage: values.nameImage.file.name,
      author: user[0].fullname,
      state: values.state,
      idNewsCategory: categoryNew.split("/")[1],
      idUser: user[0].id,
    };
    handleCreate(newsCreate);
  };

  return (
    <>
      <Modal
        centered
        visible={visible}
        onCancel={onClose}
        width={1000}
        footer={[]}
      >
        <Tabs type="card">
          <TabPane tab="Thông tin chính" key="1">
            <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={9}></Col>
                <Col span={9}></Col>
                <Col span={9}></Col>
              </Row>
              <Row gutter={16}>
                <Col span={23}>
                  <Form.Item
                    label="Chủ đề tin tức"
                    name="nameNews"
                    rules={[
                      {
                        required: true,
                        message: "Chủ đề tin tức không được để trống",
                      },
                    ]}
                  >
                    <Input placeholder="Chủ đề tin tức" allowClear />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="categoryNews"
                    label="Chọn danh mục tin tức"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn danh mục tin tức",
                      },
                    ]}
                  >
                    <Select onChange={(e) => setCategoryNew(e)}>
                      {categoryNews.map((item, index) => {
                        return (
                          <Select.Option
                            key={item.id}
                            value={item.title + "/" + item.id}
                          >
                            {item.title}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={23}>
                  <Form.Item
                    name="brief"
                    label="Tóm tắt"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa chọn danh mục tin tức",
                      },
                    ]}
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="nameImage" label="Hình ảnh sản phẩm">
                    <Upload
                      action={`http://localhost:8080/api/upload/image/news`}
                      listType="picture"
                      fileList={fileList}
                      onChange={onChange}
                      name="photo"
                    >
                      {fileList.length < 1 && "+ Chọn ảnh"}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={19}>
                <Col span={20}>
                  <Form.Item name="state" label="Trạng thái" width={600}>
                    <Select
                      style={{ width: 250 }}
                      onChange={(value) => {
                        console.log(value);
                      }}
                    >
                      <OptGroup label="Trạng thái">
                        <Option value="1">Đang hiển thị</Option>
                        <Option value="0">Ẩn tin</Option>
                      </OptGroup>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Mô tả sản phẩm" key="2">
            <div className="addNew__container">
              {/* <EditorToolbar /> */}
              <ReactQuill
                style={{ minHeight: 500 }}
                theme="snow"
                value={state.value}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
              />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default ShowModalCreateNews;
