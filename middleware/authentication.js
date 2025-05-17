const jwt = require("jsonwebtoken");

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({message: "No token provided"});
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({message: "No token provided"});
    }

    try {
      const {id, role} = jwt.verify(token, process.env.JWT_SECRET);
      req.id = id;
      req.role = role;

      if (Array.isArray(allowedRoles)) {
        if (allowedRoles.includes(role)) {
          return next();
        }
      } else if (typeof allowedRoles === "string") {
        if (allowedRoles === role) {
          return next();
        }
      }
      return res.status(403).json({message: "Access denied. Invalid role."});
    } catch (err) {
      console.log("TOKEN EXPIRED")
      return res.status(403).json({message: "Token expired or invalid token"});
    }
  };
};

module.exports = checkRole;
