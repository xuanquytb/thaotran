import React, { useState, useEffect } from "react";
import { Modal, Button, InputNumber, Descriptions } from "antd";
import { Layout } from "antd";
import { Image } from "antd";
import HTMLReactParser from "html-react-parser";
import axios from "axios";

const ModalNews = ({ visible, onClose, news }) => {
    const [inputNews, setInputNew] = useState([]);

    useEffect(async () => {
        const result = await axios.get(
            `http://localhost:8080/api/news/getNews/${news}`
        );
        setInputNew(result.data.news);
    }, [news]);
    return (
        <>
            <Modal
                centered
                visible={visible}
                onCancel={onClose}
                width={1300}
                footer={[]}
            >
                <div className='detailProduct'>
                    <div className='itemRight'>
                        <div>
                            <h2 className='nameNews'>
                                {inputNews.length > 0
                                    ? inputNews[0].nameNews
                                    : ""}
                            </h2>
                        </div>
                    </div>
                </div>
                <strip></strip>
                <div className='detail-more-Product'>
                    <div>
                        <h2 className='title-detail'>Chi tiết tin</h2>
                        {inputNews.length > 0
                            ? HTMLReactParser(`${inputNews[0].content}`)
                            : ""}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalNews;
