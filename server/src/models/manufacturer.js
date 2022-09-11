const dbConn = require("../Common/Common");
const Manufacturer = function (manufacturer) {
  this.nameManufacturer = manufacturer.nameManufacturer;
  this.phone = manufacturer.phone;
  this.address = manufacturer.address;
  this.mail = manufacturer.mail;
  this.nameImage = manufacturer.nameImage;
};

const find_by_name_row_manufacturer = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM manufacturer WHERE ${nameRow} = '${value}'`,
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

const find_all_Manufacturer = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM manufacturer `, (error, elements) => {
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
      `SELECT * FROM manufacturer where id = '${id}'`,
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
      `DELETE FROM manufacturer WHERE (id = '${id}');`,
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

const InsertManufacturer = function (manufacturerNew) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "Insert Into manufacturer SET ?",
      manufacturerNew,
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

const UpdateManufacturer = function (manufacturerUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update manufacturer SET nameManufacturer = '${manufacturerUpdate.nameManufacturer}', phone = '${manufacturerUpdate.phone}', address = '${manufacturerUpdate.address}' , mail = '${manufacturerUpdate.mail}' WHERE (id = '${id}')`,
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
const UpdateImageManufacturer = function (nameImage, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update manufacturer SET nameImage = '${nameImage}' WHERE (id = '${id}')`,
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
  find_by_name_row_manufacturer,
  find_all_Manufacturer,
  find_by_Id,
  delete_By_Id,
  InsertManufacturer,
  UpdateManufacturer,
  UpdateImageManufacturer,
  Manufacturer,
};
