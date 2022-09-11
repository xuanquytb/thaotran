const dbConn = require("../Common/Common");

const ImageProduct = function (imageProduct) {
  this.idProduct = imageProduct.idProduct;
  this.nameImageProduct = imageProduct.nameImageProduct;
};

const find_by_name_row_imageProduct = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM imageProduct WHERE ${nameRow} = '${value}'`,
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

const find_all_ImageProduct = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM imageProduct `, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};
const find_all_Image = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT nameImage FROM imagetable `, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const find_by_Id = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM imageProduct where id = '${id}'`,
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
      `DELETE FROM imageProduct WHERE (id = '${id}');`,
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

const InsertImageProduct = function (imageProductNew) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "Insert Into imageProduct SET ?",
      imageProductNew,
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

const UpdateImageProduct = function (imageProductUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update imageProduct SET idProduct = '${imageProductUpdate.idProduct}', nameImageProduct = '${imageProductUpdate.image}' WHERE (id = '${id}')`,
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
  find_by_name_row_imageProduct,
  find_all_ImageProduct,
  find_by_Id,
  delete_By_Id,
  InsertImageProduct,
  UpdateImageProduct,
  find_all_Image,
  ImageProduct,
};
