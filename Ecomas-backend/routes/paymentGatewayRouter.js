const express = require('express');
const router = express.Router();
const {customerPaymentStatus} = require('../config/phonepe.js');

//Payment Status Check
router.get('/paymentsuccess/:txnId', customerPaymentStatus);


module.exports = router;
 