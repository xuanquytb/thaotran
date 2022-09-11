import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const SearchItem = ({ data, searchValue }) => {
    const handleSelect = (e) => {
        history.push({ pathname: `/searchresult?search=${searchValue}` });
    };

    return (
        <div className={cx("wapper")}>
            <Link
                className={cx("box-item")}
                to={`/searchresult?search=${data.nameProduct}`}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='20'
                    height='20'
                    className={cx("icon-search")}
                >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                        d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zm-3.847-8.699a2 2 0 1 0 2.646 2.646 4 4 0 1 1-2.646-2.646z'
                        fill='rgba(149,164,166,1)'
                    />
                </svg>

                <span className={cx("result-item")}>
                    <img
                        src={`http://localhost:8080/image/procuct/${data.image}`}
                        alt=''
                        className={cx("img-product")}
                    />
                    <h4>{data.nameProduct}</h4>
                </span>
            </Link>
        </div>
    );
};

export default SearchItem;
