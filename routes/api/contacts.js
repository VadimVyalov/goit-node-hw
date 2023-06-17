const { Router } = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const {
  checkById,
  validateBody,
  validateFavorite,
  auth,
} = require("../../middlewares");

const router = Router();

router.use("/", auth);

router.route("/").post(validateBody, addContact).get(listContacts);

router.use("/:id", checkById);
router
  .route("/:id")
  .get(getById)
  .delete(removeContact)
  .put(validateBody, updateContact);

router.route("/:id/favorite").patch(validateFavorite, updateStatusContact);

module.exports = router;
