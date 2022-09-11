import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { Button, InputNumber, Space } from "antd";
import axios from "axios";

import "./Header.css";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { CardContext } from "../../../../Store/Context/CardContext";
import { ProductContext } from "../../../../Store/Context/ProductContext";

import Search from "../Search/index";

const Header = () => {
    ///////////////////////////////////////////////////////////
    const { authState, logout } = useContext(AuthContext);
    const [card, setCard] = useState([]);
    const [quantityNum, setQuantityNum] = useState();
    //////////////////////////////////////////////////////////
    const {
        cardState: { cards },
        getCard,
    } = useContext(CardContext);

    useEffect(async () => {
        await getCard();
    }, []);

    useEffect(async () => {
        setCard(cards);
    }, [cards]);
    //////////////////////////////////////////////////////////

    const history = useHistory();
    const logoutHan = async (e) => {
        e.preventDefault();

        try {
            const logoutData = await logout(authState.isAuthenticated);
            if (logoutData === true) {
                history.push("/login");
                window.location.reload();
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handClickCheckOut = (e) => {
        history.push("/checkout");
    };
    const handClickReturnHome = async (e) => {
        await getProduct();
        history.push("/");
    };
    const handNum = async (e, item) => {
        setQuantityNum(e);
        const data = {
            id: item.id,
            dongia: e * item.dongia,
            quantity: e,
        };
        const result = await axios.put(
            `http://localhost:8080/api/card/updateCardDetail`,
            data
        );
        getCard();
    };
    const handDelete = async (id) => {
        const result = await axios.delete(
            `http://localhost:8080/api/card/cardDetail/${id}`
        );
        getCard();
    };

    const { getProduct } = useContext(ProductContext);

    return (
        <>
            <header className='header'>
                <div className='header__head'>
                    <div className='header__mobile-logo'>
                        <div>
                            <img
                                src='../../../../image/header/tiki__freeship.png'
                                alt=''
                                className='mobile__logo-fs'
                            />
                        </div>
                        <div>
                            {" "}
                            <img
                                src='../../../../image/header/TN__logo.png'
                                alt=''
                                className='mobile__logo-tiki'
                            />{" "}
                        </div>
                        <div className='header__icon'>
                            <i className='far fa-bell header__icon-bell'></i>
                            <i className='fas fa-shopping-cart header__icon-cart'></i>
                        </div>
                    </div>
                    <div className='header__logo'>
                        <img
                            src='../../../../image/header/TN__logo.png'
                            alt=''
                            width='60'
                            height='40'
                            onClick={handClickReturnHome}
                        />
                    </div>
                    <Search /> {/* khung tìm kiếm */}
                    <div className='header__user'>
                        <div className='header__user-info'>
                            <div className='header__category'>
                                <div className='header__category-icon'>
                                    <img
                                        src='../../../../image/header/category.png'
                                        alt=''
                                    />
                                    <div className='category__quantily'>
                                        <span>{card.length}</span>
                                    </div>
                                </div>
                                <div className='header__category-info'></div>
                                <div className='header__category-detail-show'>
                                    <div className='Header-cart-show'>
                                        Sản phẩm mới thêm
                                    </div>
                                    <div className='Body-cart-show'>
                                        {card.length > 0 ? (
                                            <ul className='header__cart-list-item'>
                                                {card.map((item, index) => {
                                                    return (
                                                        <li
                                                            className='header__cart-item'
                                                            key={index}
                                                        >
                                                            <img
                                                                src={`http://localhost:8080/image/procuct/${item.image}`}
                                                                alt=''
                                                                className='header__cart-img'
                                                            />
                                                            <div className='header__cart-item-info'>
                                                                <div className='header__cart-item-head'>
                                                                    <h5 className='header__cart-item-name'>
                                                                        {
                                                                            item.nameProduct
                                                                        }
                                                                    </h5>
                                                                    <div className='header__cart-item-price-wrap'>
                                                                        x{" "}
                                                                        <Space />
                                                                        <InputNumber
                                                                            min={
                                                                                1
                                                                            }
                                                                            max={
                                                                                10
                                                                            }
                                                                            defaultValue={
                                                                                item.quantity
                                                                            }
                                                                            style={{
                                                                                width: 50,
                                                                                border: "none",
                                                                            }}
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handNum(
                                                                                    event,
                                                                                    item
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className='header__cart-item-remove'
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            handDelete(
                                                                                item.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            xmlns='http://www.w3.org/2000/svg'
                                                                            viewBox='0 0 24 24'
                                                                            width='20'
                                                                            height='20'
                                                                            style={{
                                                                                marginLeft: 10,
                                                                            }}
                                                                        >
                                                                            <path
                                                                                fill='none'
                                                                                d='M0 0h24v24H0z'
                                                                            />
                                                                            <path
                                                                                d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z'
                                                                                fill='rgba(149,164,166,1)'
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                                <div className='header__cart-item-body'>
                                                                    <span className='header__cart-item-description'>
                                                                        Đơn giá:{" "}
                                                                        {item.quantity *
                                                                            item.dongia}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            <span>
                                                <img
                                                    className='image-cart-empty'
                                                    style={{ height: "210px" }}
                                                    src='../../../../image/header/cart_4.png'
                                                    alt=''
                                                />
                                                <div
                                                    style={{
                                                        margin: "0px 123px",
                                                        color: "#108ee9",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Giỏ hàng còn trống
                                                </div>
                                            </span>
                                        )}
                                    </div>
                                    <div className='Footer-cart-show'>
                                        <div className='btn-checkOut'>
                                            <Button
                                                onClick={handClickCheckOut}
                                                disabled={
                                                    cards.length > 0
                                                        ? false
                                                        : true
                                                }
                                                style={{
                                                    bottom: 15,
                                                    borderRadius: 24,
                                                }}
                                            >
                                                Xem giỏ hàng
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='infor-user'>
                                <div className='header__user-login'>
                                    {/* --------------------------------------------- */}
                                    {authState.isAuthenticated === true ? (
                                        <span className='user__account'>
                                            <span className='user__name'>
                                                {authState.user[0].fullname}
                                            </span>
                                            <i className='fas fa-sort-down user__account-icon'></i>
                                        </span>
                                    ) : (
                                        <span className='user__login'>
                                            <Link
                                                to='/login'
                                                style={{ color: "#fff" }}
                                            >
                                                Đăng nhập / Đăng ký
                                            </Link>
                                        </span>
                                    )}
                                </div>
                                <span className='header__user-img'>
                                    <img
                                        src='../../../../image/header/user__logo.png'
                                        alt=''
                                    />
                                </span>
                                <div className='Header__mode-list'>
                                    <ul>
                                        <li className='Header__mode-item-link'>
                                            <Button
                                                type='text'
                                                block
                                                onClick={() =>
                                                    history.push("/myorder")
                                                }
                                            >
                                                Đơn hàng của tôi
                                            </Button>
                                        </li>
                                        <li className='Header__mode-item-link'>
                                            <Button
                                                type='text'
                                                block
                                                onClick={() =>
                                                    history.push("/info")
                                                }
                                            >
                                                Tài khoản của tôi
                                            </Button>
                                        </li>
                                        <li className='Header__mode-item-link'>
                                            <Button
                                                type='text'
                                                block
                                                onClick={logoutHan}
                                            >
                                                Đăng xuất
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='header__mobile-search'>
                    <input
                        type='text'
                        className='header__mobile-input'
                        placeholder='Bạn tìm gì hôm nay?'
                    />
                    <i className='fas fa-search search__logo-mobile'></i>
                </div> */}
                <div className='header__tail'>
                    <div className='header__logo-fs'>
                        <img
                            src='../../../../image/header/tiki__freeship.png'
                            alt=''
                            width='83px'
                            height='12px'
                        />
                    </div>
                    <div className='header__keyword'>
                        <a href='#' className='header__keyword-link'>
                            tất cả đồ điện tử
                        </a>
                        <a href='#' className='header__keyword-link'>
                            gia dụng nhà bếp
                        </a>
                        <a href='#' className='header__keyword-link'>
                            máy say sinh tố
                        </a>
                        <a href='#' className='header__keyword-link'>
                            bếp điện
                        </a>
                        <a href='#' className='header__keyword-link'>
                            ấm điện
                        </a>
                        <a href='#' className='header__keyword-link'>
                            đèn học
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
