const express = require('express');
const router = express.Router();

const { caseInformationController } = require("../controllers");

router.post('/post-case-information', caseInformationController.postCaseInformation);
router.get('/case-information', caseInformationController.allCaseInformation);
router.get('/case-information/:id', caseInformationController.caseInformationDetail);
router.delete('/delete-case-information/:id', caseInformationController.deleteCaseInformation);

module.exports = router;