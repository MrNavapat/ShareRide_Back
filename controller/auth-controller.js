const catchError = require('../utils/catch-error');
const createError = require('../utils/create-error');
const userService = require('../services/user-service');
const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');

exports.register = catchError(async (req, res, next) => {
  console.log(req.body)
  const existsUser = await userService.findUserName(
    req.body.userName
  );

  if (existsUser) {
    createError('User exists', 400);
  }

  req.body.password = await hashService.hash(req.body.password);

  const newUser = await userService.createUser(req.body);
  const payload = { userName: newUser.userName };
  const accessToken = jwtService.sign(payload);
  delete newUser.password;

  res.status(201).json({ accessToken, newUser });
  // res.status(200).json({message:"GGGG"})
});
