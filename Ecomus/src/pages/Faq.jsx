import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const FAQSection = () => {
    const faqData = [
        {
          id: 1,
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner. Fill in your details including email, password, and personal information. Once submitted, you'll receive a confirmation email to activate your account.",
        },
        {
          id: 2,
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
        },
        {
          id: 3,
          question: "How can I track my order?",
          answer:
            "Once your order is confirmed, you'll receive a tracking number via email. You can use this number on our website's tracking page or directly on the courier's website to monitor your package's journey.",
        },
        {
          id: 4,
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return request through your account, and we'll provide you with a return shipping label. Refunds are typically processed within 5-7 business days.",
        },
        {
          id: 5,
          question: "How can I contact customer support?",
          answer:
            "Our customer support team is available 24/7 through multiple channels. You can reach us via email at support@example.com, through live chat on our website, or by calling our toll-free number 1-800-EXAMPLE.",
        },
        {
          id: 6,
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary based on the destination. During checkout, you'll see the available shipping options and associated costs.",
        },
        {
          id: 7,
          question: "Can I modify my order after it has been placed?",
          answer:
            "Modifications to orders are possible if the request is made before the item is shipped. Please contact customer support as soon as possible to make changes.",
        },
        {
          id: 8,
          question: "What sizes do you carry for clothing?",
          answer:
            "We offer a wide range of sizes for men, women, and children. Size charts are available on each product page to help you find the perfect fit.",
        },
        {
          id: 9,
          question: "Are the perfumes authentic?",
          answer:
            "Yes, we guarantee that all perfumes sold on fashionneedles.com are 100% authentic and sourced directly from trusted brands and distributors.",
        },
        {
          id: 10,
          question: "How do I apply a discount code?",
          answer:
            "At checkout, enter your discount code in the 'Promo Code' box and click 'Apply'. If valid, the discount will be reflected in your total amount.",
        },
        {
          id: 11,
          question: "Do you sell gift cards?",
          answer:
            "Yes, we offer digital gift cards that can be purchased and sent directly to the recipient's email. Choose from various amounts during checkout.",
        },
        {
          id: 12,
          question: "What brands do you carry?",
          answer:
            "We carry a curated selection of premium brands for clothing, accessories, watches, and perfumes, catering to both men and women.",
        },
        {
          id: 13,
          question: "Can I cancel my order?",
          answer:
            "Order cancellations are allowed if the request is made before the item is shipped. To cancel, contact customer support immediately.",
        },
        {
          id: 14,
          question: "How long does delivery take?",
          answer:
            "Delivery times vary depending on your location and chosen shipping method. Standard shipping usually takes 5-7 business days, while express options are faster.",
        },
        {
          id: 15,
          question: "Do you have a physical store?",
          answer:
            "Currently, fashionneedles.com operates exclusively online. This allows us to provide a wider range of products and better deals.",
        },
        {
          id: 16,
          question: "Can I return items from different orders together?",
          answer:
            "Yes, you can return items from different orders in one package. Ensure that all items are properly labeled with their respective order numbers.",
        },
        {
          id: 17,
          question: "Are there special care instructions for clothing?",
          answer:
            "Yes, each item has specific care instructions to maintain its quality. These instructions are included on the product page and on the item tags.",
        },
        {
          id: 18,
          question: "Do you offer alterations?",
          answer:
            "Currently, we do not provide alteration services. However, we recommend visiting a local tailor for any adjustments you may need.",
        },
        {
          id: 19,
          question: "Is shopping on your website secure?",
          answer:
            "Absolutely. Our website uses industry-standard encryption and security protocols to ensure your personal and payment information is protected.",
        },
        {
          id: 20,
          question: "Can I place an order over the phone?",
          answer:
            "At this time, we only accept orders placed through our website to ensure accuracy and security.",
        },
        {
          id: 21,
          question: "What should I do if I receive a damaged item?",
          answer:
            "If you receive a damaged or defective item, contact customer support immediately with photos of the product and your order details for a replacement or refund.",
        },
        {
          id: 22,
          question: "Do you restock sold-out items?",
          answer:
            "Some popular items may be restocked. You can sign up for restock notifications on the product page by entering your email.",
        },
        {
          id: 23,
          question: "Are there any membership benefits?",
          answer:
            "Yes, we offer a loyalty program where members can earn points on purchases and receive exclusive discounts and early access to sales.",
        },
        {
          id: 24,
          question: "How do I subscribe to the newsletter?",
          answer:
            "Scroll to the bottom of any page and enter your email address in the 'Subscribe to our newsletter' box to stay updated on the latest news and offers.",
        },
        {
          id: 25,
          question: "Do you provide gift wrapping services?",
          answer:
            "Yes, we offer gift wrapping for an additional fee. You can select this option during checkout.",
        },
        {
          id: 26,
          question: "Can I change the delivery address after placing an order?",
          answer:
            "Changes to the delivery address are possible if requested before the item is shipped. Contact customer support to update your address.",
        },
        {
          id: 27,
          question: "What should I do if my order is delayed?",
          answer:
            "If your order is delayed, check the tracking information provided. For further assistance, contact our customer support team.",
        },
        {
          id: 28,
          question: "Do you offer bulk discounts?",
          answer:
            "For bulk orders, please contact our sales department at bulkorders@example.com to discuss potential discounts and terms.",
        },
        {
          id: 29,
          question: "Can I exchange an item for a different size?",
          answer:
            "Yes, we offer size exchanges for items in stock. Initiate the exchange through your account and follow the provided instructions.",
        },
        {
          id: 30,
          question: "How do I remove items from my cart?",
          answer:
            "To remove items, go to your cart, find the item you wish to remove, and click the 'Remove' button next to it.",
        },
      ];
      

  const [openQuestions, setOpenQuestions] = useState(new Set());

  const toggleQuestion = (id) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(id)) {
      newOpenQuestions.delete(id);
    } else {
      newOpenQuestions.add(id);
    }
    setOpenQuestions(newOpenQuestions);
  };

  
  return (
    <div>
      <Header />
      <div
        className="  mx-auto px-4 py-12"
        role="region"
        aria-label="Frequently Asked Questions"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaQuestionCircle className="mr-3 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services. Can't find what
            you're looking for? Contact our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className="w-full flex items-center justify-between p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={openQuestions.has(faq.id)}
                aria-controls={`answer-${faq.id}`}
              >
                <span className="text-lg font-semibold text-gray-800 text-left">
                  {faq.question}
                </span>
                {openQuestions.has(faq.id) ? (
                  <IoIosArrowUp className="text-blue-600 text-xl flex-shrink-0 ml-4" />
                ) : (
                  <IoIosArrowDown className="text-blue-600 text-xl flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                id={`answer-${faq.id}`}
                className={`transition-all duration-300 ease-in-out ${
                  openQuestions.has(faq.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
                role="region"
                aria-labelledby={`question-${faq.id}`}
              >
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <button onClick={()=>window.location.href="/contact-us"} className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline">
              Contact our support team
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQSection;
