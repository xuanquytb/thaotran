import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../../../../Store/Context/NewsContext";
import ModalNews from "./modalNews";
import Header from "../../../layout/Page/Header/Header";
import Footer from "../../../layout/Page/Footer/Footer";

import "./Style/style.css";

const News = () => {
    const {
        newsState: { news },
        getNews,
    } = useContext(NewsContext);
    useEffect(() => getNews(), []);

    const [visible, setVisible] = useState(false);
    const [newsOut, setNewsOut] = useState(false);

    const showModal = (e, id) => {
        e.preventDefault();
        setNewsOut(id);
        setVisible(true);
    };

    return (
        <>
            <Header />
            <div className='body-content-new'>
                {news !== undefined ? (
                    news.map((item, index) => {
                        return (
                            <div className='news-item' key={index}>
                                <Link
                                    to={`#`}
                                    className='sub__content-type-1 post'
                                    onClick={(e) => showModal(e, item.id)}
                                >
                                    <div className='sub__content'>
                                        <div className='sub__content-heading heading'>
                                            {item.nameNews}
                                        </div>
                                        <div className='sub__content-detail'>
                                            <div className='sub__content-author'>
                                                {item.brief}
                                            </div>
                                        </div>
                                        <div className='sub__content-detail'>
                                            <div
                                                className='sub__content-author'
                                                style={{ marginBottom: 10 }}
                                            >
                                                {item.author}
                                            </div>
                                            <div
                                                className='sub__content-date'
                                                style={{
                                                    marginBottom: 35,
                                                    marginLeft: 20,
                                                }}
                                            >
                                                {item.createDate.split("T")[0]}
                                            </div>
                                        </div>
                                    </div>
                                    <img
                                        src={`http://localhost:8080/image/news/${item.nameImage}`}
                                        alt=''
                                        className='sub__content-img'
                                    />
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
                <ModalNews
                    visible={visible}
                    onClose={() => setVisible(false)}
                    news={newsOut}
                />
            </div>

            <Footer />
        </>
    );
};

export default News;
