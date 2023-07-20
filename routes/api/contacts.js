const { Router } = require("express");
const {
  // listContacts,
  // getById,
  // addContact,
  // removeContact,
  // updateContact,
  // updateStatusContact,
  contactsController,
} = require("../../controllers");

const {
  checkById,
  validateContactBody,
  validateFavorite,
  auth,
} = require("../../middlewares");

const router = Router();

router.use("/", auth);

router
  .route("/")
  .post(validateContactBody, contactsController.addContact)
  .get(contactsController.listContacts);

router.use("/:id", checkById);

router
  .route("/:id")
  .get(contactsController.getById)
  .delete(contactsController.removeContact)
  .put(validateContactBody, contactsController.updateContact);

router
  .route("/:id/favorite")
  .patch(validateFavorite, contactsController.updateStatusContact);

module.exports = router;
