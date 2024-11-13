import React from 'react';
import {
  FaTruck, FaLock, FaHandHoldingUsd, FaUndoAlt, FaHeadset, FaCreditCard
} from 'react-icons/fa';

const InfoList = () => {
  const infoItems = [
    { text: 'Non-Returnable', icon: <FaUndoAlt className="text-red-500" /> },
    { text: 'Pay on Delivery', icon: <FaHandHoldingUsd className="text-green-500" /> },
    { text: 'Amazon Delivered', icon: <FaTruck className="text-blue-500" /> },
    { text: 'Free Delivery', icon: <FaTruck className="text-teal-500" /> },
    { text: 'Secure transaction', icon: <FaLock className="text-gray-600" /> }
  ];

  const additionalContent = [
    {
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders ',
      icon: <FaTruck className="text-teal-500" />
    },
    {
      title: 'Support',
      description: 'Our dedicated support team is here to assist you. ',
      icon: <FaHeadset className="text-blue-500" />
    },
    {
      title: 'Return',
      description: 'Hassle-free returns within a specified period. ',
      icon: <FaUndoAlt className="text-red-500" />
    },
    {
      title: 'Payment',
      description: 'Secure and convenient payment options .',
      icon: <FaCreditCard className="text-green-500" />
    }
  ];

  return (
    <div className=" bg-transparent  shadow-lg p-6 rounded-lg w-full   mx-auto space-y-6">
     
      <div className="mt-6 flex justify-between items-center space-y-6">
        {additionalContent.map((content, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 w-1/5   rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-2xl">{content.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{content.title}</h3>
              <p className="text-gray-600">{content.description}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default InfoList;