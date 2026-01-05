const express = require("express");
const cors = require("cors");

const staffRoutes = require("./routes/staffRoutes"); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/staff", staffRoutes);
const path = require("path");

// 🔥 THIS LINE IS REQUIRED
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
