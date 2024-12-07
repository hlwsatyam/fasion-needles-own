import React, { useEffect, useState } from "react";
import axios from "axios";
import Crouselitem from "./Crouselitem";

function StaticPro1() {
  const [allProducts, setAllProducts] = useState([]);
  const [count, setCount] = useState(5);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/list1`, { count });
      if (res.status === 200) {
        setAllProducts(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const options2 = {
    items: 5,
    loop: false, // Disable looping
    autoplay: false, // Disable autoplay
    nav: false, // Disable navigation arrows
    responsiveClass: true,
    dots: false, // Disable dots
    responsive: {
      1700: { items: 6 },
      1500: { items: 5 },
      1200: { items: 4 },
      920: { items: 3 },
      504: { items: 2 },
      300: { items: 2 },
      310: { items: 2 },
    },
  };

  return (
    allProducts.length > 0 && (
      <div className="mt-16 mb-4">
        {/* <Header title="Luxury Products" /> */}
        <div className="mt-2">
          <section className="section-big-mb-space ratio_square product">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 pr-0">
                  {/* Render products without scrolling */}
                  <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(${
                          window.innerWidth <= 590 ? 145 : 235
                        }px, 1fr))`,
                      }}
                  >
                    {allProducts.map((item) => (
                      <Crouselitem key={item._id.toString()} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                {/* <button
                  onClick={() => setCount(count + 8)} // Load more products
                  className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  View More
                </button> */}




                {/* /* From Uiverse.io by nathAd17 */   }
<button
  onClick={() => setCount(count + 5)} 
  class="flex justify-center gap-2 items-center mx-auto shadow-xl text-sm bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-full group"
>
 Load More
  <svg
    class="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
    viewBox="0 0 16 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      class="fill-gray-800 group-hover:fill-gray-800"
    ></path>
  </svg>
</button>








              </div>
            </div>
          </section>
        </div>
      </div>
    )
  );
}

function Header({ title }) {
  return (
    <div className="flex justify-center items-center gap-x-1 sm:text-lg text-sm font-bold text-gray-700">
      <div className="w-20 border-t-2 border-gray-400"></div>
      <span className="uppercase tracking-wide px-1">
        {title || "Luxury Products"}
      </span>
      <div className="w-20 border-t-2 border-gray-400"></div>
    </div>
  );
}

export default StaticPro1;
