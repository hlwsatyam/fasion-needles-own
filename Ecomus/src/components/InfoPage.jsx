import React from "react";
import {
  FaTruck,
  FaLock,
  FaHandHoldingUsd,
  FaUndoAlt,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";

const InfoList = () => {
  const infoItems = [
    { text: "Non-Returnable", icon: <FaUndoAlt className="text-red-500" /> },
    {
      text: "Pay on Delivery",
      icon: <FaHandHoldingUsd className="text-green-500" />,
    },
    { text: "Amazon Delivered", icon: <FaTruck className="text-blue-500" /> },
    { text: "Free Delivery", icon: <FaTruck className="text-teal-500" /> },
    { text: "Secure transaction", icon: <FaLock className="text-gray-600" /> },
  ];

  const additionalContent = [
    {
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders ",
      icon: <FaTruck className="text-teal-500" />,
    },
    {
      title: "Support",
      description: "Our dedicated support team is here to assist you. ",
      icon: <FaHeadset className="text-blue-500" />,
    },
    {
      title: "Return",
      description: "Hassle-free returns within a specified period. ",
      icon: <FaUndoAlt className="text-red-500" />,
    },
    {
      title: "Payment",
      description: "Secure and convenient payment options .",
      icon: <FaCreditCard className="text-green-500" />,
    },
  ];

  return (
    // <div className="bg-transparent overflow-y-scroll no-scrollbar shadow-lg p-6 rounded-lg w-full mx-auto space-y-6">
    //   <div className="mt-6 flex justify-between items-stretch gap-x-4">
    //     {additionalContent.map((content, index) => (
    //       <div
    //         key={index}
    //         className="p-2 flex-1 leading-[180px] rounded-lg border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
    //       >
    //         <div className="text-2xl">{content.icon}</div>
    //         <div className="flex-grow">
    //           <h3 className="text-xl font-semibold text-gray-800 mb-2 w-full">{content.title}</h3>
    //           <p className="text-gray-600">{content.description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="flex flex-wrap justify-center   gap-6 bg-gray-100  my-9 rounded-lg ">
      {additionalContent.map((feature, index) => (
        <div
          key={index * new Date().getTime()}
          className="flex flex-col items-center text-center space-y-1 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-[170px] sm:w-[250px] "
        >
          <div className="text-3xl text-blue-500">{feature.icon}</div>
          <h3 className="font-semibold text-sm text-gray-800">
            {feature.title}
          </h3>
          <p className="text-[11px] text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoList;

// import React from "react";
// import { FaLock, FaUndo, FaHeadset, FaShippingFast, FaCertificate } from "react-icons/fa";

// const Features = () => {
//   const features = [
//     { icon: <FaLock />, title: "Secure Payments", text: "SSL encryption on all transactions" },
//     { icon: <FaUndo />, title: "Free & Fast Returns", text: "Free return on all qualifying orders" },
//     { icon: <FaHeadset />, title: "Active Support", text: "Get in touch if you have a problem" },
//     { icon: <FaShippingFast />, title: "Fast Delivery", text: "Receive your orders quickly and safely" },

//   ];

//   return (
//     <div className="flex flex-wrap justify-center   gap-6 bg-gray-100  my-6 rounded-lg ">
//       {features.map((feature, index) => (
//         <div
//           key={index*new Date().getTime()}
//           className="flex flex-col items-center text-center space-y-1 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-[170px] sm:w-[250px] "
//         >
//           <div className="text-3xl text-blue-500">{feature.icon}</div>
//           <h3 className="font-semibold text-xs text-gray-800">{feature.title}</h3>
//           <p className="text-[8px] text-gray-600">{feature.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Features;
