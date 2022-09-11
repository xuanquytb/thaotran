const dbConn = require("../Common/Common");
const Category = function (category) {
  this.nameCategory = category.nameCategory;
  this.image = category.image;
  this.description = category.description;
};

const find_by_name_row_category = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM category WHERE ${nameRow} = '${value}'`,
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

const find_all_Category = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM category `, (error, elements) => {
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
      `SELECT * FROM category where id = '${id}'`,
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
      `DELETE FROM category WHERE (id = '${id}');`,
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

// const find_by_nameCategory = function (nameCategory) {
//     return new Promise((resolve, reject) => {
//         dbConn.query(
//             `SELECT * FROM category where nameCategory = '${nameCategory}'`,
//             (err, elements) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     resolve(elements[0]);
//                 }
//             }
//         );
//     });
// };

const InsertCategory = function (categoryNew) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into category SET ?", categoryNew, (err, elements) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: elements.insertId, ...elements });
      }
    });
  });
};

const UpdateCategory = function (categoryUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update category SET nameCategory = '${categoryUpdate.nameCategory}', description = '${categoryUpdate.description}' WHERE (id = '${id}')`,
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

const UpdateCategoryAvata = function (nameImage, categoryId) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update category SET image = '${nameImage}' WHERE (id = '${categoryId}')`,
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
  find_all_Category,
  find_by_Id,
  find_by_name_row_category,
  delete_By_Id,
  // find_by_nameCategory,
  InsertCategory,
  UpdateCategory,
  UpdateCategoryAvata,
  Category,
};
