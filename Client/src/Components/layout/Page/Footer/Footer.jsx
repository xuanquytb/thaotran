import React from "react";
import "../../../Style/footer.css";

function Footer() {
    return (
        <>
            <div id='footer'>
                <div className='grid wide'>
                    <div className='footer__container'>
                        <div className='row'>
                            <div className='col l-2-4 m-4 c-6 footer__items'>
                                <h4 className='footer__title'>
                                    Hỗ trợ khách hàng
                                </h4>
                                <p className='hot-line'>
                                    Hotline:
                                    <a href='tel: 1900-6035'>1900-5555</a>{" "}
                                    <br />
                                    (1000 đ/phút, 8-21h kể cả T7, CN)
                                </p>
                                <a href='#' className='footer__links'>
                                    Các câu hỏi thường gặp
                                </a>
                                <a href='#' className='footer__links'>
                                    Gửi yêu cầu hỗ trợ
                                </a>
                                <a href='#' className='footer__links'>
                                    Hướng dẫn đặt hàng
                                </a>
                                <a href='#' className='footer__links'>
                                    Phương thức vận chuyển
                                </a>
                                <a href='#' className='footer__links'>
                                    Chính sách đổi trả
                                </a>
                                <a href='#' className='footer__links'>
                                    Hướng dẫn trả góp
                                </a>
                                <a href='#' className='footer__links'>
                                    Chính sách hàng nhập khẩu
                                </a>
                                <p className='footer__links-title'>
                                    Hỗ trợ khách hàng:
                                    <a className='footer__links' href='#'>
                                        hotro@tranthao.vn
                                    </a>
                                </p>
                                <p className='footer__links-title'>
                                    Báo lỗi bảo mật:
                                    <a className='footer__links' href='#'>
                                        security@tranthao.vn
                                    </a>
                                </p>
                            </div>
                            <div className='col l-2-4 m-4 c-6 footer__items'>
                                <h4 className='footer__title'>Về Trần thảo</h4>
                                <a
                                    href='http://localhost:3000/about'
                                    className='footer__links'
                                >
                                    Giới thiệu về chúng tôi
                                </a>
                                <a href='#' className='footer__links'>
                                    Tuyển dụng
                                </a>
                                <a href='#' className='footer__links'>
                                    Chính sách bảo mật thanh toán
                                </a>
                                <a href='#' className='footer__links'>
                                    Chính sách bảo mật thông tin cá nhân
                                </a>
                                <a href='#' className='footer__links'>
                                    Chính sách giải quyết khiếu nại
                                </a>
                                <a href='#' className='footer__links'>
                                    Điều khoản sử dụng
                                </a>
                                <a href='#' className='footer__links'>
                                    Giới thiệu điểm tích lũy
                                </a>
                                <a href='#' className='footer__links'>
                                    Tiếp thị liên kết cùng Trần thảo
                                </a>
                                <a href='#' className='footer__links'>
                                    Bán hàng doanh nghiệp
                                </a>
                            </div>
                            <div className='col l-2-4 m-4 c-4 footer__items none'>
                                <h4 className='footer__title'>
                                    Hợp tác và liên kết
                                </h4>
                                <a href='' className='footer__links'>
                                    Quy chế hoạt động Sàn GDTMĐT
                                </a>

                                <h4 className='footer__title sub-title'>
                                    Chứng nhận bởi
                                </h4>
                                <div className='flex'>
                                    <a
                                        href=''
                                        className='footer__certification'
                                    >
                                        <img
                                            className='certification-img'
                                            src='../../../../assets/footer/bo-cong-thuong-2.png'
                                            alt=''
                                        />
                                    </a>
                                    <a
                                        href=''
                                        className='footer__certification'
                                    >
                                        <img
                                            className='certification-img'
                                            src='../../../../assets/footer/bo-cong-thuong.svg'
                                            alt=''
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className='col l-2-4 m-4 c-6 footer__items'>
                                <h4 className='footer__title'>
                                    Phương thức thanh toán
                                </h4>
                                <img
                                    src='../../../../assets/footer/pay.png'
                                    alt=''
                                    className='pay'
                                />
                            </div>
                            <div className='col l-2-4 m-4 c-6 footer__items download__app'>
                                <h4 className='footer__title'>
                                    Kết nối với chúng tôi
                                </h4>
                                <a href='#' className='tiki-now'>
                                    <img
                                        src='../../../../assets/footer/fb-ytb.png'
                                        alt=''
                                    />
                                </a>
                                <h4 className='footer__title sub-title'>
                                    Tải ứng dụng trên điện thoại
                                </h4>
                                <div className='download'>
                                    <img
                                        src='../../../../assets/footer/qrcode.png'
                                        alt=''
                                        className='download__qr'
                                    />
                                    <div className='download__link'>
                                        <a href='' className='apps'>
                                            <img
                                                src='../../../../assets/footer/appstore.png'
                                                alt=''
                                                className='app'
                                            />
                                        </a>
                                        <a href='' className='apps'>
                                            <img
                                                src='../../../../assets/footer/playstore.png'
                                                alt=''
                                                className='app'
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer__address'>
                        <p className='footer__links-title'>
                            Địa chỉ văn phòng: 32, LK18, KĐT Văn Khê, La Khê, Hà
                            Đông ,Hà Nội
                        </p>
                        <p className='footer__links-title'>
                            Thảo Trần nhận đặt hàng trực tuyến và giao hàng tận
                            nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn
                            phòng hoặc trung tâm xử lý đơn hàng
                        </p>
                        <p className='footer__links-title'>
                            Giấy chứng nhận Đăng ký Kinh doanh số 4900 260 875
                            do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày
                            06/01/2018
                        </p>
                        <p className='footer__links-title'>
                            © 2021 - Bản quyền của Công Ty Cổ Phần Thảo trần
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
