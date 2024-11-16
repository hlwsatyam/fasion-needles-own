import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

const ShippingPolicy = () => {
  return (
  <div>
    <Header/>
    <div className="  mx-auto px-2 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Fashion Needles! At www.fashionneedles.in, we are dedicated to delivering your purchases quickly, efficiently, and reliably. This Shipping Policy provides detailed information about our shipping practices, rates, timelines, and more.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Shipping Destinations</h2>
      <p className="text-gray-700 mb-4">
        Fashion Needles offers shipping services to locations across India. Currently, we do not ship internationally, but we hope to expand our services soon.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Processing Time</h2>
      <p className="text-gray-700 mb-4">
        Once your order is placed, it typically takes 1-2 business days to process and prepare it for shipping. Please note:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Orders placed after 2:00 PM or on weekends/holidays will be processed on the next business day.</li>
        <li>During peak seasons or sale events, processing times may be slightly delayed.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Shipping Options & Delivery Times</h2>
      <p className="text-gray-700 mb-4">
        We offer multiple shipping options based on your location and delivery urgency:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Standard Shipping: Typically arrives within 5-7 business days after processing.</li>
        <li>Express Shipping: Typically arrives within 2-3 business days after processing.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Delivery timelines depend on your location and selected shipping method. Remote or rural locations may experience slightly longer delivery times.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Shipping Charges</h2>
      <p className="text-gray-700 mb-4">
        Shipping charges are calculated at checkout based on your location, the weight of your order, and the chosen shipping option. Here’s a general outline:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Standard Shipping: [Insert Rate Here] (Free on orders above [Insert Amount])</li>
        <li>Express Shipping: [Insert Rate Here]</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Any additional charges, including taxes or duties (if applicable), will be clearly shown at checkout.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Order Tracking</h2>
      <p className="text-gray-700 mb-4">
        Once your order is shipped, you will receive a confirmation email containing tracking information. Use this tracking number to monitor your package’s journey through the courier’s website. If you do not receive tracking details within 48 hours of order dispatch, please reach out to our customer support.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Delivery Issues</h2>
      <h3 className="text-xl font-semibold mb-2">Incorrect Address</h3>
      <p className="text-gray-700 mb-4">
        Please ensure your shipping address is accurate at checkout. Fashion Needles is not responsible for delayed or failed deliveries due to incorrect addresses. If you realize there’s an error, contact us immediately, and we will do our best to update it before shipping.
      </p>
      <h3 className="text-xl font-semibold mb-2">Missed or Failed Delivery Attempts</h3>
      <p className="text-gray-700 mb-4">
        If a delivery attempt fails due to the recipient being unavailable, the courier will generally make additional attempts. In cases where the package is returned to us after failed delivery attempts, you may need to cover re-shipping costs.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Lost or Damaged Packages</h2>
      <p className="text-gray-700 mb-4">
        Fashion Needles takes every precaution to ensure safe delivery. However, if your package is lost or damaged in transit:
      </p>
      <h3 className="text-xl font-semibold mb-2">Lost Package</h3>
      <p className="text-gray-700 mb-4">
        If your order does not arrive within the expected delivery window, contact us for assistance. We will work with the courier to locate your package or arrange a suitable resolution.
      </p>
      <h3 className="text-xl font-semibold mb-2">Damaged Package</h3>
      <p className="text-gray-700 mb-4">
        If you receive a damaged package, please take photos and reach out to us immediately. We will assist in replacing or refunding damaged items based on our evaluation.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Delays Due to Uncontrollable Events</h2>
      <p className="text-gray-700 mb-4">
        While we strive to meet all estimated delivery times, unforeseen events like natural disasters, public holidays, or strikes may cause delays. In such cases, we will communicate any delays to you via email and work to resolve the situation as quickly as possible.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Cancellation & Changes to Orders</h2>
      <p className="text-gray-700 mb-4">
        Once an order has been placed, it enters processing promptly, and changes or cancellations may not always be possible. If you wish to cancel or amend an order, please contact us immediately, and we will do our best to accommodate your request if the order has not yet shipped.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have questions about our Shipping Policy or need assistance with your order, please reach out to our customer service team:
      </p>
      <ul className="text-gray-700 mb-4">
        <li>Email: support@fashionneedles.in</li>
        <li>Phone: 085954 90062</li>
        <li>Address: First Floor, Lal Mandir Market, C-67, Main Rd, Shital Vihar, Khora Colony, Sector 57, Noida, Uttar Pradesh 201301</li>
      </ul>

      <p className="text-gray-700 mt-8">
        Thank you for choosing Fashion Needles! We are committed to ensuring a seamless shipping experience and look forward to serving you.
      </p>
    </div>
    <Footer/>
  </div>
  );
};

export default ShippingPolicy;
