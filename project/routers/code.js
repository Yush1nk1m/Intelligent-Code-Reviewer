const express = require("express");
const useGemini = require("../controllers/gemini");

const router = express.Router();

// POST /code route
router.post("/code", useGemini);

module.exports = router;