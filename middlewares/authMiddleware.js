const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
  // Expect token in Authorization header as 'Bearer <token>'
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    // Attach decoded payload to req.user
    req.user = decoded;
    next();
  });
}
module.exports = authMiddleware;
