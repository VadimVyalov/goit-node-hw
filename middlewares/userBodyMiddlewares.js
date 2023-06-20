const {
  catchAsync,
  AppError,
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../utils");

const validateRegisterBody = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).length)
    return next(new AppError(400, "missing fields"));

  const bodyNoKey = [];

  if (!Object.keys(req.body).includes("email")) bodyNoKey.push("email");
  if (!Object.keys(req.body).includes("password")) bodyNoKey.push("password");

  if (bodyNoKey.length)
    return next(
      new AppError(
        400,
        `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
      )
    );

  const { error } = registerSchema.validate(req.body);
  if (error) return next(new AppError(400, error.message));

  next();
});

const validateLoginBody = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).length)
    return next(new AppError(400, "missing fields"));

  const bodyNoKey = [];

  if (!Object.keys(req.body).includes("email")) bodyNoKey.push("email");
  if (!Object.keys(req.body).includes("password")) bodyNoKey.push("password");

  if (bodyNoKey.length)
    return next(
      new AppError(
        400,
        `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
      )
    );

  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(400, error.message));

  next();
});

const validateSubscription = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("subscription"))
    return next(new AppError(400, `missing field subscription`));

  const { error } = subscriptionSchema.validate(req.body);
  if (error) return next(new AppError(400, error.message));

  next();
});

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
};
