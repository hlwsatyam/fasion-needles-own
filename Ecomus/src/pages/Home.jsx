import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
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

const Home = () => {
  const nvg = useNavigate();

  const [categories, setcategories] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const options = {
    items: 1,
    loop: true,
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
  const optionsforbrand = {
    items: 6,
    loop: true,
    autoplay: true,
    nav: false,
    responsiveClass: true,
    dots: false,
    responsive: {
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
        items: 2,
      },
      310: {
        items: 2,
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
    <div className="bg-light">
      <Header />
      <HelmetTag
        url={window.location.href}
        description={"Explore Fashion Needles for the latest in trendy and elegant collections. From timeless classics to modern must-haves, redefine your wardrobe today. Shop now for exclusive styles and unmatched quality."}
        keywords={"Trendy fashion for men, elegant clothing collections, stylish casual wear online, formal attire for men, sustainable fashion trends, latest men's streetwear, designer outfits for men, premium men's accessories, affordable men's clothing, best seasonal fashion deals, men's winter wardrobe essentials, cool summer outfits 2024, fashionable workwear, smart-casual style guide, men's fashion inspirations, luxury men's fashion brands, budget-friendly fashion ideas, men's capsule wardrobe basics, minimalist men's clothing, trending outfits this month, iconic men's wear collections, everyday versatile fashion, festival-ready outfits, fashion blog for men, best men's wardrobe upgrades, timeless men’s outfit ideas, street-style looks online, comfortable activewear, slim-fit clothing deals, weekend style essentials, latest outfit combinations, affordable denim collection, men's accessories trends, urban men’s fashion store, office-ready styles, tailored suits online, trending men’s jackets, casual layering ideas, seasonal must-have styles, urban casual looks, lightweight summer clothing, eco-friendly fashion choices, quick-dry activewear, affordable luxury fashion, monochrome outfit trends, classic vintage styles, elegant wedding suits, sporty casual ensembles, refined formal wear."}
        title={
         "Fashion Needles: Trendy & Elegant Styles for Every Occasion"
        }
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
                 
                <img loading="lazy"
                  onClick={() => {
                    window.location.href = item.banner_link;
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

      <div className="flex justify-center my-2 items-center gap-x-1 sm:text-lg text-sm  font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">Shop By Brand</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>

      {/* brand start */}
      <section className="brand-second mb-1 ">
        <div className="container-fluid">
          <div className="row brand-block">
            <div className="col-12">
              <div className="brand-slide12 no-arrow mb--5">
                <OwlCarousel
                  className="owl-theme"
                  style={{ width: "100%", height: "100%" }}
                  {...optionsforbrand}
                >
         
                  {brnaditem?.data.map((item, index) => (
                    <div
                    key={index*new Date().getTime()}
                      className="brand-box cursor-pointer h-[150px] !w-[150px]  rounded-full "
                      onClick={() => {
                        nvg(`/brand/${item.brand_name?.replace(/ /g, "-")}`, {
                          state: { brandId: item._id, name: item.brand_name },
                        });
                      }}
                    >
                      <img loading="lazy"

                        src={`${process.env.REACT_APP_API_IMAGE_URL}${item.brand_image}`}
                        alt={item.brand_name}
                        className=" w-full h-full object-contain "
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
      <section className="megastore-slide  collection-banner section-py-space b-g-white">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="row">
                {categories.map((category) => (
                  <div
                    className="col-md-4"
                    style={{ paddingBottom: 12 }}
                    key={category.id}
                  >
                    <div className="collection-banner-main banner-18 banner-style7 collection-color13 p-left text-center">
                      <div className="collection-img">
                        {/* Use the category image URL if available */}
                        <img
                          onClick={() => {
                            window.location.href = category.link;
                          }}
                          src={
                            category.image
                              ? `https://adminoneupv1.stackerbee.com${category.image}`
                              : "images/mega-store/slider/banner/placeholder.jpg"
                          }
                          className="img-fluid bg-img"
                          alt={category.category_name}
                        />
                      </div>
                      <div className="collection-banner-contain">
                        <div>
                          <h3>{category.category_name}</h3>
                          <h3>{category.title}</h3>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: category.description,
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = category.Link;
                            }}
                            //  onClick={()=>{transfer(category.category,category.breadcrumbs)} }
                            className="btn btn-rounded"
                            style={{ padding: "12px 24px" }}
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  {newarrivals?.data.map((item,index) => (
                    <Crouselitem item={item}   key={index*new Date().getTime()} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Categ />
      <LuxList />
      <div className="flex justify-center my-2 items-center gap-x-1 text-sm sm:text-lg font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">New Arrival</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>
      {/* best seller start  */}
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
                  {bestseller?.data.map((item,index) => (
                    <Crouselitem   key={index*new Date().getTime()} item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best seller end  */}
       
      {/* <ShopCard /> */}
      <div className="flex justify-center my-2 items-center gap-x-1 sm:text-lg text-sm font-bold text-gray-700">
        <div className="w-20 border-t-2 border-gray-400"></div>
        <span className="uppercase tracking-wide px-1">Feature Product</span>
        <div className="w-20 leading border-t-2 border-gray-400"></div>
      </div>
      {/* best feature start  */}
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
                  {featureitem?.data.map((item,index) => (
                    <Crouselitem key={index*new Date().getTime()} item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best feature end  */}
      <section className="sale-banenr banner-style2 design2">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {Banner?.data.map((item, index) =>
            item.banner_type == "Slider" ? (
              <div key={index} style={{ height: isMobile ? "200px" : "400px" }}>
                <img loading="lazy"
                  onClick={() => {
                    window.location.href = item.banner_link;
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
      {/* testomonial */}
      <Testomonials />
      {/* footer start */}
      <Footer />
      {/* footer end */}
    </div>
  );
};
export default Home;
