import React from "react";

import classNames from "classnames/bind";

import styles from "./css/style.css";
const cx = classNames.bind(styles);

const About = () => {
    return (
        <div>
            <section className={cx("big-image")}>
                <div
                    className={cx("big-image-content")}
                    data-aos='fade-up'
                    data-aos-duration='1500'
                >
                    <h2>Công ty Đồ Gia Dụng Trần Thảo "Houseware"</h2>
                    <p>Nâng giá trị cuộc sống </p>
                    <button className={cx("big-image-content-btn btn")}>
                        <a
                            style={{ fontSize: 24, color: "antiquewhite" }}
                            href='http://localhost:3000/'
                        >
                            Trở về trang chủ
                        </a>
                    </button>
                </div>
            </section>
            <section className={cx("about section-pading")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("section-title")}>
                            <h2 data-title='Câu chuyện'>Về chúng tôi</h2>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div
                            className={cx("about-item")}
                            data-aos='fade-up-right'
                            data-aos-duration='1200'
                        >
                            <h2>
                                CHÀO MỪNG CÁC BẠN ĐẾN VỚI "HOUSEWARE TRẦN THẢO"
                            </h2>
                            <p>
                                Đồ gia dụng thông minh là đồ gia dụng có những
                                tính năng thông minh, với những giải pháp công
                                năng tiện ích, thao tác đơn giản, tiện lợi, dễ
                                sử dụng, giúp tiết kiệm thời gian, công sức đáp
                                ứng nhu cầu sử dụng thường xuyên trong đời sống
                                sinh hoạt hằng ngày của một gia đình, hộ gia
                                đình.
                            </p>
                        </div>
                        <div
                            className={cx("about-item")}
                            data-aos='fade-up-left'
                            data-aos-duration='1200'
                        >
                            <div className={cx("about-item-img")}>
                                <span>Hơn 5 năm đồng hành cùng bạn</span>
                                <img
                                    src='../../../../../imageAbout/DGD8.jpg'
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("menu section-pading")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("section-title")}>
                            <h2 data-title='Đặt ngay'>Mặt hàng kinh doanh</h2>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div
                            className={cx("menu-title")}
                            data-aos='fade-down'
                            data-aos-duration='1200'
                        >
                            <button
                                className={cx("menu-button")}
                                data-title='#Nhatam'
                            >
                                Nhà tắm
                            </button>
                            <button
                                className={cx("menu-button")}
                                data-title='#Nhabep'
                            >
                                Nhà bếp
                            </button>
                            <button
                                className={cx("menu-button")}
                                data-title='#Phongkhach'
                            >
                                Phòng khách
                            </button>
                            <button className={cx("menu-button")}>
                                Phòng ngủ
                            </button>
                        </div>
                    </div>

                    <div className={cx("row", "justify-content")}>
                        <div
                            className={cx("menu-item-content", "active")}
                            id='Nhatam'
                            data-aos='zoom-in-down'
                            data-aos-duration='1200'
                        >
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD3.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT1</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD4.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT2</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD5.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT3</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD7.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT4</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD9.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT5</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD10.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NT6</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx("menu-item-content")} id='Nhabep'>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD3.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB1</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD4.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB2</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD5.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB3</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD7.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB4</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD9.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB5</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD10.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì NB6</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={cx("menu-item-content")}
                            id='Phongkhach'
                        >
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD3.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK1</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD4.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK2</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD5.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK3</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD7.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK4</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD9.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK5</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD10.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PK6</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx("menu-item-content")} id='Phongngu'>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD3.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN1</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD4.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN2</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD5.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN3</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD7.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN4</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD9.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN5</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                            <div className={cx("food-items")}>
                                <div className={cx("food-item")}>
                                    <img
                                        src='../../../../../imageAbout/DGD10.jpg'
                                        alt=''
                                    />
                                    <p>Máy nướng bánh mì PN6</p>
                                </div>
                                <div className={cx("food-price")}>
                                    <p>1.577.000 VND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx("phan-hoi section-pading")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("section-title")}>
                            <h2 data-title='Ý kiến'>Phản hồi</h2>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("phan-hoi-items")}>
                            <div
                                className={cx("phan-hoi-item")}
                                data-aos='fade-right'
                                data-aos-duration='1200'
                            >
                                <div className={cx("phan-hoi-item-content")}>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-text"
                                        )}
                                    >
                                        <h2>Nguyễn Trần Trúc Quyên</h2>
                                        <span>Khách VIP</span>
                                    </div>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-img"
                                        )}
                                    >
                                        <img
                                            src='../../../../../imageAbout/Ảnh nền 6.jpg'
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <p>
                                    Đánh giá là nói về sự nhận xét và bình luận
                                    một thứ gì đó cho biết nó là thứ tốt hay là
                                    xấu tuỳ thuộc vào nội dung bài
                                </p>
                                <div className={cx("phan-hoi-item-star")}>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                </div>
                            </div>
                            <div
                                className={cx("phan-hoi-item")}
                                data-aos='fade-down'
                                data-aos-duration='1200'
                            >
                                <div className={cx("phan-hoi-item-content")}>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-text"
                                        )}
                                    >
                                        <h2>Nguyễn Trần Trúc Quyên</h2>
                                        <span>Khách VIP</span>
                                    </div>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-img"
                                        )}
                                    >
                                        <img
                                            src='../../../../../imageAbout/Ảnh nền 5.jpg'
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <p>
                                    Đánh giá là nói về sự nhận xét và bình luận
                                    một thứ gì đó cho biết nó là thứ tốt hay là
                                    xấu tuỳ thuộc vào nội dung bài
                                </p>
                                <div className={cx("phan-hoi-item-star")}>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                </div>
                            </div>
                            <div
                                className={cx("phan-hoi-item")}
                                data-aos='fade-left'
                                data-aos-duration='1200'
                            >
                                <div className={cx("phan-hoi-item-content")}>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-text"
                                        )}
                                    >
                                        <h2>Nguyễn Trần Trúc Quyên</h2>
                                        <span>Khách VIP</span>
                                    </div>
                                    <div
                                        className={cx(
                                            "phan-hoi-item-img-content-img"
                                        )}
                                    >
                                        <img
                                            src='../../../../../imageAbout/NV1.jpg'
                                            alt=''
                                        />
                                    </div>
                                </div>
                                <p>
                                    Đánh giá là nói về sự nhận xét và bình luận
                                    một thứ gì đó cho biết nó là thứ tốt hay là
                                    xấu tuỳ thuộc vào nội dung bài
                                </p>
                                <div className={cx("phan-hoi-item-star")}>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                    <i className={cx("fas fa-star")}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx("team section-pading")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("section-title")}>
                            <h2 data-title='Đội Ngũ'>Phát Triển</h2>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div
                            className={cx("team-items")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <img
                                src='../../../../../imageAbout/NV4.jpg'
                                alt=''
                            />
                            <div className={cx("team-items-text")}>
                                <h2>Đoàn Văn Tuấn</h2>
                                <span>Nhân viên bán hàng</span>
                            </div>
                        </div>
                        <div
                            className={cx("team-items")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <img
                                src='../../../../../imageAbout/NV5.jpg'
                                alt=''
                            />
                            <div className={cx("team-items-text")}>
                                <h2>Nguyễn Hải Đăng</h2>
                                <span>Nhân viên 1</span>
                            </div>
                        </div>
                        <div
                            className={cx("team-items")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <img
                                src='../../../../../imageAbout/NV6.jpg'
                                alt=''
                            />
                            <div className={cx("team-items-text")}>
                                <h2>Nguyễn Hải Đăng</h2>
                                <span>Nhân viên 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("footer")}>
                <div className={cx("footer-bg")}></div>
                <div className={cx("container")}>
                    <div className={cx("row justify-content")}>
                        <div
                            className={cx("footer-item")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <h2>Địa chỉ</h2>
                            <p>
                                32 LK 18
                                <br />
                                KĐT Văn Khê , La Khê ,Hà Đông , Hà Nội.
                            </p>
                        </div>
                        <div
                            className={cx("footer-item")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <h2>Giờ mở cửa</h2>
                            <p>
                                8:00 - 22:00
                                <br />
                                All Day
                            </p>
                        </div>
                        <div
                            className={cx("footer-item")}
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                        >
                            <h2>Liên hệ</h2>
                            <p>
                                Phone: 0868603825
                                <br />
                                Email: tranthao@gmail.com
                            </p>
                            <div className={cx("footer-social")}>
                                <i className={cx("fab fa-facebook")}></i>
                                <i className={cx("fab fa-instagram")}></i>
                                <i className={cx("fab fa-twitter")}></i>
                                <i className={cx("fab fa-youtube")}></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("container")}>
                    <div className={cx("footer-copyright")}>
                        @2022. Toàn bộ bản quyền thuộc TDMT
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
