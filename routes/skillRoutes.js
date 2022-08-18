const express = require("express");
const {
    addSkills,
    userSkills,
    allSkills,
} = require("../controllers/skillController");
const { protect } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.route("/").post(protect, addSkills).get(protect, allSkills);
router.route("/:userId").get(protect, userSkills);

module.exports = router;
