const order = require("../../Models/order");
const cart = require("../../Models/cart");
const {sendEmail} = require("../../middlewares/emailconfig");
const website_info = require("../../Models/website_info");
const Usertable = require("../../Models/usertable");
const jwt = require("jsonwebtoken");
const { phonepeActivate } = require("../../config/phonepe");
const createorder = async (req, res) => {
    try {
        const {
            shipping_first_name,
            shipping_last_name,
            shipping_address1,
            shipping_address2,
            shipping_country,
            shipping_state,
            shipping_city,
            items,
            shipping_pincode,
            shipping_mobile,
            shipping_email,
            total_amount,
            payment_method,
            payment_status,
            payment_key,
            shipping_charges,
        } = req.body;

        let user_id = req?.user?.id;



        let token = ""
        if (!user_id) {
            
            const existUser = await Usertable.findOne({ mobile: shipping_mobile })
            if (!existUser) {
                const genRatePss = () => Math.random().toString(36).slice(-8)

                const newUser = new Usertable({
                    first_name: shipping_first_name,
                    last_name: shipping_last_name,
                    mobile: shipping_mobile,
                    email: shipping_email,
                    password: genRatePss(),
                    dob: new Date(),
                    status: "Active",
                    isAdmin: "Inactive",
                });

                const savedUser = await newUser.save();
                user_id = savedUser._id;
                token = jwt.sign({ id: user_id }, "12345678910", { expiresIn: "100h" });

            } else {
                token = jwt.sign({ id: existUser._id }, "12345678910", { expiresIn: "100h" });
                user_id = existUser._id;
            }
        }


     


        const countorder = await order.countDocuments();

        const orderid = `FN12345600${countorder}`;
        let savedOrder;
        const ordernow = new order({
            orderid,
            user_id,
            items,
            shipping_first_name,
            shipping_last_name,
            shipping_address1,
            shipping_address2,
            shipping_country,
            shipping_state,
            shipping_city,
            shipping_pincode,
            shipping_mobile,
            shipping_email,
            grand_total_amount: total_amount,
            sub_total_amount: total_amount,
            payment_method,
            payment_status,
            payment_key,
            shipping_charges,
        });

        savedOrder = await ordernow.save();


        const emailHtml = `<div class="row">
<div class="col-xs-12">
    <div class="container-fluid">
        <table width="99%" border="0" align="center" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; border: 1px solid #eee;">
            <tbody> 
                <tr>
                    <td style="border-bottom: 1px solid #eee; height: 24px; font-size: 14px;" align="center"><strong>TAX INVOICE</strong></td>
                </tr>
                 
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="50%" height="24" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>SHIPPING ADDRESS</strong></td>
                                    <td width="50%" align="right" style="border-bottom: 1px solid #eee; padding: 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>Invoice No.: ${savedOrder.orderid}</strong></td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                        <p>
                                            <strong>Name:</strong> ${savedOrder.shipping_first_name}&nbsp;${savedOrder.shipping_last_name}<br>
                                            <strong>Address:</strong> ${savedOrder.shipping_address1},${savedOrder.shipping_address2},${savedOrder.shipping_city},${savedOrder.shipping_state},${savedOrder.shipping_country}-${savedOrder.shipping_pincode}<br>
                                            <strong>Phone no.: </strong>${savedOrder.shipping_mobile}<br>
                                            <strong>Email: </strong>${savedOrder.shipping_email}
                                        </p>
                                    </td>
                                    <td width="50%" align="right" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
                                        <p><strong>Date: ${savedOrder.order_date}</strong></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;">
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="5%" height="24" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong>S.NO.</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 12px;" width="29%" align="center"><strong>PRODUCT DESCRIPTION</strong></td>
                                    <td width="12%" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;"><strong>HSN/ SAC</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Qty</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Price Per Product</strong></td>
                                    <td style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #CCC;" width="12%" align="center"><strong>Total Price</strong></td>
                                </tr>
                






                ${items.map((rescart, index) => (
            `<tr>
                                  <td width="5%" height="24" align="center" style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }}>&nbsp;${index + 1}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="29%" align="center">&nbsp;${rescart.name}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;HSN</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;${rescart.quantity}</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.price}</td>
                                  <td style={{ borderBottom: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${rescart.quantity * rescart.quantity}</td>
                                </tr>`
        ))}








                                <tr>
                                    <td colspan="3" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold;">Total</td>
                                    <td colspan="3" style="border-bottom: 1px solid #eee; font-family: Arial, Helvetica, sans-serif; background: #CCC; font-size: 14px; font-weight: bold;" width="15%" align="center">${savedOrder.sub_total_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="50%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Sub Total :</strong> ${savedOrder.sub_total_amount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="50%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Shipping Charges :</strong>  ${savedOrder.shipping_charges} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="50%" valign="top" style="padding: 8px 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Grand Total :</strong> ${savedOrder.sub_total_amount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
`;

        sendEmail(shipping_email, "Order Confirmation", "Order Details With Invoice", emailHtml)
        const data = {
            transactionId: orderid,
            MUID: ordernow?._id,
            name: shipping_first_name,
            amount: total_amount,
            number: shipping_mobile,
        }
        await phonepeActivate(req, res, data,token)

    } catch (err) {
        console.log(`Here is error: ${err}`);
        res.send({ status: "failed", errors: err });
    }
};

module.exports = createorder;
