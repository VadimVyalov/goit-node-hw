const { Router } = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers");
const { checkById, validateBody } = require("../../middlewares");

const router = Router();

router.route("/").post(validateBody, addContact).get(listContacts);

router.use("/:id", checkById);

router
  .route("/:id")
  .get(getById)
  .delete(removeContact)
  .put(validateBody, updateContact);

module.exports = router;
