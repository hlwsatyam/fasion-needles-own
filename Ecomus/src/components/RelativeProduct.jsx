import React from "react";
import OwlCarousel from "react-owl-carousel";
import { useGetNewArrivalQuery } from "../store/api/bannerapi";
import Crouselitem from "./Crouselitem";

function RelativeProduct() {
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
         
          600: {
            items: 3,
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
    const {data:newarrivals,isLoading:NewArrivalloading} = useGetNewArrivalQuery();
  return (
    <section className="mt-2 section-big-mb-space ratio_square product">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pr-0">
            <div className="product-slide-5 product-m no-arrow">
              <OwlCarousel
                className="owl-theme"
                style={{ width: "100%", height: "100%" }}
                {...options2}
              >
                {newarrivals?.data.map((item) => (
                  <Crouselitem item={item} />
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RelativeProduct;
