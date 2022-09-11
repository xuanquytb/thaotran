const dbConn = require("../Common/Common");
const Unit = function (unit) {
  this.nameUnit = unit.nameUnit;
  this.description = unit.description;
};

const find_by_name_row_unit = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM unit WHERE ${nameRow} = '${value}'`,
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

const find_all_Unit = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM unit `, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const find_by_Id = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM unit where id = '${id}'`, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements[0]);
    });
  });
};

const delete_By_Id = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `DELETE FROM unit WHERE (id = '${id}');`,
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

const InsertUnit = function (unitNew) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into unit SET ?", unitNew, (err, elements) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: elements.insertId, ...elements });
      }
    });
  });
};

const UpdateUnit = function (unitUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update unit SET nameunit = '${unitUpdate.nameUnit}',description = '${unitUpdate.description}' WHERE (id = '${id}')`,
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
  find_by_name_row_unit,
  find_all_Unit,
  find_by_Id,
  delete_By_Id,
  InsertUnit,
  UpdateUnit,
  Unit,
};
