const dbConn = require("../Common/Common");
const Product = function (product) {
    this.nameProduct = product.nameProduct;
    this.description = product.description;
    this.warranty = product.warranty;
    this.quantityIn = product.quantityIn;
    this.quantity = product.quantity;
    this.price = product.price;
    this.priceIn = product.priceIn;
    this.promotional = product.promotional;
    this.status = product.status;
    this.image = product.image;
    this.idInvoiceIn = product.idInvoiceIn;
    this.idCategory = product.idCategory;
    this.idUnit = product.idUnit;
    this.idManufacturer = product.idManufacturer;
    this.idOrigin = product.idOrigin;
};

const find_by_name_row_product = function (nameRow, value) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM product WHERE ${nameRow} = '${value}'`,
            (err, elements) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(elements);
                }
            }
        );
    });
};

const find_all_Product_with_idCategory = (idCategory) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM webthaotran.product where idCategory = ${idCategory}`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};

const find_all_Product_with_name = (valueSearch) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `select * from product where nameProduct LIKE '%${valueSearch}%'`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};
const find_all_Product_sold = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM webthaotran.product order by sold desc limit 0,50`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};

const find_all_Product = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM product order by id desc`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};

const find_by_Id = (id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM product where id = '${id}'`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};
const find_by_IdInvoiceIn = (idInvoiceIn) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM webthaotran.product where idInvoiceIn = ${idInvoiceIn}`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};

const find_view_by_Id = (id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM productview where id = '${id}'`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};

const delete_By_Id = (id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `DELETE FROM product WHERE (id = '${id}');`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(elements.affectedRows);
                }
            }
        );
    });
};

const InsertProduct = function (productNew) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            "Insert Into product SET ?",
            productNew,
            (err, elements) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ id: elements.insertId, ...elements });
                }
            }
        );
    });
};

const UpdateProduct = function (productUpdate) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `call updateProduct(
                 ${productUpdate.id},
                '${productUpdate.nameProduct}',
                '${productUpdate.description}',
                "${productUpdate.warranty}",
                "${productUpdate.quantity}",
                ${productUpdate.promotional},
                ${productUpdate.price},
                "${productUpdate.status}",
                "${productUpdate.nameCategory}",
                "${productUpdate.nameBrand}",
                "${productUpdate.nameOrigin}");`,
            (err, element) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ id: element.affectedRows, ...element });
                }
            }
        );
    });
};
const UpdateQuantityProduct = function (idProduct, quantityBuy) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `UPDATE product SET quantity = product.quantity - ${quantityBuy}  WHERE (id = '${idProduct}');`,
            (err, element) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ id: element.affectedRows, ...element });
                }
            }
        );
    });
};
const UpdateSoldProduct = function (idProduct, quantityBuy) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `UPDATE product SET sold = product.sold + ${quantityBuy}  WHERE (id = '${idProduct}');`,
            (err, element) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({ id: element.affectedRows, ...element });
                }
            }
        );
    });
};

module.exports = {
    find_by_name_row_product,
    find_all_Product,
    find_by_Id,
    find_all_Product_sold,
    delete_By_Id,
    InsertProduct,
    UpdateProduct,
    find_view_by_Id,
    find_all_Product_with_idCategory,
    find_all_Product_with_name,
    UpdateQuantityProduct,
    UpdateSoldProduct,
    find_by_IdInvoiceIn,
    Product,
};
