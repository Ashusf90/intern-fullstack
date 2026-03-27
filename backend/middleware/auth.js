const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("Authorization") || req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const t = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(t, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};