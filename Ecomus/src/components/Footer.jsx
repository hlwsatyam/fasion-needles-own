import { OtherHouses } from "@mui/icons-material";
import React from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
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
    <footer className="bg-gradient-to-r pt-3 sm:!pt-10 !text-white bg-black/80">
      <div className="max-w-screen-xl px-4 sm:mb-0 mb-[68px]  sm:py-8 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols- gap-8 lg:grid-cols-3">
          <div className="grid sm:grid-cols-5  grid-cols-3 gap-8 sm:col-span-2 lg:col-span-2">
            {[
              {
                heading: "Category",
                items: ["MEN", "WOMEN", "LUXURY"],
              },
              // {
              //   heading: "Brands",
              //   items: ["Calvin-Klein","Zara", "dior",  "Chanel"],
              // },
              {
                heading: "Discover",
                items: ["Contact Us", "Blogs"],
              },
              {
                heading: "Product",
                items: ["Track Order", "wishlist"],
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
                <p className="font-medium text-sm pb-2 !text-white border-b-[0.2px] border-slate-500">{heading}</p>
                <ul className="mt-6 flex-col flex space-y-4 text-sm">
                  {items.map((item, i) => (
                    <li key={i}>
                      <a
                        href={
                          heading === "Category"
                            ? `/category/${item.replace(" ", "-")}`
                            : heading === "Brands"
                            ? `/brand/${item.replace(" ", "-")}`
                            : `/${item.replace(" ", "-")}`
                        }
                        className="!text-gray-300 hover:text-gray-900 text-xs transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
          <p className="font-medium text-sm pb-2 !text-white border-b-[0.2px] border-slate-500">About Us</p>

            <p className="max-w-xs flex items-start gap-x-1 !text-white mt-4 text-xs ">
              <FaBuilding size={23} /> First Floor, Lal Mandir Market, C-67,
              Main Rd, Shital Vihar, Khora Colony, Sector 57, Noida, Uttar
              Pradesh 201301
            </p>
            <p className="mt-2  flex items-start gap-x-1 text-xs">
              {" "}
              <FaPhone /> Phone: <a href="tel:+918595490062">+918595490062</a>
            </p>
            <p className="mt-2  flex items-start gap-x-1 text-xs">
              {" "}
              <FaEnvelope /> Email:{" "}
              <a href="mailto:support@fashionneedles.com">
                support@fashionneedles.com
              </a>
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              {socialLinks.map(({ label, icon, url, colorClass }, index) => (
                <a
                  href={url}
                  key={index}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-white hover:text-gray-800 transition duration-300"
                >
                  <span className={`text-2xl ${colorClass}`}>{icon}</span>
                </a>
              ))}
            </div>
            
          </div>
        </div>
         
              <p className="text-center mt-6 font-semibold text-gray-400 text-sm" >Copyright © 2024 Fashion Needles</p>
            
      </div>
    </footer>
  );
};

export default Footer;
