import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Input } from "antd";
import { useHistory } from "react-router-dom";

import { ProductContext } from "../../../../Store/Context/ProductContext";
import SearchItem from "./SearchItem/SearchItem";
import { Wrapper as PopperWrapper } from "../../Page/Popper";
import styles from "../Header/style.module.css";
const cx = classNames.bind(styles);

const Search = () => {
    const history = useHistory();
    const { getProductWithName } = useContext(ProductContext);

    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(true);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(async () => {
        const result = await getProductWithName(searchValue);
        setSearchResult(result);
    }, [searchValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleSelect = (e) => {
        history.push({ pathname: `/searchresult?search=${searchValue}` });
    };

    return (
        <div>
            <Tippy
                interactive
                render={(attrs) => (
                    <div className='search-result' tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx("search-title")}>
                                Kết quả tìm kiếm
                            </h4>
                            {searchResult.length > 0 ? (
                                searchResult.map((result) => (
                                    <SearchItem
                                        key={result.id}
                                        data={result}
                                        searchValue={searchValue}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
            >
                <div className={cx("header__search")}>
                    <div className={cx("form__search")}>
                        <Input
                            size='large'
                            type='text'
                            id='search__input'
                            className='header__search-input'
                            placeholder='Tìm sản phẩm, danh mục hay thương hiệu mong muốn ...'
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            onFocus={(e) => setShowResult(true)}
                        />
                    </div>
                    <Tippy content='Nhấn để tìm kiếm'>
                        <div className={cx("header__seacrh-block")}>
                            <i
                                className={cx(
                                    "fa-search",
                                    "header__search-icon",
                                    "fas"
                                )}
                            ></i>
                            <a
                                href=''
                                className='header__search-btn'
                                onClick={(e) => handleSelect(e)}
                            >
                                Tìm Kiếm
                            </a>
                        </div>
                    </Tippy>
                </div>
            </Tippy>
        </div>
    );
};

export default Search;
