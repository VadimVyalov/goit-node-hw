const { checkById } = require("./contactsMiddlewares");
const { validateBody, validateFavorite } = require("./contactBodyMiddlewares");
const { auth } = require("./auth");
module.exports = { checkById, validateBody, validateFavorite, auth };
