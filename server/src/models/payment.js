const dbConn = require("../Common/Common");
const dbCon = require("../Common/Common");

const PaymentModel = function (payment) {
  (this.tenphuongthuc = payment.tenphuongthuc),
    (this.description = payment.description),
    (this.nameImage = payment.nameImage);
};

const find_all_payment = () => {
  return new Promise(function (resolve, reject) {
    dbConn.query(`select * from payment`, function (err, elementor) {
      if (err) {
        return reject(err);
      }
      return resolve(elementor);
    });
  });
};

module.exports = { find_all_payment };
