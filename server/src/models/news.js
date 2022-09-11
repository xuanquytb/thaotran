const dbConn = require("../Common/Common");
const News = function (news) {
  this.nameNews = news.nameNews;
  this.brief = news.brief;
  this.content = news.content;
  this.nameImage = news.nameImage;
  this.author = news.author;
  this.state = news.state;
};

const find_by_name_row_news = function (nameRow, value) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM news WHERE ${nameRow} = '${value}'`,
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

const find_all_News = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM viewnewsjoincategorynews`,
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
      `SELECT * FROM viewnewsjoincategorynews where id = '${id}'`,
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
      `DELETE FROM news WHERE (id = '${id}');`,
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

const InsertNews = function (news) {
  return new Promise((resolve, reject) => {
    dbConn.query("Insert Into news SET ?", news, (err, elements) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({ id: elements.insertId, ...elements });
      }
    });
  });
};

const UpdateNews = function (newsUpdate, id) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `Update news SET nameNews = '${newsUpdate.nameNews}', brief = '${newsUpdate.brief}', content = '${newsUpdate.content}', author = '${newsUpdate.author}', state = '${newsUpdate.state}' WHERE (id = '${id}')`,
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
  find_by_name_row_news,
  find_all_News,
  find_by_Id,
  delete_By_Id,
  InsertNews,
  UpdateNews,
  News,
};
