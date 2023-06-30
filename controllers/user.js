const User = require("../models/userSchema");
const { catchAsync, appError, sendEmail } = require("../utils");

const { TOKEN } = require("../config/config");
const ImageService = require("../services/ImageService");

const { JWT_SECRET } = process.env;

const registration = catchAsync(async (req, res) => {
  const result = await User.create({ ...req.body, verificationToken: "qwe" });
  const { email, subscription, verificationToken } = result;

  const info = await sendEmail(email, verificationToken);
  if (!info) throw appError(401, "Email send error");
  req.body = undefined;
  res.status(201).json({ user: { email, subscription } });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw appError(401, "Email or password is wrong");

  const { subscription, id, verify } = user;

  if (!verify) throw appError(401, "User not verify");

  const isValidPassword = await user.validPassword(password);
  if (!isValidPassword) throw appError(401, " Email or password is wrong");

  const token = await user.getToken(JWT_SECRET, TOKEN.access);
  if (!token) throw appError(401, " Email or password is wrong");

  await User.findByIdAndUpdate(id, { token });
  req.body = undefined;
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
  const { id } = req.user;
  const user = await User.findById(id).select([
    "email",
    "subscription",
    "-_id",
  ]);

  res.status(200).json(user);
};

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(id, { subscription }, { new: true });

  res
    .status(200)
    .json({ message: `Subscription updated to '${subscription}'` });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { file } = req;

  if (!file) throw appError(401, "File is require!");

  const avatarURL = await ImageService.save(
    file,
    { width: 250, height: 250 },
    "avatars"
  );

  await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

  res.status(200).json({
    avatarURL,
  });
};

const sendVerify = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw appError(400);

  const { verificationToken, verify } = user;

  if (verify) throw appError(400, "Verification has already been passed");

  const info = await sendEmail(email, verificationToken);

  if (!info) throw appError(400, "Email send error");

  res.status(200).json({
    message: "Verification email sent",
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) throw appError(404, "User not found");

  const { id } = user;

  await User.findByIdAndUpdate(id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
});
module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  sendVerify,
  verifyEmail,
};
