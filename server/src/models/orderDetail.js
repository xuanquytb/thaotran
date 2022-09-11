const dbConn = require("../Common/Common");

const orderDetail = function (order) {
    this.idCustomer = order.idCustomer;
    this.idEmployee = order.idEmployee;
    this.sumPayment = order.sumPayment;
    this.state = order.state;
    this.idPayment = order.idPayment;
};

const find_by_idCard_By_idPayorder = function (idPayorder) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT idCard FROM webthaotran.carddetail where idPayOrder = ${idPayorder};`,
            (err, elements) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(elements[0]);
                }
            }
        );
    });
};

const find_all_OrderDetail = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * from view_orderdetailjoinuser order by id desc`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};
const find_max_id = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT max(id) as max FROM orderdetail;`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};
const find_sum_monney = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `select sum(sumPayment) as summoney from orderdetail`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};
const find_sum_monney_by_day = (day) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `select sum(sumPayment) as summoney from orderdetail where createAt = '${day}'`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};
const find_sum_countUser = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT count(*) as countUser FROM webthaotran.user where idRole = 2`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0]);
            }
        );
    });
};
const find_all_OrderDetail_by_idCustomer = (id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`call listProdect_Order(${id})`, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};
const find_all_count_Order_Cus = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT fullname, count(*) as 'DonHang' FROM webthaotran.orderdetail join user on orderdetail.idCustomer = user.id group by idCustomer order by count(*)  desc;`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            }
        );
    });
};

const InsertOrderDetail = function (orderDetailNew) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            "Insert Into orderDetail SET ?",
            orderDetailNew,
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

const UpdateOrderDetail_State = function (state, id) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `Update orderDetail SET state = '${state}' WHERE (id = '${id}')`,
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
    find_all_OrderDetail,
    find_all_OrderDetail_by_idCustomer,
    InsertOrderDetail,
    UpdateOrderDetail_State,
    find_max_id,
    find_sum_monney,
    find_sum_monney_by_day,
    find_sum_countUser,
    find_by_idCard_By_idPayorder,
    find_all_count_Order_Cus,
    orderDetail,
};
