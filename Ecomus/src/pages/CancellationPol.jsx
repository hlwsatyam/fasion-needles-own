import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const CancellationPolicy = () => {
  return (
    <div  className=""  >
      <Header />
      <div className=" py-8 sm:!px-32 !px-4 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          Cancellation, Return & Exchange Policy
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for shopping with Fashion Needles at www.fashionneedles.in!
          We strive to ensure you have a seamless experience with us. However,
          we understand that sometimes things change, and you may need to cancel
          or exchange an order. This policy outlines our procedures and
          requirements for cancellations and exchanges.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          1. Order Cancellation Policy
        </h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">
          Cancellation Before Shipping
        </h3>
        <p className="text-gray-700 mb-4">
          <strong>How to Cancel:</strong> If you wish to cancel your order,
          please contact us immediately at support@fashionneedles.in or 085954
          90062.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Eligibility:</strong> Cancellations can only be accepted if
          the order has not yet been shipped.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Refund:</strong> Once a cancellation request is successfully
          processed, you will receive a full refund within 7-10 business days
          via your original payment method.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Cancellation After Shipping
        </h3>
        <p className="text-gray-700 mb-4">
          Orders that have already been shipped cannot be canceled. However, you
          may initiate an exchange or return as per our policy outlined below.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Special Note for Cash on Delivery (COD) Orders
        </h3>
        <p className="text-gray-700 mb-4">
          If a COD order is canceled, no refund process is necessary, as payment
          is not collected until delivery.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Exchange Policy</h2>
        <p className="text-gray-700 mb-4">
          We want you to love your purchase from Fashion Needles! If you are not
          completely satisfied with an item, you may be eligible for an
          exchange. Please review the guidelines below:
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Eligibility for Exchange
        </h3>
        <p className="text-gray-700 mb-4">
          <strong>Timeframe:</strong> You can request an exchange within 7 days
          of receiving the product.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Condition:</strong> Items must be in original condition,
          unworn, unwashed, and with all tags intact.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Non-Exchangeable Items:</strong> Certain items, such as sale
          items, custom-made products, undergarments, and accessories, may not
          be eligible for exchange. Please review product details carefully
          before purchase.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Exchange Process</h3>
        <p className="text-gray-700 mb-4">
          <strong>Contact Us:</strong> Email us at support@fashionneedles.in or
          call 085954 90062 to initiate your exchange request. Include your
          order number, the item(s) to be exchanged, and the reason for the
          exchange.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Return Shipment:</strong> Once your exchange request is
          approved, you will need to ship the item back to us. Shipping costs
          for exchanges are generally borne by the customer unless the item
          received was defective or incorrect.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Replacement Shipment:</strong> After receiving and inspecting
          the returned item, we will process and dispatch your replacement item
          within 3-5 business days. You will receive tracking information once
          the replacement item is shipped.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Damaged or Defective Items
        </h2>
        <p className="text-gray-700 mb-4">
          If you receive an item that is damaged or defective, please reach out
          to us immediately so we can make it right.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          Procedure for Damaged/Defective Items
        </h3>
        <p className="text-gray-700 mb-4">
          <strong>Report the Issue:</strong> Contact us within 48 hours of
          delivery at support@fashionneedles.in with your order number and
          photos showing the defect or damage.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Assessment and Resolution:</strong> We will assess the issue
          and, if eligible, arrange for a replacement or full refund, including
          shipping costs.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Important Notes</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Original Packaging: To qualify for an exchange or cancellation, the
            item must be returned in its original packaging, including tags and
            any accompanying materials.
          </li>
          <li>
            Multiple Exchanges: Exchanges are generally limited to one per
            order. We recommend contacting us with any questions about fit,
            style, or sizing before placing your order.
          </li>
          <li>
            Refund for Exchanges: In cases where the requested item for exchange
            is unavailable, we may offer a refund or store credit.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about our Cancellation & Exchange Policy or
          need further assistance, please reach out to our customer support
          team:
        </p>
        <ul className="text-gray-700 mb-4">
          <li>Email: support@fashionneedles.in</li>
          <li>Phone: 085954 90062</li>
          <li>
            Address: First Floor, Lal Mandir Market, C-67, Main Rd, Shital
            Vihar, Khora Colony, Sector 57, Noida, Uttar Pradesh 201301
          </li>
        </ul>
      </div>
  
    </div>
  );
};

export default CancellationPolicy;
