const { checkById } = require("./contactsMiddlewares");
const {
  validateContactBody,
  validateFavorite,
} = require("./contactBodyMiddlewares");
const {
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
  validateVerify,
  uploadUserAvatar,
} = require("./userBodyMiddlewares");
const { auth } = require("./auth");

module.exports = {
  checkById,
  validateContactBody,
  validateFavorite,
  auth,
  validateRegisterBody,
  validateLoginBody,
  validateSubscription,
  validateVerify,
  uploadUserAvatar,
  //ImageService,
};
