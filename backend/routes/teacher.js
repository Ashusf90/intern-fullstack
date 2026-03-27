const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createTeacher,
  getUsers,
  getTeachers,
} = require("../controllers/teacherController");

// ✅ Protected route
router.post("/", auth, createTeacher);

// Public routes
router.get("/users", getUsers);
router.get("/teachers", getTeachers);

module.exports = router;