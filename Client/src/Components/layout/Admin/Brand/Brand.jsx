import React from "react";
import { useContext, useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import DrawerCreate from "./DrawerAntd/DrawerBrandCreate";
import DrawerBrandShow from "./DrawerAntd/DrawerBrandShow";
import DrawerBrandUpdate from "./DrawerAntd/DrawerBrandUpdate";
import { BrandContext } from "../../../../Store/Context/BrandContext";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import "./css/style.css";
import styleTables from "./scss/styleTables.module.scss";

const BrandContent = () => {
    const {
        brandState: { brands },
        getBrand,
        deleteBrand,
        createBrand,
        updateBrand,
    } = useContext(BrandContext);

    const [visibleShow, setVisibleShow] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [brand, setBrand] = useState({});
    const [brandEdit, setBrandEdit] = useState({});

    useEffect(() => getBrand(), []);
    const dataSource = brands.map((brand) => {
        return {
            key: brand.id,
            nameManufacturer: brand.nameManufacturer,
            phone: brand.phone,
            address: brand.address,
            nameImage: brand.nameImage,
            mail: brand.mail,
        };
    });

    const onClose = () => {
        setVisibleShow(false);
        setVisibleUpdate(false);
        setVisibleCreate(false);
    };

    const handleDelete = async (id) => {
        const result = await deleteBrand(id.key);
        if (result) {
            notification.open({
                className: "custom-class",
                description: "Xóa thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
        } else {
            notification.open({
                description: "Xóa thất bại",
                className: "custom-class",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        }
    };

    const handleShow = async (record) => {
        console.log("record" + record);
        setBrand({
            id: record.key,
            nameManufacturer: record.nameManufacturer,
            phone: record.phone,
            address: record.address,
            nameImage: record.nameImage,
            mail: record.mail,
        });
        setVisibleShow(true);
    };

    const handleEdit = async (record) => {
        setBrandEdit({
            id: record.key,
            nameManufacturer: record.nameManufacturer,
            phone: record.phone,
            address: record.address,
            nameImage: record.nameImage,
            mail: record.mail,
        });
        setVisibleUpdate(true);
    };

    const handleUpdate = async (record) => {
        const result = await updateBrand(record);
        if (result) {
            getBrand();
            notification.open({
                className: "custom-class",
                description: "Cập nhật thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
        } else {
            notification.open({
                description: "Cập nhật thất bại",
                className: "custom-class",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        }
    };

    const handleShowCreate = async () => {
        setVisibleCreate(true);
    };

    const handleCreate = async (record) => {
        const result = await createBrand(record);
        if (result.success) {
            getBrand();
            notification.open({
                className: "custom-class",
                description: "Thêm thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
        } else {
            notification.open({
                description: result.message,
                message: "Thêm thất bại",
                className: "custom-class",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        }
    };

    const columns = [
        {
            title: "Tên thương hiệu",
            dataIndex: "nameManufacturer",
            key: "nameManufacturer",
            width: "18%",
            editable: true,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "mail",
            key: "mail",
            width: "20%",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "20%",
        },
        {
            title: "Thao Tác",
            width: "10%",
            key: "4",
            dataIndex: "operation",
            render: (_, record) =>
                brands.length >= 0 ? (
                    <>
                        <Button
                            style={{
                                padding: 0,
                                width: 30,
                                marginRight: 5,
                                borderRadius: 20,
                            }}
                            type='text'
                            onClick={() => handleShow(record)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='25'
                                height='25'
                            >
                                <path fill='none' d='M0 0h24v24H0z' />
                                <path d='M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' />
                            </svg>
                        </Button>
                        <Popconfirm
                            title='Bạn chắc chắn muốn xóa ?'
                            onConfirm={() => handleDelete(record)}
                        >
                            <Button
                                style={{
                                    padding: 0,
                                    width: 30,
                                    marginRight: 5,
                                    borderRadius: 20,
                                }}
                                type='text'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    width='24'
                                    height='24'
                                >
                                    <path fill='none' d='M0 0h24v24H0z' />
                                    <path d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z' />
                                </svg>
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title='Bạn chắc chắn muốn sửa người dùng ?'
                            onConfirm={() => handleEdit(record)}
                        >
                            <Button
                                style={{
                                    padding: 0,
                                    width: 30,
                                    marginRight: 5,
                                    borderRadius: 20,
                                }}
                                type='text'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    width='24'
                                    height='24'
                                >
                                    <path fill='none' d='M0 0h24v24H0z' />
                                    <path d='M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z' />
                                </svg>
                            </Button>
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];

    return (
        <>
            <div className='content-brand'>
                <Button
                    className='btn-addNew'
                    type='primary'
                    style={{
                        marginBottom: 16,
                    }}
                    onClick={() => handleShowCreate()}
                >
                    Tạo mới
                </Button>
                <Table
                    className={styleTables.custom_information_table}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 350 }}
                />
            </div>
            <DrawerCreate
                visible={visibleCreate}
                onClose={onClose}
                handleCreate={handleCreate}
            />
            <DrawerBrandShow
                input={brand}
                visible={visibleShow}
                onClose={onClose}
            />
            <DrawerBrandUpdate
                input={brandEdit}
                visible={visibleUpdate}
                onClose={onClose}
                onUpdate={handleUpdate}
            />
        </>
    );
};

export default BrandContent;
