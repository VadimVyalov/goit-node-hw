const User = require("../models/userSchema");
const { appError } = require("../utils");
const ImageService = require("./ImageService");

class UserServuces {
  registration = async (body) => {
    const user = await User.findOne({ email: body.email });
    if (user) throw appError(409, "Email in use...");

    const result = await User.create({ ...body, verificationToken: "qwe" });

    const { email, subscription, verificationToken } = result;

    return { user: { email, subscription }, verificationToken };
  };

  login = async (body) => {
    const { TOKEN } = require("../config/config");
    const { JWT_SECRET } = process.env;
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) throw appError(401, "Email or password is wrong");

    const { subscription, id, verify } = user;
    if (!verify) throw appError(401, "User not verify");

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
    return result;
  };

  logout = async (id) => {
    await User.findByIdAndUpdate(id, { token: "" });
  };

  current = async (id) => {
    const result = await User.findById(id).select([
      "email",
      "subscription",
      "-_id",
    ]);

    return result;
  };

  updateSubscription = async (id, subscription) => {
    const user = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );
    if (!user) throw appError(401, "Update subscription wrong");
    return user.subscription;
  };

  updateAvatar = async (id, file) => {
    if (!file) throw appError(401, "File is require!");

    const avatarURL = await ImageService.save(
      file,
      { width: 250, height: 250 },
      "avatars"
    );

    const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
    if (!user) throw appError(401, "Update avatar wrong");
    return user.avatarURL;
  };

  sendVerify = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw appError(400);

    const { verificationToken, verify } = user;
    if (verify) throw appError(400, "Verification has already been passed");

    const info = await sendEmail(email, verificationToken);
    if (!info) throw appError(400, "Email send error");
  };

  verifyEmail = async (verificationToken) => {
    const user = await User.findOne({ verificationToken });
    if (!user) throw appError(404, "User not found");

    const { id } = user;

    await User.findByIdAndUpdate(id, {
      verify: true,
      verificationToken: null,
    });
  };
}

const userServices = new UserServuces();
module.exports = userServices;
