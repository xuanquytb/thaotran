const dbConn = require("../Common/Common");
const Users = function (user) {
  this.username = user.username;
  this.passwordEn = user.password;
  this.fullname = user.fullname;
  this.email = user.email;
  this.phone = user.phone;
  this.address = user.address;
  this.idRole = user.idRole;
  this.sex = user.sex;
  this.dateOfBirth = user.dateOfBirth;
  this.nameAvata = user.nameAvata;
};

const find_by_name_row = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM user WHERE ${nameRow} = '${value}'`,
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

const find_all_Customer = () => {
  return new Promise((resolve, reject) => {
    dbConn.query("SELECT * FROM user where idRole = 2", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const find_all_Employee = () => {
  return new Promise((resolve, reject) => {
    dbConn.query("SELECT * FROM user where idRole = 3", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};
const find_all_Administrators = () => {
  return new Promise((resolve, reject) => {
    dbConn.query("SELECT * FROM user where idRole = 1", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const find_by_Id = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM user where id = '${id}'`, (error, elements) => {
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
      `DELETE FROM user WHERE (id = '${id}');`,
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

const find_by_username = function (username) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM user where username = '${username}'`,
      (err, elements) => {
        if (err) {
          return reject(err);
        } else {
          resolve(elements[0]);
        }
      }
    );
  });
};

const InsertUser = function (userNew) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into user SET ?", userNew, (err, element) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: element.insertId, ...element });
      }
    });
  });
};

const UpdateUser = function (userUpdate, userId) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update user SET fullname = '${userUpdate.fullname}', email = '${userUpdate.email}', phone = '${userUpdate.phone}', address = '${userUpdate.address}',sex= '${userUpdate.sex}',dateOfBirth= '${userUpdate.dateOfBirth}' WHERE (id = '${userId}')`,
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
const UpdateUserIdCard = function (userId, cardId) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update user SET idCard = ${cardId} WHERE (id = '${userId}')`,
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
const UpdateUserAvata = function (nameAvata, userId) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update user SET nameAvata = '${nameAvata}' WHERE (id = '${userId}')`,
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
  find_all_Administrators,
  find_all_Employee,
  find_all_Customer,
  find_by_Id,
  find_by_username,
  InsertUser,
  UpdateUser,
  find_by_name_row,
  delete_By_Id,
  UpdateUserAvata,
  UpdateUserIdCard,
  Users,
};
