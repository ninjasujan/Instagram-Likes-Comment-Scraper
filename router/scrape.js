const express = require('express');
const router = express.Router();

const { getLikes } = require('../controller/scrape');

router.get('/', getLikes);

module.exports = router;
