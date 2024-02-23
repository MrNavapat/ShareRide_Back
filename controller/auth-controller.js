const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "Soryorn_1977";
const EXPIRE_IN = process.env.JWT_EXPIRE || 1;

exports.register = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserName(req.body.userName);

  if (existsUser) {
    createError("User exists", 400);
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = await userService.createUser(req.body);

    const payload = { Id: newUser.id };
    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: EXPIRE_IN,
    });
    delete newUser.password;
    res.status(201).json({ accessToken, newUser });
  }
});

exports.login = catchError(async (req, res, next) => {
  const userCheck = await userService.findUserName(req.body.userName);

  if (userCheck) {
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      userCheck.password
    );

    if (passwordCheck) {
      const payload = { Id: userCheck.id };
      const accessToken = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRE_IN,
      });
      delete userCheck.password;
      res.status(200).json({ accessToken, user: userCheck });
    } else {
      createError("wrong password", 403);
    }
  } else {
    createError("no such username", 403);
  }
});


exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};