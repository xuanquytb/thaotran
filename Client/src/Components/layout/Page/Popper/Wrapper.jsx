import React from "react";
import classNames from "classnames/bind";
import styles from "./Popper.module.css";
const cx = classNames.bind(styles);

const Wrapper = ({ children }) => {
    return <div className={cx("wapper")}>{children}</div>;
};

export default Wrapper;
