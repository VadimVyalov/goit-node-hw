const User = require("../models/userSchema");
const { catchAsync, AppError } = require("../utils");
const bcrypt = require("bcrypt");

const registration = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  hashedPasword = await bcrypt.hash(password, salt);

  const result = await User.create({ ...req.body, password: hashedPasword });
  const { subscription } = result;
  res.status(201).json({ email, subscription });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new AppError(401, "Email  is wrong"));

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) return next(new AppError(401, " password is wrong"));

  const { subscription } = user;

  const resp = {
    token: "TOKEN",
    user: {
      email,
      subscription,
    },
  };

  res.status(200).json(resp);
});

module.exports = {
  registration,
  login,
};
