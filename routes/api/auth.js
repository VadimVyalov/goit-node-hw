const { Router } = require("express");
const { registration, login } = require("../../controllers");

const {} = require("../../middlewares");

const router = Router();

router.post("/register", registration);
router.post("/login", login);
// router.post("/logout");
// router.get("/current");

module.exports = router;
