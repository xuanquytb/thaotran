import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { Table, Button, Popconfirm, Input, Space, notification } from "antd";
import ShowDrawer from "./Ant/DrawerProductShow";
import DrawerUpdate from "./Ant/DrawerUpdate";
import { OrderContext } from "../../../../Store/Context/OrderContext";
import * as XLSX from "xlsx/xlsx.mjs";

import { SearchOutlined, SmileOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import styleTables from "./scss/styleTables.module.scss";

import "./css/OrderStyle.css";

const OrderContent = () => {
    const {
        orderState: { orders },
        getOrder,
        updateOrder,
    } = useContext(OrderContext);

    useEffect(() => {
        getOrder();
    }, []);
    const [visibleShow, setVisibleShow] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [order, setOrder] = useState({});
    const [orderEdit, setOrderEdit] = useState({});

    //////////////////////////
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const exportToExcel = () => {
        console.log(searchedColumn);
        if (searchText !== "") {
            const data = dataSource.filter(function (item, index) {
                return item[searchedColumn] === searchText;
            });

            const dataExport = data.map((item) => {
                return {
                    ["Mã đơn hàng"]: item.id,
                    ["Họ và tên"]: item.fullname,
                    ["Email"]: item.email,
                    ["SĐT"]: item.phone,
                    ["Tình trạng"]: item.state,
                    ["Tổng tiền"]: item.sumPayment,
                    ["Địa chỉ"]: item.address,
                    ["Ngày đặt hàng"]: item.createAt.split("T")[0],
                };
            });

            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(dataExport);
            XLSX.utils.book_append_sheet(wb, ws), "Thống kê đơn hàng";
            XLSX.writeFile(wb, "Đơn hàng.xlsx");
        } else {
            const dataAll = dataSource.map((item) => {
                return {
                    ["Mã đơn hàng"]: item.id,
                    ["Họ và tên"]: item.fullname,
                    ["Email"]: item.email,
                    ["SĐT"]: item.phone,
                    ["Tình trạng"]: item.state,
                    ["Tổng tiền"]: item.sumPayment,
                    ["Địa chỉ"]: item.address,
                    ["Ngày đặt hàng"]: item.createAt.split("T")[0],
                };
            });
            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(dataAll);
            XLSX.utils.book_append_sheet(wb, ws), "Thống kê đơn hàng";
            XLSX.writeFile(wb, "Đơn hàng.xlsx");
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                className='inputSearchAdmin'
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    /////////////////////////////////////////////////
    const onClose = () => {
        setVisibleShow(false);
        setVisibleUpdate(false);
        setVisibleCreate(false);
    };

    const handleShow = async (record) => {
        setOrder({
            address: record.address,
            email: record.email,
            fullname: record.fullname,
            id: record.id,
            idCustomer: record.idCustomer,
            idPayment: record.idPayment,
            phone: record.phone,
            state: record.state,
            sumPayment: record.sumPayment,
        });
        setVisibleShow(true);
    };

    const handleUpdate = async (record) => {
        setOrderEdit(record);
        setVisibleUpdate(true);
    };

    const clickUpdate = async (record) => {
        const result = await updateOrder(record);
        if (result.success) {
            getOrder();
            notification.open({
                className: "custom-class",
                description: "Cập nhật thành công",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
        } else {
            notification.open({
                description: result.message,
                message: "Cập nhật thất bại",
                className: "custom-class",
                style: {
                    width: 350,
                    backgroundColor: "#fff2f0",
                },
                type: "error",
            });
        }
    };

    const dataSource = orders.map((order) => {
        return {
            id: order.id,
            idCustomer: order.idCustomer,
            idPayment: order.idPayment,
            fullname: order.fullname,
            email: order.email,
            address: order.address,
            phone: order.phone,
            state: order.state,
            sumPayment: order.sumPayment,
            createAt: new Date(order.createAt).toLocaleDateString("vn-VN"),
            key: order.id,
        };
    });

    const columns = [
        {
            title: "Người đặt hàng",
            width: 60,
            dataIndex: "fullname",
            key: "fullname",
            fixed: "left",
            ...getColumnSearchProps("fullname"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 75,
            ...getColumnSearchProps("email"),
        },
        {
            title: "Giá trị đơn hàng",
            dataIndex: "sumPayment",
            key: "sumPayment",
            width: 40,
        },
        {
            title: "Trạng thái",
            dataIndex: "state",
            key: "state",
            width: 60,
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "createAt",
            key: "createAt",
            width: 40,
            ...getColumnSearchProps("createAt"),
        },
        {
            title: "ACTION",
            width: "8.5%",
            key: "4",
            dataIndex: "operation",
            render: (_, record) =>
                orders.length >= 0 ? (
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
                            title='Bạn chắc chắn muốn sửa người dùng ?'
                            onConfirm={() => handleUpdate(record)}
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
    const handleShowCreate = async () => {
        setVisibleCreate(true);
    };

    return (
        <>
            <div className='content-order'>
                <Button
                    style={{ marginLeft: 15, position: "absolute", top: 10 }}
                    onClick={exportToExcel}
                >
                    Xuất báo cáo
                </Button>

                <Table
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ y: 445 }}
                    className={styleTables.custom_information_table}
                />
            </div>
            <DrawerUpdate
                input={orderEdit}
                visible={visibleUpdate}
                onClose={onClose}
                handleUpdate={clickUpdate}
            />
            <ShowDrawer input={order} visible={visibleShow} onClose={onClose} />
        </>
    );
};

export default OrderContent;
