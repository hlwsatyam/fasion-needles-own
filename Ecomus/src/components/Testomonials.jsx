 

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
    <div className="flex flex-wrap sm:!flex-nowrap justify-center gap-3   bg-gray-100  my-9 rounded-lg ">
      {features.map((feature, index) => (
        <div
          key={index*new Date().getTime()}
          className="flex flex-col items-center text-center space-y-1 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-[150px] sm:w-[250px] "
        >
          <div className=" text-3xl text-blue-500">{feature.icon}</div>
          <h3 className="font-semibold !text-xs md:!text-sm text-gray-800">{feature.title}</h3>
          <p className="text-[11px] text-gray-600">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;


