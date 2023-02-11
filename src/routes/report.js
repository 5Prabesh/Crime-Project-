const express = require('express');
const router = express.Router();

const { reportController } = require("../controllers");

router.post('/post-report', reportController.postReport);
router.get('/report', reportController.allReport);
router.get('/user-report/:id', reportController.allUserReport);
router.get('/report/:id', reportController.reportDetail);
router.put('/accept/:id', reportController.accept);
router.put('/reject/:id', reportController.reject);

module.exports = router;