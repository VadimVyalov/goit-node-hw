const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SUBSCRIPTIONS } = require("../config/config");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTIONS,
      default: SUBSCRIPTIONS[0],
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

user.methods.validPassword = async function (passwordCandidate) {
  const result = await bcrypt.compare(passwordCandidate, this.password);
  return result;
};

user.methods.getToken = function (secret, exp) {
  const payload = { id: this.id };
  const token = jwt.sign(payload, secret, { expiresIn: exp });
  return token;
};

user.post("save", mongooseError);

user.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  const avatarURL = gravatar.url(this.email, {
    s: "250",
    r: "g",
    d: "wavatar",
  });
  this.avatarURL = avatarURL;

  this.verificationToken = v4();

  next();
});

const User = model("user", user);

module.exports = User;
