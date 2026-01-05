const staffService = require("../services/staffService");

// ✅ GET STAFF LIST (PAGINATION + SEARCH)
exports.getStaff = async (req, res) => {
  try {
    const result = await staffService.listStaff(req.query);

    res.status(200).json({
      staff: result.data,
      total: result.total,
    });
  } catch (err) {
    console.error("GET STAFF ERROR:", err);
    res.status(500).json({ error: "Failed to fetch staff list" });
  }
};

// ✅ CREATE STAFF (WITH PHOTO)
exports.createStaff = async (req, res) => {
  try {
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await staffService.createStaff({
      ...req.body,
      photo: photoPath,
    });

    res.status(201).json({
      message: "Staff created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create staff" });
  }
};


// ✅ UPDATE STAFF (EDIT + PHOTO)
exports.updateStaff = async (req, res) => {
  try {
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const updated = await staffService.updateStaff(req.params.id, {
      ...req.body,
      photo: photoPath,
    });

    if (!updated) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.json({ message: "Staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update staff" });
  }
};


// ✅ GET STAFF BY ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await staffService.getStaffById(req.params.id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (err) {
    console.error("GET STAFF BY ID ERROR:", err);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

// ✅ DELETE STAFF (SOFT DELETE)
exports.deleteStaff = async (req, res) => {
  try {
    const deleted = await staffService.deleteStaff(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (err) {
    console.error("DELETE STAFF ERROR:", err);
    res.status(500).json({ error: "Failed to delete staff" });
  }
};
