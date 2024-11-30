import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="  py-8 sm:px-8 md:px-12 md:py-12 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Welcome to Fashion Needles! Your privacy is of utmost importance to
          us. This Privacy Policy outlines how we collect, use, and safeguard
          your personal information when you visit our website,
          www.fashionneedles.in, or make a purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect personal information you provide directly to us when you
          create an account, make a purchase, or contact customer support. This
          may include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Shipping and billing addresses</li>
          <li>Payment information (securely processed)</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Additionally, we may collect information about your usage of the site
          through cookies and similar technologies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">We use your information to:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you regarding your orders or inquiries</li>
          <li>Enhance your shopping experience by personalizing content</li>
          <li>Send promotional emails (you can opt out at any time)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Sharing Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We do not sell or share your personal information with third parties
          for their marketing purposes. We may share your data with trusted
          service providers who assist in operating our website, conducting
          business, and servicing you, so long as they agree to keep this
          information confidential.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement industry-standard security measures to protect your
          personal information. While we strive to use commercially acceptable
          means to protect your data, no method of transmission over the
          internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="text-gray-700 mb-4">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Access and request a copy of your personal information</li>
          <li>Correct any inaccuracies in your data</li>
          <li>Request deletion of your data (subject to legal obligations)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time to reflect changes
          to our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have questions about this Privacy Policy, please contact us:
        </p>
        <ul className="text-gray-700 mb-4">
          <li>Email: support@fashionneedles.in</li>
          <li>Phone: 085954 90062</li>
          <li>
            Address: First Floor, Lal Mandir Market, C-67, Main Rd, Shital
            Vihar, Khora Colony, Sector 57, Noida, Uttar Pradesh 201301
          </li>
        </ul>

        <p className="text-gray-700 mt-8">
          Thank you for trusting Fashion Needles with your information. Your
          privacy is essential to us.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
