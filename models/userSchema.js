const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SUBSCRIPTIONS, TOKEN_EXP } = require("../config/config");

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
    token: String,
  },
  { versionKey: false }
);

user.methods.validPassword = async function (password) {
  console.log(this.id);
  const result = await bcrypt.compare(password, this.password);
  return result;
};

user.methods.getToken = async function (checkPassword) {
  const { id, password } = this;
  const { JWT_SECRET } = process.env;
  const isValid = await bcrypt.compare(checkPassword, password);

  if (!isValid) return isValid;

  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP });
  return token;
};

user.post("save", mongooseError);

user.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = model("user", user);

module.exports = User;
