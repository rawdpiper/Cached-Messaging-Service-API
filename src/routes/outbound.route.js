const express = require('express');
const outboundController = require('../controllers/outbound.controllers');
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/outbound/sms', auth, outboundController);

module.exports = router