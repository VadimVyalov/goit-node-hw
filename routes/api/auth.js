const { Router } = require("express");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  send,
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
//router.post("/send", send);
router.use("/", auth);
router.patch("/avatars", upload.single("avatar"), updateAvatar);
router.patch("/", validateSubscription, updateSubscription);
router.post("/logout", logout);
router.get("/current", current);

// vadym.mailforhw@gmail.com
// pL9EKZVR$GKVVjTj
// 3dS*EAyMrUHU6d@4

module.exports = router;
