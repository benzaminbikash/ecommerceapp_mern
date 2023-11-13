const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const authModel = require("../models/authModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    try {
      if (token) {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await authModel.findById(id);
        next();
      }
    } catch (error) {
      throw new Error("Non authorized user");
    }
  }
  if (!token) throw new Error("Token is not avaiable");
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const user = await authModel.findById(_id);
  if (user.roll != "admin") {
    throw new Error("You are not admin.");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
