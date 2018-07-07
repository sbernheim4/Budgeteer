const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/privacy-policy', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/privacy-policy.html'));
});

router.get('/tos', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/tos.html'));
});

module.exports = router;
