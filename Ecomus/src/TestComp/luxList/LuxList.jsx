import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OwlCarousel from "react-owl-carousel";
import Crouselitem from "../../components/Crouselitem";
function LuxList() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 5000)
  }, [ ]);

  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/luxProduct`
      );
      if (res.status === 200) {
        setAllProducts(res.data.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching products:", error);
    }
  };

 
  const options2 = {
    items: 5,
    loop: true,
    autoplay: true,
    nav: true,
    responsiveClass: true,
    dots: false,
    responsive: {
      1200: {
        items: 5,
        // stagePadding: 50,
      },
      920: {
        items: 4,
      },

      504: {
        items: 2,
      },
      300: {
        items: 2,
      },
      310: {
        items: 2,
      },
    },
  };
  return (
    <div className="mb-4">
      <Header />
      <div className="mt-2  ">
      <section className="section-big-mb-space ratio_square product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 pr-0">
              <div className="product-slide-5 product-m no-arrow">
                <OwlCarousel 
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...options2}
                >
                  {allProducts?.map((item) => (
                    <Crouselitem item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export default LuxList;

function Header() {
  return (
    <div className="flex justify-center items-center gap-x-1 sm:text-lg text-sm font-bold text-gray-700">
      <div className="w-20 border-t-2 border-gray-400"></div>
      <span className="uppercase tracking-wide px-1">Luxury Products</span>
      <div className="w-20 border-t-2 border-gray-400"></div>
    </div>
  );
}
