import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  const socialLinks = [
    {
      label: "Facebook",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/fashionneedles2/",
      colorClass: "text-blue-600", // Facebook color
    },
    {
      label: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/fashion_needles/",
      colorClass: "text-pink-600", // Instagram color
    },
    {
      label: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/@fashion_needles",
      colorClass: "text-blue-400", // Twitter color
    },
    {
      label: "Youtube",
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@fashion_needles",
      colorClass: "text-red-500", // GitHub color
    },
   
  ];
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
      <div className="max-w-screen-xl px-4 sm:llmb-0 mb-[68px]  sm:py-8 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img
              src="/images/FN-Main.png"
              className="mr-5 h-32  mix-blend-multiply"
              alt="logo"
            />
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              First Floor, Lal Mandir Market, C-67, Main Rd, Shital Vihar, Khora
              Colony, Sector 57, Noida, Uttar Pradesh 201301
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              {socialLinks.map(({ label, icon, url, colorClass }, index) => (
                <a
                  href={url}
                  key={index}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                    <span className={`text-2xl ${colorClass}`}>{icon}</span>
                </a>
              ))}




 


            </div>
          </div>
          <div className="grid sm:grid-cols-4  grid-cols-2 gap-8 sm:col-span-2 lg:col-span-2">
            {[
              {
                heading: "Category",
                items: ["Product", "Men", "Women", "Kids"],
              },
              {
                heading: "Discover",
                items: ["Contact Us", "Blogs", "Maps"],
              },
              {
                heading: "Product",
                items: ["Track Order", "Careers", "Whatsapp"],
              },
              {
                heading: "Policies",
                items: [
                  "FAQ",
                  "Cancellation Policy",
                  "Shipping Policy",
                  "Privacy Policy",
                ],
              },
            ].map(({ heading, items }, index) => (
              <div key={index}>
                <p className="font-medium text-gray-900">{heading}</p>
                <ul className="mt-6 flex-col flex space-y-4 text-sm">
                  {items.map((item, i) => (
                    <li key={i}>
                      <a
                        href={`/${item.replace(" ", "-").toLowerCase()}`}
                        className="text-gray-600 hover:text-gray-900 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-300">
          <p className="text-xs text-center text-gray-500">
            &copy; 2024 fashionneedles.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
