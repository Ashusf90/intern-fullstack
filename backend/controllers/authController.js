const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await pool.query(
      "SELECT * FROM auth_user WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).send("User already exists");
    }

    await pool.query(
      "INSERT INTO auth_user (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
      [email, first_name, last_name, hashedPassword]
    );

    res.send("User registered");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await pool.query(
      "SELECT * FROM auth_user WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};