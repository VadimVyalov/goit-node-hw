const User = require("../models/userSchema");
const { catchAsync, appError, sendMail } = require("../utils");
const path = require("path");
const Jimp = require("jimp");
const { TOKEN } = require("../config/config");
const { JWT_SECRET } = process.env;

const registration = catchAsync(async (req, res) => {
  const result = await User.create(req.body);
  const { email, subscription } = result;

  res.status(201).json({ email, subscription });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw appError(401, "Email or password is wrong");

  const { subscription, id } = user;

  const isValidPassword = await user.validPassword(password);
  if (!isValidPassword) throw appError(401, " Email or password is wrong");

  const token = await user.getToken(JWT_SECRET, TOKEN.access);
  if (!token) throw appError(401, " Email or password is wrong");

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
  res.status(200).json({ user: { email, subscription } });
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
  const { filename } = req.file;
  const { id } = req.user;
  const newFileName = `${id}_${filename}`;

  if (!filename) throw appError(401, "File is require!");

  const tmpPath = path.resolve(__dirname, "../tmp", filename);
  const avatarsDir = path.resolve(__dirname, "../public/avatars", newFileName);

  const image = await Jimp.read(tmpPath);
  await image.resize(250, 250).quality(60).writeAsync(avatarsDir);

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

  res.status(200).json({
    avatarURL,
  });
};

// const send = sendMail({
//   to: "vadym.mailforhw@gmail.com",
//   subject: "Please confirm your email",
//   html: `<a href="http://localhost:3000/api/users/verify/">Confirm your email</a>`,
// });

const message = "Hi there, you were emailed me through nodemailer";
const options = {
  from: "TESTING <sender@gmail.com>", // sender address
  to: "vadym.mailforhw@gmail.com", // receiver email
  subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
  text: message,
  //html: HTML_TEMPLATE(message),
};

// sendMail(options, (info) => {
//   console.log("Email sent successfully");
//   console.log("MESSAGE ID: ", info.messageId);
// });

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
};
