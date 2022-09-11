const dbCon = require("../Common/Common");

const RoleModel = function (role) {
    this.nameRole = role.nameRole;
    this.description = role.description;
};

const find_all_Role = function () {
    dbCon.query("SELECT * FROM Role", function (err, role) {
        if (err) {
            result(null);
            return;
        }
        result(role);
    });
};

const find_by_id_role = function (id) {
    return new Promise(function (resolve, reject) {
        dbCon.query(
            "SELECT * FROM Role where id = ?",
            id,
            function (err, role) {
                if (err || role.length === 0) {
                    return reject(err);
                }
                return resolve(role[0]);
            }
        );
    });
};

const find_by_name_row_role = function (row, nameRole) {
    return new Promise((resolve, reject) => {
        dbCon.query(
            `SELECT * FROM role where ${row} = '${nameRole}'`,
            function (err, role) {
                if (err) {
                    return reject(err);
                }
                return resolve(role[0]);
            }
        );
    });
};

const insert_Role = function (newRole) {
    return new Promise((resolve, reject) => {
        dbCon.query("Insert into role SET ?", newRole, function (err, roles) {
            if (err || roles.length === 0) {
                return reject(err);
            } else {
                return resolve({ id: roles.insertId, ...roles });
            }
        });
    });
};

module.exports = {
    find_all_Role,
    find_by_id_role,
    find_by_name_row_role,
    insert_Role,
    RoleModel,
};
