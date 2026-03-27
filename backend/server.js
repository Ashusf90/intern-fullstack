require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes (NO global middleware)
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});