const express = require("express");
const router = express.Router();
const { signupUser, loginUser, getUsers } = require("../controllers/user");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/", getUsers);

module.exports = router;
