const { checkById } = require("./contactsMiddlewares");
const { validateBody, validateFavorite } = require("./contactBodyMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
} = require("./userBodyMiddlewares");
const { auth } = require("./auth");

module.exports = {
  checkById,
  validateBody,
  validateFavorite,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
};
