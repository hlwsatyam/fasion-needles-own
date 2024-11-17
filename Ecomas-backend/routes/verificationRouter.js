const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require("jsonwebtoken");
const usertable = require("../Models/usertable.js");
const secretKey = "12345678910";
const bcrypt = require("bcryptjs");

router.post('/mob', async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    try {
        const genOtp = () => {
            let digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 4; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }
        const otp = genOtp();

        // Define the request body 
        const requestBody = {
            route: 'otp',
            variables_values: otp, // You can change this to generate random OTPs dynamically if needed
            numbers: phone
        };
        // Send the POST request to Fast2SMS
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', requestBody, {
            headers: {
                "authorization": "HKje2kUYr6CcyDWMhotVubqzv4J3IpXxEiwAlfFOsQTm8nLZa9ps1oe5GVmck2Sn79vNUfi8hjbPgDHO",
                "Content-Type": "application/json"
            }
        });
        if (response.data.return == true) {
            return res.status(200).json({ message: 'OTP sent successfully', otp });
        }
        // Return the response from Fast2SMS
        res.status(203).json({ message: 'OTP not sent successfully', });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(203).json({ message: 'Failed to send OTP' });
    }
});
router.post('/resetPassword', async (req, res) => {
    const { phone, newPassword } = req.body;
    if (!phone || !newPassword) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const bcrypt_password = await bcrypt.hash(newPassword, salt)
        await usertable.findOneAndUpdate({ mobile: phone }, { password: bcrypt_password })
        // Return the response from Fast2SMS
        res.status(200).json({ message: 'Password reset successfully', });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(203).json({ message: 'Failed to update Password' });
    }
});

module.exports = router;