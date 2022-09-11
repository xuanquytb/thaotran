import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import "../../Style/style.css";
import "../../Style/base.css";
import "../../Style/style-Content.css";
import { Layout, Menu, Input, Button } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthDashboard from "../../view/AuthDashboard";
import { OrderContext } from "../../../Store/Context/OrderContext";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
const DashBoard = () => {
    const history = useHistory();
    const { getOrder } = useContext(OrderContext);
    useEffect(() => {
        getOrder();
    }, []);

    const menuitem = [
        {
            key: 0,
            title: "Bảng điều khiển",
            link: "/dashboardAdmin",
        },
        {
            key: 1,
            title: "Quản trị viên",
            icon: "<UserOutlined />",
            link: "/admin",
        },
        {
            key: 2,
            title: "Quản lí nhân viên",
            icon: "<UserOutlined />",
            link: "/employee",
        },
        {
            key: 3,
            title: "Quản lí khách hàng",
            icon: "<UserOutlined />",
            link: "/user",
        },
        {
            key: 4,
            title: "Quản lý đơn hàng",
            icon: "<AlignCenterOutlined />",
            link: "/order",
        },
        {
            key: 6,
            title: "Quản lý sản phẩm",
            icon: "<LaptopOutlined />",
            link: "/product",
        },
        {
            key: 5,
            title: "Quản lý ngành hàng",
            icon: "<LaptopOutlined />",
            link: "/category",
        },
        {
            key: 9,
            title: "Quản lý thương hiệu",
            icon: "<MessageOutlined />",
            link: "/brand",
        },
        {
            key: 7,
            title: "Quản lý bài đăng",
            icon: "<EditOutlined />",
            link: "/news",
        },
    ];

    const handClick = (e) => {
        e.preventDefault();
        history.push("/");
    };
    const logoutHan = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token_doan");
        window.location.reload();
    };

    return (
        <div>
            <Router>
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider>
                        <img
                            src='../../../../image/header/TN__logo.png'
                            alt=''
                            style={{
                                height: "50px",
                                marginLeft: "24px",
                                overflow: "auto",
                            }}
                        />

                        <Menu
                            theme='light'
                            defaultSelectedKeys={["0"]}
                            mode='inline'
                        >
                            <div className='IconDa'>
                                <Button
                                    style={{ marginLeft: "10px" }}
                                    onClick={handClick}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        width='20'
                                        height='20'
                                    >
                                        <path fill='none' d='M0 0h24v24H0z' />
                                        <path d='M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zM7.5 13a4.5 4.5 0 1 0 9 0h-2a2.5 2.5 0 1 1-5 0h-2z' />
                                    </svg>
                                </Button>
                                <Button
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                    onClick={logoutHan}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        width='20'
                                        height='20'
                                    >
                                        <path fill='none' d='M0 0h24v24H0z' />
                                        <path d='M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm4 9V8l-5 4 5 4v-3h6v-2H9z' />
                                    </svg>
                                </Button>
                            </div>
                            {menuitem.map((item) => (
                                <Menu.Item key={item.link}>
                                    <span>{item.title}</span>
                                    <Link to={item.link} />
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Sider>
                    <Layout style={{ flexDirection: "column-reverse" }}>
                        <Header
                            style={{
                                background: "#fff",
                                padding: 0,
                                paddingLeft: 16,
                            }}
                        ></Header>
                        {/* <div className='head_search'>
                            <form>
                                <div className='head_search_cont'>
                                    <Input
                                        className='form-control'
                                        placeholder='Nội dung tìm kiếm'
                                    />
                                </div>
                            </form>
                        </div> */}
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 0,
                                background: "#fff",
                                minHeight: 280,
                            }}
                        >
                            <Route
                                path='/dashboardAdmin'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='dashboardAdmin'
                                    />
                                )}
                            />
                            <Route
                                path='/user'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='customer'
                                    />
                                )}
                            />
                            <Route
                                path='/employee'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='employee'
                                    />
                                )}
                            />
                            <Route
                                path='/admin'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='admin'
                                    />
                                )}
                            />
                            <Route
                                path='/product'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='product'
                                    />
                                )}
                            />
                            <Route
                                path='/category'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='category'
                                    />
                                )}
                            />
                            <Route
                                path='/brand'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='brand'
                                    />
                                )}
                            />
                            <Route
                                path='/order'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='order'
                                    />
                                )}
                            />
                            <Route
                                path='/news'
                                render={(props) => (
                                    <AuthDashboard
                                        {...props}
                                        authRoute='news'
                                    />
                                )}
                            />
                        </Content>
                        <Footer
                            style={{
                                textAlign: "center",
                                bottom: 4,
                                fontSize: 12,
                            }}
                        >
                            VMU ©2022 Created by XUÂN QUÝ
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        </div>
    );
};

export default DashBoard;
