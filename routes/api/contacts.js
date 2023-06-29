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
  validateContactBody,
  validateFavorite,
  auth,
} = require("../../middlewares");

const router = Router();

router.use("/", auth);

router.route("/").post(validateContactBody, addContact).get(listContacts);

router.use("/:id", checkById);
router
  .route("/:id")
  .get(getById)
  .delete(removeContact)
  .put(validateContactBody, updateContact);

router.route("/:id/favorite").patch(validateFavorite, updateStatusContact);

module.exports = router;
