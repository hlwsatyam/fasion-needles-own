const CryptoJS = require('crypto-js')
const axios = require('axios')
const crypto = require("crypto");
const order = require('../Models/order');




const salt_key = "562a1eda-67fb-4ccb-89b8-aff6199ea739";
const merchant_id = "M1BWHI37MCK3";

// const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
// const merchant_id = "PGTESTPAYUAT";

// const salt_key = "45c47b54-4922-4050-b4e6-cf9afb42ddfb";
// const merchant_id = "RVBMUNIUAT";

// const salt_key = "15abdc27-e20b-414e-ba7c-a3ec3b2db4d6";
// const merchant_id = "RVBMONLINE";

const phonepeActivate = async (req, res, pdata, token) => {

    try {
        const { transactionId = generateTransactionId(), MUID = "1234567890", name = "John Doe", amount = 100, number = "1234567890" } = pdata;
        // Set the values to variables for later use

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: transactionId,
            merchantUserId: MUID,
            name: name,
            amount: amount * 100, // Amount in paise
            redirectUrl: `https://api.fashionneedles.com/api/order/paymentsuccess/${transactionId}`,
            redirectMode: "get",
            mobileNumber: number,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const checksum = generateChecksum(payloadMain, "/pg/v1/pay", salt_key);

        const options = {
            method: "POST",
            url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
            // url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: payloadMain,
            },
        };

        const response = await axios.request(options);
        if (response.data.success) {
            console.log("fgfgf")
            res.status(200).json({ success: true, token, message: "Payment initiated successfully", url: response.data.data.instrumentResponse.redirectInfo.url, statusCode: 200 });
        } else {
            res
                .status(203)
                .json({ success: false, message: "Payment initiation failed" });
        }
        2
    } catch (e) {
         
        res.status(203).json({ message: e.message, success: false });
    }
}

function generateTransactionId() {
    const prefix = 'MT';
    const randomPart = Math.floor(Math.random() * 1000000000000000); // Random 15-digit number
    const transactionId = prefix + randomPart;
    return transactionId;
}


const generateChecksum = (payloadMain, endpoint, salt_key) => {
    const keyIndex = 2;
    const string = payloadMain + endpoint + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    return sha256 + "###" + keyIndex;
};



const customerPaymentStatus = async (req, res, next) => {

    try {
        const { txnId } = req.params;

        const checksum = generateChecksum(
            "",
            `/pg/v1/status/${merchant_id}/${txnId}`,
            salt_key
        );
        const options = {
            method: "GET",
            url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${txnId}`,
            // url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${txnId}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": merchant_id,
            },
        };
        const response = await axios.request(options);
        if (response.data.success) {
            await order.findOneAndUpdate({ orderid: txnId }, { $set: { payment_status: "received" } });
            res.redirect(`https://fashionneedles.com/customer-order/${txnId}`);
        } else {
            res.redirect("https://fashionneedles.com/payment-failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};


module.exports = { phonepeActivate, customerPaymentStatus };