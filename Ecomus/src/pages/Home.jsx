import React, { useState } from "react";
import Header from "../components/Header/Header";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { gettoken } from "../Localstorage/Store";
import { useNavigate } from "react-router-dom";
import {
  useGetBannerQuery,
  useGetBestSellerQuery,
  useGetFeatureItemQuery,
  useGetNewArrivalQuery,
} from "../store/api/bannerapi";
import Crouselitem from "../components/Crouselitem";
import { useGetBrandQuery } from "../store/api/brandapi";
import Testomonials from "../components/Testomonials";
// import ShopCard from "../components/ShopCard";
import Categ from "../components/Categ";
import LuxList from "../TestComp/luxList/LuxList";
import HelmetTag from "../components/Header/Helmet";
import PrevViewPro from "../components/PrevViewPro";
import StaticPro1 from "../components/StaticProduct1";
import CatList from "./Category/CatList";
import CatPic from "./Category/CatPic";
 
const Home = () => {
  const nvg = useNavigate();

  const [categories, setcategories] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const options = {
    items: 1,
    loop: false,
    autoplay: true,
    nav: false,
    responsiveClass: true,
    dots: false,
    responsive: {
      1200: {
        items: 1,
      },
      920: {
        items: 1,
      },
      700: {
        items: 1,
      },
      600: {
        items: 1,
      },
      504: {
        items: 1,
      },
      300: {
        items: 1,
      },
      310: {
        items: 1,
      },
    },
  };
  const options2 = {
    items: 5,
    loop: false,
    autoplay: true,
    nav: true,
    responsiveClass: true,
    dots: false,
    responsive: {
      1700: {
        items: 6,
        // stagePadding: 50,
      },
      1500: {
        items: 5,
        // stagePadding: 50,
      },
      1200: {
        items: 4,
        // stagePadding: 50,
      },
      920: {
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
  const optionsforbrand = {
    items: 6,
    loop: false,
    autoplay: true,
    nav: false,
    responsiveClass: true,
    dots: false,
    responsive: {
      1500: {
        items: 7,
        // stagePadding: 50,
      },
      1200: {
        items: 6,
        // stagePadding: 50,
      },
      920: {
        items: 5,
      },
      700: {
        items: 4,
      },

      300: {
        items: 3,
      },
      310: {
        items: 3,
      },
    },
  };

  const caraouselData1 = [
    {
      img: "/images/cards/mens.png",
      title: "New Arrival",
      link: "/newarrival",
    },
    {
      img: "/images/cards/women.png",
      title: "Best Seller",
      link: "/bestseller",
    },
  ];
  const caraouselData2 = [
    {
      img: "/images/cards/fragment.png",
      title: "New Arrival",
      link: "/newarrival",
    },
  ];

  const { data: Banner, isLoading: Bannerloading } = useGetBannerQuery();
  const { data: newarrivals, isLoading: NewArrivalloading } =
    useGetNewArrivalQuery();
  const { data: bestseller, isLoading: bestsellerloading } =
    useGetBestSellerQuery();
  const { data: featureitem, isLoading: featureitemloading } =
    useGetFeatureItemQuery();
  const { data: brnaditem, isLoading: branditemloading } = useGetBrandQuery();

  return Bannerloading == true ||
    branditemloading == true ||
    NewArrivalloading == true ||
    bestsellerloading == true ||
    featureitemloading == true ? (
    <></>
  ) : (
    <div className=" overflow-hidden  bg-light">
      <Header />
      
      <HelmetTag
        url={window.location.href}
        description={
          "Explore Fashion Needles for the latest in trendy and elegant collections. From timeless classics to modern must-haves, redefine your wardrobe today. Shop now for exclusive styles and unmatched quality."
        }
        keywords={
          "Trendy fashion for men, elegant clothing collections, stylish casual wear online, formal attire for men, sustainable fashion trends, latest men's streetwear, designer outfits for men, premium men's accessories, affordable men's clothing, best seasonal fashion deals, men's winter wardrobe essentials, cool summer outfits 2024, fashionable workwear, smart-casual style guide, men's fashion inspirations, luxury men's fashion brands, budget-friendly fashion ideas, men's capsule wardrobe basics, minimalist men's clothing, trending outfits this month, iconic men's wear collections, everyday versatile fashion, festival-ready outfits, fashion blog for men, best men's wardrobe upgrades, timeless men’s outfit ideas, street-style looks online, comfortable activewear, slim-fit clothing deals, weekend style essentials, latest outfit combinations, affordable denim collection, men's accessories trends, urban men’s fashion store, office-ready styles, tailored suits online, trending men’s jackets, casual layering ideas, seasonal must-have styles, urban casual looks, lightweight summer clothing, eco-friendly fashion choices, quick-dry activewear, affordable luxury fashion, monochrome outfit trends, classic vintage styles, elegant wedding suits, sporty casual ensembles, refined formal wear."
        }
        title={"Fashion Needles: Trendy & Elegant Styles for Every Occasion"}
      />
      {/* home main banner section start */}
      <section className="  sale-banenr mt-2  banner-style2 design2 marginfromtop">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {Banner?.data.map((item, index) =>
            item.banner_type == "Banner" ? (
              <div
                key={index}
                className="mobileorlaptop"
                // style={{ height: isMobile ? '300px' : '400px'}}
              >
                <img
                  loading="lazy"
                  onClick={() => {
                    // window.location.href = item.banner_link;
                  }}
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                  alt={`${item?.banner_alt}`}
                  className="img-fluid   mainbanner bg-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "100% 100%",
                  }}
                />
              </div>
            ) : (
              ""
            )
          )}
        </OwlCarousel>
      </section>
      {/* home main banner section end */}

      <StaticPro1 />

      <div className="flex justify-center my-2 mt-4 items-center gap-x-1 sm:text-lg text-sm  font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">Shop By Brand</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>

      {/* brand start */}
      <section className="brand-second  ">
        <div className="container-fluid">
          <div className="row brand-block">
            <div className="col-12">
              <div className="brand-slide12 no-arrow ">
                <OwlCarousel
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...optionsforbrand}
                >
                  {brnaditem?.data.map((item, index) => (
                    <div
                      key={index * new Date().getTime()}
                      className=" bg-white flex items-center  sm:p-6 !p-3 justify-center   cursor-pointer h-[90px] w-[90px] sm:h-[130px] sm:!w-[130px]   "
                      onClick={() => {
                        // nvg(`/brand/${item.brand_name?.replace(/ /g, "-")}`, {
                        //   state: { brandId: item._id, name: item.brand_name },
                        // });
                      }}
                    >
                      <img
                        loading="lazy"
                        src={`${process.env.REACT_APP_API_IMAGE_URL}${item.brand_image}`}
                        alt={item.brand_name}
                        className="bg-white    object-contain "
                      />
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* brand start */}

      {/*home mine banner start*/}

      {/*home mine banner end*/}

      <div className="flex justify-center my-2 items-center gap-x-1 sm:text-lg   text-sm font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">New Arrival</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>
      {/* new arrivals product tab start */}
      <section className=" ratio_square product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 pr-0">
              <div className="product-slide-5 product-m no-arrow">
                <OwlCarousel
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...options2}
                >
                  {newarrivals?.data.map((item, index) => (
                    <Crouselitem
                      item={item}
                      key={index * new Date().getTime()}
                    />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Categ />
      <LuxList />

      <section className="sale-banenr banner-style2 design2">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {Banner?.data.map((item, index) =>
            item.banner_type == "Slider" ? (
              <div key={index} style={{ height: "auto" }}>
                <img
                  loading="lazy"
                  onClick={() => {
                    //  window.location.href = item.banner_link;
                  }}
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                  alt={`${item?.banner_alt}`}
                  className="img-fluid mainbanner bg-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "100% 100%",
                  }}
                />
              </div>
            ) : (
              ""
            )
          )}
        </OwlCarousel>
      </section>

      {/* <div className="flex justify-center my-2 items-center gap-x-1 text-sm sm:text-lg font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">New Arrival</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div> */}
      {/* best seller start  */}
      {/* <section className="section-big-mb-space ratio_square product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 pr-0">
              <div className="product-slide-5 product-m no-arrow">
                <OwlCarousel
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...options2}
                >
                  {bestseller?.data.map((item, index) => (
                    <Crouselitem
                      key={index * new Date().getTime()}
                      item={item}
                    />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* best seller end  */}

      <CatList />

      {/* <ShopCard /> */}
      {/* <div className="flex justify-center my-2 items-center gap-x-1 sm:text-lg text-sm font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">Feature Product</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div> */}
      {/* best feature start  */}
      {/* <section className="section-big-mb-space ratio_square product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 pr-0">
              <div className="product-slide-5 product-m no-arrow">
                <OwlCarousel
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...options2}
                >
                  {featureitem?.data.map((item, index) => (
                    <Crouselitem
                      key={index * new Date().getTime()}
                      item={item}
                    />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* best feature end  */}

      <div className="flex justify-center my-8 items-center gap-x-1 sm:text-lg   text-sm font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">Best Category</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>

      <CatPic />
      <PrevViewPro />

      {/* testomonial */}
      <Testomonials />
      {/* footer start */}
      {/* <Footer /> */}
      {/* footer end */}
    </div>
  );
};
export default Home;
