const { checkById } = require("./contactsMiddlewares");
const { validateBody, validateFavorite } = require("./contactBodyMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
} = require("./userBodyMiddlewares");
const { auth } = require("./auth");
const upload = require("./upload");

module.exports = {
  checkById,
  validateBody,
  validateFavorite,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
  upload,
};
