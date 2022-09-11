const dbConn = require("../Common/Common");
const Employee = function (employee) {
  this.fullname = employee.fullname;
  this.sex = employee.sex;
  this.email = employee.email;
  this.phone = employee.phone;
  this.username = employee.username;
  this.passwordEn = employee.password;
  this.address = employee.address;
  this.statusLock = employee.statusLock;
  this.dateOfBirth = employee.dateOfBirth;
  this.idRole = employee.idRole;
};

const find_Emp_by_name_row = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM employee WHERE ${nameRow} = '${value}'`,
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

const find_all_Employee = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT * FROM employee where idRole = 1",
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
      `SELECT * FROM employee where id = '${id}'`,
      (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements[0]);
      }
    );
  });
};

const delete_Emp_By_Id = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `DELETE FROM employee WHERE (id = '${id}');`,
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

const UpdateEmployee = function (employeeUpdate, employeeId) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update employee SET fullname = '${employeeUpdate.fullname}', email = '${employeeUpdate.email}', phone = '${employeeUpdate.phone}', address = '${employeeUpdate.address}',sex= '${employeeUpdate.sex}',dateOfBirth= '${employeeUpdate.dateOfBirth}' WHERE (id = '${employeeId}')`,
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
const find_Emp_by_username = function (username) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM employee where username = '${username}'`,
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

const InsertEmpoyee = function (userNew) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into employee SET ?", userNew, (err, element) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: element.insertId, ...element });
      }
    });
  });
};

module.exports = {
  find_by_Id,
  find_Emp_by_username,
  InsertEmpoyee,
  find_Emp_by_name_row,
  find_all_Employee,
  delete_Emp_By_Id,
  UpdateEmployee,
  Employee,
};
