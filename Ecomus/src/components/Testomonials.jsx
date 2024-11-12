import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
 
import { Navigation, Pagination } from 'swiper/modules';

const testimonials = [
  {
    name: 'Jane D',
    role: 'CEO',
    avatar: 'https://pagedone.io/asset/uploads/1696229969.png',
    text: 'Pagedone is simply the best tool of investment in the market right now.',
    rating: 5,
  },
  {
    name: 'John S',
    role: 'CTO',
    avatar: 'https://via.placeholder.com/50',
    text: 'A game changer in our industry. Highly recommend to everyone.',
    rating: 4,
  },
  {
    name: 'Alice W',
    role: 'Designer',
    avatar: 'https://via.placeholder.com/50',
    text: 'I’ve been using this for a year now, and it has transformed my workflow.',
    rating: 4,
  },
  {
    name: 'Mark T',
    role: 'Product Manager',
    avatar: 'https://via.placeholder.com/50',
    text: 'Excellent service, would recommend to anyone looking for quality.',
    rating: 5,
  },
  {
    name: 'Emily B',
    role: 'Marketing Director',
    avatar: 'https://via.placeholder.com/50',
    text: 'The support team is outstanding, and the product is top-notch.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
          <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">Testimonials</h2>

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
            nextEl: '#slider-button-right',
            prevEl: '#slider-button-left',
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600">
                <div className="flex items-center mb-9 gap-2 text-amber-500 transition-all duration-500 group-hover:text-indigo-600">
                  {/* Star Ratings */}
                  {[...Array(testimonial.rating)].map((_, index) => (
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
                <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 mb-9 group-hover:text-gray-800">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-5">
                  <img
                    className="rounded-full object-cover"
                    src={testimonial.avatar}
                    alt="avatar"
                  />
                  <div className="grid gap-1">
                    <h5 className="text-gray-900 font-medium transition-all duration-500 group-hover:text-indigo-600">
                      {testimonial.name}
                    </h5>
                    <span className="text-sm leading-6 text-gray-500">
                      {testimonial.role}
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
