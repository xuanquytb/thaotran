const dbConn = require("../Common/Common");
const Origin = function (origin) {
  this.nameOrigin = origin.nameOrigin;
  this.description = origin.description;
};

const find_by_name_row_origin = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM origin WHERE ${nameRow} = '${value}'`,
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

const find_all_Origin = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM origin `, (error, elements) => {
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
      `SELECT * FROM origin where id = '${id}'`,
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
      `DELETE FROM origin WHERE (id = '${id}');`,
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

const InsertOrigin = function (originNew) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into origin SET ?", originNew, (err, elements) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: elements.insertId, ...elements });
      }
    });
  });
};

const UpdateOrigin = function (originUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update origin SET nameOrigin = '${originUpdate.nameOrigin}' , description = '${originUpdate.description}' WHERE (id = '${id}')`,
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
  find_by_name_row_origin,
  find_all_Origin,
  find_by_Id,
  delete_By_Id,
  InsertOrigin,
  UpdateOrigin,
  Origin,
};
