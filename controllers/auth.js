const User = require("../models/userSchema");
const { catchAsync, AppError } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const registration = catchAsync(async (req, res) => {
  const result = await User.create(req.body);
  const { email, subscription } = result;
  res.status(201).json({ email, subscription });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return next(new AppError(401, " Email or password is wrong"));

  const { subscription, id } = user;

  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "59s" });

  await User.findByIdAndUpdate(id, { token });

  const result = {
    token: token,
    user: {
      email,
      subscription,
    },
  };

  res.status(200).json(result);
});

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  console.log("------");
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const validSubscriptions = ["starter", "pro", "business"];
  const { _id } = req.user;
  const newSubscription = req.body.subscription;

  if (!validSubscriptions.includes(newSubscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription: newSubscription },
    { new: true }
  );

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json({ message: "Subscription updated", user });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
};
