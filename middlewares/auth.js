const { catchAsync, AppError } = require("../utils");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const auth = catchAsync(async (req, _, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ") || "";

  if (bearer !== "Bearer") return next(new AppError(401, "Not authorized"));

  const id = jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new AppError(401, "Not authorized"));
    return decoded.id;
  });
  if (!id) return;

  const user = await User.findById(id);

  if (!user || !user.token || user.token !== token)
    return next(new AppError(401, "Not authorized"));
  req.user = user;

  next();
});

module.exports = {
  auth,
};
