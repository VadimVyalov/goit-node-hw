const { Router } = require("express");
const { userController } = require("../../controllers");

const {
  auth,
  validateLoginBody,
  validateRegisterBody,
  validateSubscription,
  validateVerify,
  uploadUserAvatar,
} = require("../../middlewares");

const router = Router();

router.post("/register", validateRegisterBody, userController.registration);
router.post("/login", validateLoginBody, userController.login);
router.post("/verify", validateVerify, userController.sendVerify);
router.get("/verify/:verificationToken", userController.verifyEmail);

router.use("/", auth);
router.get("/current", userController.current);
router.patch("/avatars", uploadUserAvatar, userController.updateAvatar);
router.patch("/", validateSubscription, userController.updateSubscription);
router.post("/logout", userController.logout);

module.exports = router;
