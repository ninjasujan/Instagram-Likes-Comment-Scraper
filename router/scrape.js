const express = require('express');
const router = express.Router();

const { getLikes, fetchUserNames } = require('../controller/scrape');

router.get('/', getLikes);

router.post('/fetch', fetchUserNames);

module.exports = router;
