//const db = require("../config/db");

// GET
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// CREATE
exports.createUser = (user) => {
  const { name, email, city } = user;

  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (name, email, city) VALUES (?, ?, ?)";
    db.query(sql, [name, email, city], (err, result) => {
      if (err) reject(err);
      resolve({ id: result.insertId, ...user });
    });
  });
};

// UPDATE
exports.updateUser = (id, user) => {
  const { name, email, city } = user;

  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET name=?, email=?, city=? WHERE id=?";
    db.query(sql, [name, email, city, id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

// DELETE
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id=?", [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
