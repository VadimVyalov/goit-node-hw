const { checkById } = require("./contactsMiddlewares");
const { validateBody, validateFavorite } = require("./contactBodyMiddlewares");

module.exports = { checkById, validateBody, validateFavorite };
