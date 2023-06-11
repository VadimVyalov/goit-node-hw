const { checkById } = require("./contactsMiddlewares");
const { validateBody } = require("./contactBodyMiddlewares");

module.exports = { checkById, validateBody };
