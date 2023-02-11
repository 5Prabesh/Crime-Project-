const express = require('express');
const router = express.Router();

const { categoryController } = require("../controllers");

router.post('/post-category', categoryController.postCategory);
router.get('/category', categoryController.allCategory);

module.exports = router;