const express = require("express");
const {
    registerUser,
    authUser,
    editUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.put("/editUserDetails", (protect, editUser));

module.exports = router;
