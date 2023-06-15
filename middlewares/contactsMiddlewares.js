const { getById } = require("../models");
const { catchAsync, AppError } = require("../utils");
const { isValidObjectId } = require("mongoose");
/**
 * Check contact exists in db by id middleware.
 */

const checkById = catchAsync(async (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return next(new AppError(400, "id no valid"));

  const contact = await getById(id);
  if (!contact) return next(new AppError(404, "Not found"));

  req.data = contact;

  next();
});

module.exports = { checkById };
