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
import ShopCard from "../components/ShopCard";
import Categ from "../components/Categ";

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
                  onClick={() => {
                    window.location.href = item.banner_link;
                  }}
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                  alt={`banner-${index}`}
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


    {/* brand start */}
    <section className="brand-second section-big-mb-space">
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
                      className="brand-box cursor-pointer h-[150px] !w-[150px]  rounded-full "
                      onClick={() => {
                        nvg(`/categoryforbrand/${item.brand_name}`);
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_IMAGE_URL}${item.brand_image}`}
                        alt=""
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
      <section className="megastore-slide collection-banner section-py-space b-g-white">
        <div className="container-fluid">
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

      <div className="title8">
        <h4 style={{ fontSize: "16px" }}> new arrivals</h4>
      </div>
      {/* new arrivals product tab start */}
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
                  {newarrivals?.data.map((item) => (
                    <Crouselitem item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Categ />

      <div className="title8">
        <h4 style={{ fontSize: "16px" }}>Best Sellers</h4>
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
                  {bestseller?.data.map((item) => (
                    <Crouselitem item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best seller end  */}
      {/* slider 1*/}
      <section className="  sale-banenr mt-2  banner-style2 design2 marginfromtop">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {caraouselData2.map((item, index) => (
            <div
              key={index}
              className="mobileorlaptop"
              // style={{ height: isMobile ? '300px' : '400px'}}
            >
              <img
                onClick={() => {
                  window.location.href = item.link;
                }}
                src={item.img}
                alt={`banner-${index}`}
                className="img-fluid rounded-2xl mainbanner bg-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "100% 100%",
                }}
              />
            </div>
          ))}
        </OwlCarousel>
      </section>
      {/* slider 1*/}
      {/* <ShopCard /> */}

      <div className=" mt-4 title8">
        <h4 style={{ fontSize: "16px" }}>Feature Product</h4>
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
                  {featureitem?.data.map((item) => (
                    <Crouselitem item={item} />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best feature end  */}

      <div className="title8">
        <h4 style={{ fontSize: "16px" }}>Promotion Slider</h4>
      </div>
      <section className="sale-banenr banner-style2 design2">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {Banner?.data.map((item, index) =>
            item.banner_type == "Slider" ? (
              <div key={index} style={{ height: isMobile ? "200px" : "400px" }}>
                <img
                  onClick={() => {
                    window.location.href = item.banner_link;
                  }}
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                  alt={`banner-${index}`}
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

      {/*title-start*/}
      <div className="title8 section-mb-space mt-4">
        <h4 style={{ fontSize: "16px" }}>Shop By Brands</h4>
      </div>
      {/*title-end*/}

  

      {/* slider 1*/}
      <section className="  sale-banenr mt-2  banner-style2 design2 marginfromtop">
        <OwlCarousel
          className="owl-theme"
          style={{ width: "100%", height: "100%" }}
          {...options}
        >
          {caraouselData1.map((item, index) => (
            <div
              key={index}
              className="mobileorlaptop"
              // style={{ height: isMobile ? '300px' : '400px'}}
            >
              <img
                onClick={() => {
                  window.location.href = item.link;
                }}
                src={item.img}
                alt={`banner-${index}`}
                className="img-fluid rounded-2xl mainbanner bg-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "100% 100%",
                }}
              />
            </div>
          ))}
        </OwlCarousel>
      </section>
      {/* slider 1*/}

      {/* testomonial */}
      <Testomonials />

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </div>
  );
};

export default Home;
