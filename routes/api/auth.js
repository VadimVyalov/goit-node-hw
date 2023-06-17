const { Router } = require("express");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers");

const { auth } = require("../../middlewares");

const router = Router();

router.post("/register", registration);
router.post("/login", login);

router.use("/", auth);
router.post("/", updateSubscription);
router.post("/logout", logout);
router.get("/current", current);

module.exports = router;
