 

import React from "react";
import { FaLock, FaUndo, FaHeadset, FaShippingFast, FaCertificate } from "react-icons/fa";

const Features = () => {
  const features = [
    { icon: <FaLock />, title: "Secure Payments", text: "SSL encryption on all transactions" },
    { icon: <FaUndo />, title: "Free & Fast Returns", text: "Free return on all qualifying orders" },
    { icon: <FaHeadset />, title: "Active Support", text: "Get in touch if you have a problem" },
    { icon: <FaShippingFast />, title: "Fast Delivery", text: "Receive your orders quickly and safely" },
 
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-gray-100  my-2 rounded-lg shadow-md">
      {features.map((feature, index) => (
        <div
          key={index*new Date().getTime()}
          className="flex flex-col items-center text-center space-y-1 p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-[170px] sm:w-[250px] "
        >
          <div className="text-3xl text-blue-500">{feature.icon}</div>
          <h3 className="font-semibold text-xs text-gray-800">{feature.title}</h3>
          <p className="text-[8px] text-gray-600">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;


