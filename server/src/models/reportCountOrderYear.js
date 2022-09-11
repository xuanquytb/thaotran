const dbConn = require("../Common/Common");

const find_count_order_month = (months) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT count(*) as 'countOr1' FROM webthaotran.orderdetail where month(createAt) = ${months} and year(createAt) = year(curdate());`,
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements[0].countOr1);
            }
        );
    });
};
module.exports = {
    find_count_order_month,
};
