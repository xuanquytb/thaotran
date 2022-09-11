const dbConn = require("../Common/Common");
const NewsCategory = function (newsCategory) {
    this.nameNewsCategory = newsCategory.nameNewsCategory;
    this.status = newsCategory.status;
};

const find_by_name_row_newsCategory = function (nameRow, value) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM newsCategory WHERE ${nameRow} = '${value}'`,
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

const find_all_NewsCategory = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `SELECT * FROM newsCategory `,
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
            `SELECT * FROM newsCategory where id = '${id}'`,
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
            `DELETE FROM newsCategory WHERE (id = '${id}');`,
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

const InsertNewsCategory = function (newsCategoryNew) {
    return new Promise((resolve, reject) => {
        dbConn.query("Insert Into newsCategory SET ?", newsCategoryNew, (err, elements) => {
            if (err) {
                return reject(err);
            } else {
                return resolve({ id: elements.insertId, ...elements });
            }
        });
    });
};

const UpdateNewsCategory = function (newsCategoryUpdate, id) {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `Update newsCategory SET nameNewsCategory = '${newsCategoryUpdate.nameNewsCategory}', status = '${newsCategoryUpdate.status}' WHERE (id = '${id}')`,
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
    find_by_name_row_newsCategory,
    find_all_NewsCategory,
    find_by_Id,
    delete_By_Id,
    InsertNewsCategory,
    UpdateNewsCategory,
    NewsCategory,
};
