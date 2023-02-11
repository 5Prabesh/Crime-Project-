const express = require('express');
const router = express.Router();

const auth = require("./auth");
const report = require("./report");
const category = require("./category");
const caseInformation = require("./caseInformation");

router.get('/', (_req, res) => {
    res.json({message: "API Working!"});
});

router.use('/auth', auth);
router.use('/', report);
router.use('/', category);
router.use('/',caseInformation);

module.exports = router;