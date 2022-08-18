const express = require("express");
const { addProject } = require("../controllers/projectController");
const { protect } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.post("/", (protect, addProject));

module.exports = router;
