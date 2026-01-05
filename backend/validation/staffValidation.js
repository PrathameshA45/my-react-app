exports.validateStaff = (req, res, next) => {
  const {  email, mobile } = req.body;

  // ✅ NAME: allow only letters and spaces
const name = req.body.name?.trim();


if (!name || !/^[A-Za-z ]+$/.test(name)) {
  return res.status(400).json({
    error: "Name must contain only alphabetic characters",
  });
}


  // ✅ NAME: must contain at least 3 alphabetic letters (spaces ignored)
  const lettersOnly = name.replace(/[^A-Za-z]/g, "");
  if (lettersOnly.length < 3) {
    return res.status(400).json({
      error: "Name must contain at least 3 alphabetic characters",
    });
  }

  // ✅ EMAIL
  if (!email || !/^[^\s@]+@gmail\.com$/.test(email)) {
    return res.status(400).json({
      error: "Email must end with @gmail.com",
    });
  }

  // ✅ MOBILE
  if (!mobile || !/^[7-9][0-9]{9}$/.test(mobile)) {
    return res.status(400).json({
      error: "Mobile must start with 7-9 and be exactly 10 digits",
    });
  }

  next(); // ✅ all validations passed
};
