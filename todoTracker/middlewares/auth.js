require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    if (decodedUser) {
      req.userId = decodedUser.id;
      next();
    } else {
      res.status(401).json({ error: "Incorrect credentials" });
    }
  } catch (er) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { auth };
