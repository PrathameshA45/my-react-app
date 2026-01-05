const staffModel = require("../model/staffModel");

// ✅ LIST STAFF
exports.listStaff = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const offset = (page - 1) * limit;
  const search = query.search || "";

  return await staffModel.getStaffList(search, limit, offset);
};

// ✅ CREATE STAFF (FIXED)
exports.createStaff = async (data) => {
  return await staffModel.addStaff(data);
};

// ✅ UPDATE STAFF (FIXED)
exports.updateStaff = async (id, data) => {
  return await staffModel.updateStaff(id, data);
};

// ✅ GET STAFF BY ID
exports.getStaffById = async (id) => {
  return await staffModel.getStaffById(id);
};

// ✅ DELETE STAFF
exports.deleteStaff = async (id) => {
  return await staffModel.deleteStaff(id);
};
