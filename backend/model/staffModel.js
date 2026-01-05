const db = require("../config/db");

/* ===============================
   GET STAFF LIST (WITH PHOTO)
================================ */
exports.getStaffList = (search, limit, offset) => {
  return new Promise((resolve, reject) => {
    const keyword = `%${search}%`;

    const dataSql = `
      SELECT id, name, email, mobile, photo
      FROM staff
      WHERE deleted_at IS NULL
      AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;

    const countSql = `
      SELECT COUNT(*) AS total
      FROM staff
      WHERE deleted_at IS NULL
      AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)
    `;

    db.query(
      dataSql,
      [keyword, keyword, keyword, limit, offset],
      (err, data) => {
        if (err) return reject(err);

        db.query(
          countSql,
          [keyword, keyword, keyword],
          (err, count) => {
            if (err) return reject(err);

            resolve({
              data,
              total: count[0].total,
            });
          }
        );
      }
    );
  });
};

/* ===============================
   GET STAFF BY ID (WITH PHOTO)
================================ */
exports.getStaffById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, name, email, mobile, photo
      FROM staff
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]); // ✅ important
    });
  });
};

/* ===============================
   ADD STAFF (SAVE PHOTO)
================================ */
exports.addStaff = (data) => {
  const { name, email, mobile, photo } = data;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO staff (name, email, mobile, photo)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, mobile, photo],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

/* ===============================
   UPDATE STAFF (UPDATE PHOTO)
================================ */
exports.updateStaff = (id, data) => {
  const { name, email, mobile, photo } = data;

  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE staff
      SET
        name = ?,
        email = ?,
        mobile = ?,
        photo = COALESCE(?, photo),
        updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(
      sql,
      [name, email, mobile, photo, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      }
    );
  });
};

/* ===============================
   SOFT DELETE STAFF
================================ */
exports.deleteStaff = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE staff
      SET deleted_at = NOW()
      WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
