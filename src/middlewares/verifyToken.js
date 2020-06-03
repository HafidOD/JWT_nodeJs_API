// JWT
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  let decoded = jwt.verify(token, process.env.SECRET_JWT);
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;