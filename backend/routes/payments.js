const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json({ success: true, payment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router; 