const {
  catchAsync,
  AppError,
  contactSchema,
  favoriteSchema,
} = require("../utils");

const validateBody = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).length) throw new AppError(400, "missing fields");

  const bodyNoKey = [];

  if (!Object.keys(req.body).includes("name")) bodyNoKey.push("name");
  if (!Object.keys(req.body).includes("email")) bodyNoKey.push("email");
  if (!Object.keys(req.body).includes("phone")) bodyNoKey.push("phone");

  if (bodyNoKey.length)
    return next(
      new AppError(
        400,
        `missing field${bodyNoKey.length > 1 ? "s" : ""}: ${bodyNoKey}`
      )
    );

  const { error } = contactSchema.validate(req.body);
  if (error) throw new AppError(400, error.message);

  next();
});

const validateFavorite = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("favorite"))
    return next(new AppError(400, `missing field favorite`));

  const { error } = favoriteSchema.validate(req.body);
  if (error) return next(new AppError(400, error.message));

  next();
});

module.exports = { validateBody, validateFavorite };
