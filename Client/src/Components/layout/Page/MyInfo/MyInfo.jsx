import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { Layout, Upload } from "antd";
const { Content } = Layout;
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthInfoCustomer from "../../../view/AuthInfoCustomer";
import Header from "../../../layout/Page/Header/Header";

import "./style.css";
import styles from "./scss/antd.module.scss";

const MyInfo = () => {
    const { authState } = useContext(AuthContext);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        setFileList([
            {
                uid: "-1",
                name: "Avata",
                status: "done",
                url: `http://localhost:8080/image/${authState.user[0].nameAvata}`,
            },
        ]);
    }, []);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <>
            <Header />
            <div className='body-myinfo'>
                <div id='my-info' className='grid wide' style={{}}>
                    <div className='info__header contain'>
                        <div className='header__left'>
                            <Upload
                                action={`http://localhost:8080/api/upload/image/user/${authState.user[0].id}`}
                                listType='picture-card'
                                fileList={fileList}
                                onChange={onChange}
                                name='photo'
                                className='avata'
                            >
                                {fileList.length < 1 && "+ Upload"}
                            </Upload>
                            <div className='left'>
                                <div className='name'>
                                    Họ và tên: {authState.user[0].fullname}
                                </div>
                                <div className='username'>
                                    Tên đăng nhập: {authState.user[0].username}
                                </div>
                            </div>
                            <div className='right'>
                                <div className='email'>
                                    Email: {authState.user[0].email}
                                </div>
                                <div className='phone'>
                                    Phone: {authState.user[0].phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Router>
                        <Layout
                            className='contain-body'
                            style={{ background: "transparent" }}
                        >
                            <ul id='nav' className='contain'>
                                <Link to={"/info"} className='nav-item'>
                                    <div className='content-info-title'>
                                        <div
                                            className='img-info-user'
                                            style={{ marginBottom: 8 }}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='28'
                                                height='28'
                                            >
                                                <path
                                                    fill='none'
                                                    d='M0 0h24v24H0z'
                                                />
                                                <path d='M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm4 13a4 4 0 1 1 8 0H8zm4-5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z' />
                                            </svg>
                                        </div>
                                        <div className='text-infoo'>
                                            Cá nhân
                                        </div>
                                    </div>
                                </Link>
                                <Link to='/info/order' className='nav-item'>
                                    <div className='content-info-title'>
                                        <div className='img-info-user'>
                                            <div className='img-info-user'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    width='28'
                                                    height='28'
                                                >
                                                    <path
                                                        fill='none'
                                                        d='M0 0h24v24H0z'
                                                    />
                                                    <path d='M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z' />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>Đổi mật khẩu</div>
                                    </div>
                                </Link>
                            </ul>
                            <Layout
                                style={{
                                    maxWidth: 1000,
                                    borderRadius: 24,
                                    marginLeft: 15,
                                    minHeight: 280,
                                    backgroundColor: "transparent",
                                }}
                            >
                                <Content
                                    style={{
                                        padding: 0,
                                        background: "#b6ccee",
                                        minHeight: 280,
                                        borderRadius: 24,
                                    }}
                                    className={styles.content_ant_custom}
                                >
                                    <Route
                                        exact
                                        path='/info'
                                        render={(props) => (
                                            <AuthInfoCustomer
                                                {...props}
                                                authRoute='info'
                                            />
                                        )}
                                    />
                                    <Route
                                        exact
                                        path='/info/order'
                                        render={(props) => (
                                            <AuthInfoCustomer
                                                {...props}
                                                authRoute='order'
                                            />
                                        )}
                                    />
                                </Content>
                            </Layout>
                        </Layout>
                    </Router>
                </div>

                <div className='shape circle'></div>
                <div className='shape square'></div>
                <div className='shape star'></div>
                <div className='shape heart'></div>
            </div>
        </>
    );
};

export default MyInfo;
