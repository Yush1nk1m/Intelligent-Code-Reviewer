const express = require("express");
const { useGemini } = require("../controllers/gemini");

const router = express.Router();

// GET / route
router.get("/", (req, res) => {
    res.render("/");
});

router.post("/code", useGemini);

module.exports = router;