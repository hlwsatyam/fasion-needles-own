import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Testimonials() {
  const [allText, setAllText] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    console.log(process.env.REACT_APP_API_URL);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categoryInfo-info`
      );
      if (res.status === 200) {
        console.log(res.data);
        setAllText(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sm:py-4 pt-0 pb-4">
      <div className="flex justify-center my-2 items-center gap-x-1 text-sm sm:text-lg font-bold text-gray-700">
      <div className="w-20 border-t-2 border-gray-400"></div>
      <span className="uppercase tracking-wide px-1">Shop By Categories</span>
      <div className="w-20 leading border-t-2 border-gray-400"></div>
    </div>
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
       
        <div className="flex flex-wrap mt-4 justify-center items-center gap-x-[7px] sm:gap-8">
          {allText.map((item) => {
            return (
              <div
                onClick={() =>
                  (window.location.href = `/category/${item._id}/${item.name}/none`)
                }
                className="rounded-full sha h-20 shadow sm:w-32 sm:h-32  w-20 bg-white s"
              >
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                  alt={item.metatitle}
                  className="  mix-blend-multiply cursor-pointer rounded-full w-full h-full object-contain object-center mb-4"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
