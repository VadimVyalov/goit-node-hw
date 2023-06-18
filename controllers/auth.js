const User = require("../models/userSchema");
const { catchAsync, AppError } = require("../utils");

const registration = catchAsync(async (req, res) => {
  const result = await User.create(req.body);
  const { email, subscription } = result;
  res.status(201).json({ email, subscription });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const { subscription, id } = user;

  const token = await user.getToken(password);
  if (!token) return next(new AppError(401, " Email or password is wrong"));

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
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(id, { subscription }, { new: true });

  res
    .status(200)
    .json({ message: `Subscription updated to '${subscription}'` });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
};
