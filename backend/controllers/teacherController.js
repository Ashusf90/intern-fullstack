const pool = require("../db");

// CREATE TEACHER
exports.createTeacher = async (req, res) => {
  try {
    const { university_name, gender, year_joined } = req.body;

    await pool.query(
      "INSERT INTO teachers (user_id, university_name, gender, year_joined) VALUES (?, ?, ?, ?)",
      [req.user.id, university_name, gender, year_joined]
    );

    res.send("Teacher added");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// GET USERS
exports.getUsers = async (req, res) => {
  const [users] = await pool.query("SELECT * FROM auth_user");
  res.json(users);
};

// GET TEACHERS
exports.getTeachers = async (req, res) => {
  const [teachers] = await pool.query("SELECT * FROM teachers");
  res.json(teachers);
};