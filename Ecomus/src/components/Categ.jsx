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
    <section className="py-4">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-xl mb-2 text-center font-bold text-gray-900 lg:text-left">
          Shop By Category
        </h2>
        <div className="flex flex-wrap mt-4 justify-center items-center gap-8">
          {allText.map((item) => {
            return (
              <div
                onClick={() =>
                  (window.location.href = `/category/${item._id}/${item.name}/none`)
                }
                className="rounded-full sha h-24 shadow   w-24 bg-white s"
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
