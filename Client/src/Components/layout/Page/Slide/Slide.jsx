import { useContext } from "react";

import SlideSeller from "./SlideStick/SlideSeller";
import { CategoryContext } from "../../../../Store/Context/CategoryContext";
import { Link, useHistory } from "react-router-dom";

const Slide = () => {
    const {
        categoryState: { categorys },
    } = useContext(CategoryContext);
    const history = useHistory();
    return (
        <>
            <div className='slider slider__noTop'>
                <div className='slider__section2'>
                    <div className='slider__section2-item'>
                        <img
                            src='../../../image/slider__body/image-2-1.png'
                            alt=''
                        />
                    </div>
                    <div className='slider__section2-item'>
                        <img
                            src='../../../image/slider__body/slide-Top/image-1-1.png'
                            alt=''
                            onClick={(e) => history.push("/pagenew")}
                        />
                    </div>
                    <div className='slider__section2-item'>
                        <img
                            src='../../../image/slider__body/image-2-3.png'
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className='slider slider__noTop'>
                <div className='featured__container'>
                    <div className='featured__header'>Danh Mục Nổi Bật</div>
                    <div className='featured__body'>
                        {categorys !== undefined ? (
                            categorys.slice(0, 20).map((item, index) => {
                                return (
                                    <Link
                                        href='#'
                                        className='featured__body-item'
                                        key={index}
                                        to={`/categoryProduct?id=${item.id}`}
                                    >
                                        <img
                                            className='featured__img'
                                            src={`http://localhost:8080/image/${item.image}`}
                                            alt=''
                                        />
                                        <span>{item.nameCategory}</span>
                                    </Link>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className='slider slider__noTop'>
                <div className='slider__section4'>
                    <div className='slider__section4-item'>
                        <img
                            src='../../../image/slider__body/image-3-1.png'
                            alt=''
                        />
                    </div>
                    <div className='slider__section4-item'>
                        <img
                            src='../../../image/slider__body/image-3-2.png'
                            alt=''
                        />
                    </div>
                    <div className='slider__section4-item'>
                        <img
                            src='../../../image/slider__body/image-3-3.png'
                            alt=''
                        />
                    </div>
                    <div className='slider__section4-item'>
                        <img
                            src='../../../image/slider__body/image-3-4.png'
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className='slider slider__noTop slider__noBottom'>
                <SlideSeller />
            </div>
            <div className='slider'>
                <div className='slider__section8'>
                    <div className='slider__section8-head'>
                        <img
                            src='https://salt.tikicdn.com/ts/upload/c7/ee/c2/d52a63b18732d5a77a9be29e7c3623a2.png'
                            alt=''
                        />
                        <h3 className='slider__section8-heading'>
                            Xu Hướng Mua Xắm
                        </h3>
                    </div>
                    <div className='slider__section8-body'>
                        <div className='grid wide'>
                            <div className='row slider__section8-active'>
                                <div className='col l-3 c-12'>
                                    <div className='slider__section8-content'>
                                        <h3 className='slider__section8-content-heading'>
                                            Tiểu Thuyết
                                        </h3>
                                        <span className='slider__section8-content-discound'>
                                            Giảm đến 80%
                                        </span>
                                        <div className='slider__section8-content-img'>
                                            <img
                                                src='../../../image/slider__body/image-7-1.png'
                                                alt=''
                                            />
                                            <img
                                                src='../../../image/slider__body/image-7-2.png'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col l-3 c-12'>
                                    <div className='slider__section8-content'>
                                        <h3 className='slider__section8-content-heading'>
                                            Sách Tư Duy - Kỹ Năng Sống
                                        </h3>
                                        <span className='slider__section8-content-discound'>
                                            Giảm đến 75%
                                        </span>
                                        <div className='slider__section8-content-img'>
                                            <img
                                                src='../../../image/slider__body/image-7-3.png'
                                                alt=''
                                            />
                                            <img
                                                src='../../../image/slider__body/image-7-4.png'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col l-3 c-12'>
                                    <div className='slider__section8-content'>
                                        <h3 className='slider__section8-content-heading'>
                                            Truyện Ngắn - Tản Văn - Tạp Văn
                                        </h3>
                                        <span className='slider__section8-content-discound'>
                                            Giảm đến 80%
                                        </span>
                                        <div className='slider__section8-content-img'>
                                            <img
                                                src='../../../image/slider__body/image-7-5.png'
                                                alt=''
                                            />
                                            <img
                                                src='../../../image/slider__body/image-7-6.png'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col l-3 c-12'>
                                    <div className='slider__section8-content'>
                                        <h3 className='slider__section8-content-heading'>
                                            Điện Thoại Smartphone
                                        </h3>
                                        <span className='slider__section8-content-discound'>
                                            Giảm đến 39%
                                        </span>
                                        <div className='slider__section8-content-img'>
                                            <img
                                                src='../../../image/slider__body/image-7-7.png'
                                                alt=''
                                            />
                                            <img
                                                src='../../../image/slider__body/image-7-8.png'
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slide;
