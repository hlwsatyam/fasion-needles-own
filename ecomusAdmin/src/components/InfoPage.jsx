import React from 'react';
import {
  FaTruck, FaLock, FaHandHoldingUsd, FaUndoAlt
} from 'react-icons/fa';

const InfoList = () => {
  const infoItems = [
    { text: 'Non-Returnable', icon: <FaUndoAlt className="text-red-500" /> },
    { text: 'Pay on Delivery', icon: <FaHandHoldingUsd className="text-green-500" /> },
    { text: 'Amazon Delivered', icon: <FaTruck className="text-blue-500" /> },
    { text: 'Free Delivery', icon: <FaTruck className="text-teal-500" /> },
    { text: 'Secure transaction', icon: <FaLock className="text-gray-600" /> }
  ];

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
      <ul className="space-y-3">
        {infoItems.map((item, index) => (
          <li key={index} className="flex items-center p-3 border-b last:border-b-0 border-gray-200 hover:bg-gray-50 rounded-md transition-colors">
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="text-lg font-medium text-gray-700">{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Next Page</button>
      </div>
    </div>
  );
};

export default InfoList;
