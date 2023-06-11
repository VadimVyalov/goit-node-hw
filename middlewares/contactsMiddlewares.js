const { getById } = require("../models");
const { catchAsync, AppError } = require("../utils");

/**
 * Check contact exists in db by id middleware.
 */

checkById = catchAsync(async (req, _, next) => {
  const { id } = req.params;
  const contact = await getById(id);
  if (!contact) next(new AppError(404, "Not found"));
  req.data = contact;
  next();
});

module.exports = { checkById };
