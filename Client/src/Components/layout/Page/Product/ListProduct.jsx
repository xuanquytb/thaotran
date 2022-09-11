import React, { useContext, useEffect, useState } from "react";
import ModalProduct from "./modalProduct";

import { Card } from "antd";

const ListCategory = ({ data, products }) => {
    const [visible, setVisible] = useState(false);
    const [product, setProduct] = useState();

    const showModal = (e, id) => {
        e.preventDefault();
        setProduct(id);
        setVisible(true);
    };

    console.log(data);

    return (
        <div className='row no-gutters content__active'>
            {data.length !== 0
                ? data.map((item) => {
                      return (
                          <Card
                              style={{ padding: 0 }}
                              className='col l-2 c-6 m-4'
                              type='text'
                              key={item.id}
                              onClick={(event) => showModal(event, item.id)}
                          >
                              <div className='content__body-item'>
                                  <img
                                      src={`http://localhost:8080/image/procuct/${item.image}`}
                                      alt=''
                                      className='content__body-img'
                                  />
                                  <div className='content__body-info'>
                                      <span className='info__name'>
                                          {item.nameProduct}
                                      </span>
                                      <div className='info__vote'>
                                          <div className='info__vote-icon'>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                          </div>
                                          <span className='info__vote-quantily'>
                                              {item.sold} đã bán
                                          </span>
                                      </div>
                                      <div className='slider__content-price'>
                                          <span className='item__price'>
                                              {item !== undefined
                                                  ? `${(
                                                        item.price -
                                                        (item.price *
                                                            item.promotional) /
                                                            100
                                                    ).toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}`
                                                  : ""}
                                          </span>
                                          <span className='item__discount'>
                                              -{item.promotional}%
                                          </span>
                                      </div>
                                      <img
                                          src='https://salt.tikicdn.com/ts/upload/51/ac/cc/528e80fe3f464f910174e2fdf8887b6f.png'
                                          alt=''
                                          width='124px'
                                          height='18px'
                                      />
                                  </div>
                              </div>
                          </Card>
                      );
                  })
                : products.slice(0, 20).map((item) => {
                      return (
                          <Card
                              style={{ padding: 0 }}
                              className='col l-2 c-6 m-4'
                              type='text'
                              key={item.id}
                              onClick={(event) => showModal(event, item.id)}
                          >
                              <div className='content__body-item'>
                                  <img
                                      src={`http://localhost:8080/image/procuct/${item.image}`}
                                      alt=''
                                      className='content__body-img'
                                  />
                                  <div className='content__body-info'>
                                      <span className='info__name'>
                                          {item.nameProduct}
                                      </span>
                                      <div className='info__vote'>
                                          <div className='info__vote-icon'>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                              <i className='fas fa-star'></i>
                                          </div>
                                          <span className='info__vote-quantily'>
                                              {item.sold} đã bán
                                          </span>
                                      </div>
                                      <div className='slider__content-price'>
                                          <span className='item__price'>
                                              {item !== undefined
                                                  ? `${(
                                                        item.price -
                                                        (item.price *
                                                            item.promotional) /
                                                            100
                                                    ).toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}`
                                                  : ""}
                                          </span>
                                          <span className='item__discount'>
                                              -{item.promotional}%
                                          </span>
                                      </div>
                                      <img
                                          src='https://salt.tikicdn.com/ts/upload/51/ac/cc/528e80fe3f464f910174e2fdf8887b6f.png'
                                          alt=''
                                          width='124px'
                                          height='18px'
                                      />
                                  </div>
                              </div>
                          </Card>
                      );
                  })}

            <ModalProduct
                visible={visible}
                onClose={() => setVisible(false)}
                product={product}
            />
        </div>
    );
};

export default ListCategory;
