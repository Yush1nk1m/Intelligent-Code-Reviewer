const express = require("express");

const router = express.Router();

// GET / route
router.get("/", (req, res) => {
    res.status(200).sendFile("/");
});

module.exports = router;