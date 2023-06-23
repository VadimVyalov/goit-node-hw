const { Router } = require("express");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
} = require("../../controllers");

const {
  auth,
  validateLoginBody,
  validateRegisterBody,
  validateSubscription,
  upload,
} = require("../../middlewares");

const router = Router();

router.post("/register", validateRegisterBody, registration);
router.post("/login", validateLoginBody, login);

router.use("/", auth);
router.patch("/avatars", upload.single("avatar"), updateAvatar);
router.patch("/", validateSubscription, updateSubscription);
router.post("/logout", logout);
router.get("/current", current);

module.exports = router;
