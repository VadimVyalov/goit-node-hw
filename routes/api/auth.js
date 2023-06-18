const { Router } = require("express");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers");

const {
  auth,
  validateLoginBody,
  validateRegisterBody,
  validateSubscription,
} = require("../../middlewares");

const router = Router();

router.post("/register", validateRegisterBody, registration);
router.post("/login", validateLoginBody, login);

router.use("/", auth);
router.patch("/", validateSubscription, updateSubscription);
router.post("/logout", logout);
router.get("/current", current);

module.exports = router;
