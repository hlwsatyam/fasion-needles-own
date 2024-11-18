import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

const testimonials = [
  {
    id: 1,
    name: "Arjun M",
    role: "Frequent Shopper",
    avatar:
      "https://cdn.pixabay.com/photo/2023/09/21/09/36/new-simple-style-boy-photo-8266357_1280.jpg",
    text: "Fashion Needles has completely transformed my shopping experience.  ",
    rating: 5,
  },

  {
    id: 3,
    name: "Ravi K",
    role: "Occasional Buyer",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nsLes8gok3zS5lcOdlo0t7xcQCLVwOfn-A&s",
    text: "As someone who doesn’t usually shop online, I was initially hesitant. However,    ",
    rating: 5,
  },
  {
    id: 4,
    name: "Aditi R",
    role: "Style Consultant",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55P7e6ps8N3x-6z5ViUSgDZT2GjCO9yw7sA&s",
    text: "I’ve been recommending Fashion Needles to my clients for a while now, and they never fail to impress.  ",
    rating: 4,
  },
  {
    id: 5,
    name: "Karan V",
    role: "Online Shopper",
    avatar:
      "https://www.shutterstock.com/image-photo/create-portrait-indian-man-aged-260nw-2517961915.jpg",
    text: "Fashion Needles is my go-to for everything from daily wear to special event outfits.  ",
    rating: 5,
  },
  {
    id: 6,
    name: "Meena T",
    role: "Casual Shopper",
    avatar:
      "https://pikshunt.com/wp-content/uploads/2024/06/Cute-Simple-Girl-Pic-7.jpg.webp",
    text: "I love shopping at Fashion Needles because they offer a great mix of trendy and timeless pieces.  ",
    rating: 4,
  },
  {
    id: 7,
    name: "Siddharth N",
    role: "First-Time Buyer",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOY_Dx3HiD279gBDKbLKp9lCbu2-P7fWM9_h5YmIJONEGoiEFeKKcYpaFyntxuiJqnqo&usqp=CAU",
    text: "This was my first time shopping on Fashion Needles, and it was an exceptional experience.   ",
    rating: 5,
  },
  {
    id: 8,
    name: "Ananya P",
    role: "Fashion Blogger",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1i0XM_hPnRCmLdZUAFdpMxUl2PTP72FapIOwtA8a67b_1xVskMyhp5DtqqVoClCKz9M&usqp=CAU",
    text: "As a fashion blogger, I’m always on the lookout for the latest trends and styles.    ",
    rating: 4,
  },
  {
    id: 9,
    name: "Rahul J",
    role: "Tech-Savvy Shopper",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFQRwrX8bhG6rVLSNFVGC-iPZlOJS5qc3E3XSw2OQoHhjtEDoCzuKzOWfYQQu3iKyc7r4&usqp=CAU",
    text: "I’m very particular about the shopping platforms I use, and Fashion Needles has really impressed me.   ",
    rating: 5,
  },
  {
    id: 10,
    name: "Sneha L",
    role: "Loyal Customer",
    avatar: "https://photosly.net/wp-content/uploads/2024/02/hot-girl-pic5.jpg",
    text: "I’ve been shopping with Fashion Needles for over a year now, and every purchase has been a positive experience. ",
    rating: 4,
  },
];

export default function Testimonials() {
  const [allText, setAllText] = useState([]);
  useEffect(() => {
    fetchData();
  },[]);
  const fetchData = async () => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/testomonials-info`
      );
      if (res.status === 200) {
        console.log( res.data)
        setAllText(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className="py-4">
      <div className="mx-auto    px-2 sm:px-6 lg:px-8">
        <div className="mb-2 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
          <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">
            Testimonials
          </h2>

          <div className="flex items-center gap-8">
            <button
              id="slider-button-left"
              className="swiper-button-prev group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
              data-carousel-prev
            >
              {/* Left Arrow Icon */}
              <svg
                className="h-6 w-6 text-indigo-600 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              id="slider-button-right"
              className="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
              data-carousel-next
            >
              {/* Right Arrow Icon */}
              <svg
                className="h-6 w-6 text-indigo-600 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: "#slider-button-right",
            prevEl: "#slider-button-left",
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          style={{ margin: "auto" }}
          breakpoints={{
            640: {
              slidesPerView: 2, // Show 1 slide for screens smaller than 640px (e.g., mobile devices)
            },
            768: {
              slidesPerView: 2, // Show 2 slides for tablet-sized devices
            },
            1024: {
              slidesPerView: 3, // Show 3 slides for larger screens
            },
          }}
        >
          {allText?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-2 transition-all duration-500 w-full hover:border-indigo-600">
                <div className="flex items-center mb-2 gap-2 text-amber-500 transition-all duration-500 group-hover:text-indigo-600">
                  {/* Star Ratings */}
                  {[...Array(testimonial.noOfStar)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846C5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-8   transition-all duration-500 mb-2 group-hover:text-gray-800">
                  {testimonial.subject}
                </p>
                <p className="text-base text-gray-500 leading-8 overflow-hidden h-16  transition-all duration-500 mb-2 group-hover:text-gray-800">
                  {testimonial.description}
                </p>
                <div className="flex items-center gap-5">
                  <img
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    src={`${process.env.REACT_APP_API_IMAGE_URL}${testimonial.logo}`}
                    alt="avatar"
                  />
                  <div className="grid gap-1">
                    <h5 className="text-gray-900 font-medium transition-all duration-500 group-hover:text-indigo-600">
                      {testimonial.name}
                    </h5>
                    <span className="text-sm leading-6 text-gray-500">
                      Customer
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
