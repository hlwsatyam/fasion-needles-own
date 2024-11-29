import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";

import ReactImageMagnify from "react-image-magnify";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaHandPointRight,
  FaMap,
  FaLocationDot,
} from "react-icons/fa6";
import { getrecetly, gettoken, recentlystore } from "../Localstorage/Store";
import { useGetSingleProductQuery } from "../store/api/productapi";
import { usePostCartItemMutation } from "../store/api/cartapi";
import {
  usePostDeleteWishlistMutation,
  usePostWishlistItemMutation,
} from "../store/api/wishlistapi";
import { useDispatch, useSelector } from "react-redux";
import { addwishlist } from "../store/state/wishlist";
import RelativeProduct from "../components/RelativeProduct";
import OverviewSection3 from "../components/CostomerRev";
import SharePage from "../components/ShareComp";
import InfoList from "../components/InfoPage";
import { useGetCommentMutation } from "../store/api/commentapi";
import { toast } from "react-toastify";
import HelmetTag from "../components/Header/Helmet";
import ZoomImgIff from "../components/ZoomImgEff";
import Features from "../components/Testomonials";

const options5 = {
  items: 1,
  loop: false,
  autoplay: true,
  nav: true,
  responsiveClass: true,
  dots: false,
  responsive: {
    1200: {
      items: 5,
      loop: false,
      // stagePadding: 50,
    },
    920: {
      items: 4,
      loop: false,
    },
    700: {
      items: 3,
      loop: false,
    },
    600: {
      items: 3,
      loop: false,
    },
    504: {
      items: 2,
      loop: false,
    },
    300: {
      items: 2,
      loop: false,
    },
    310: {
      items: 1,
      loop: false,
    },
  },
};
function Productdetails() {
  const location = useLocation();
  const nvg = useNavigate();
  const { id } = useParams();
  const recentlydata = getrecetly();
  const dispatch = useDispatch();
  const checktoken = gettoken();
  const globalvariable = useSelector((state) => state);
  const [viewimg, setviewimg] = useState(null);
  const [qty, setqty] = useState(1);
  const [showoption, setshowoption] = useState(0);
  const [selectedSize, setselectedSize] = useState(0);
  const [loading, setloading] = useState(true);
  const [delto, setdelto] = useState("");
  const [Data23, setData] = useState([]);
  const [delresponse, setdelresponse] = useState({ status: false, msg: "" });
  const { data, isLoading, refetch } = useGetSingleProductQuery(id);
  const [addincart] = usePostCartItemMutation();
  const [getCommentApi] = useGetCommentMutation();
  const [addtowishlistapi] = usePostWishlistItemMutation();
  const [removetowishlistapi] = usePostDeleteWishlistMutation();

  const [getComment, setGetComment] = useState(null);
  const fetchComment = async (e) => {
    try {
      const response = await axios.post(
        ` ${process.env.REACT_APP_API_URL}/user/comment/getcomment`,
        {
          product_id: id,
        }
      );
      if (response.status === 200) {
        setGetComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComment();
    }
  }, []);

  const devto = () => {
    fetchData();
  };
  const redirectfun = (linkpage) => {
    nvg(linkpage);
  };

  const profilepage = (val) => {
    nvg("/profile", { state: { id: val } });
  };

  const incrementcart = () => {
    setqty(qty + 1);
  };
  const decrementcart = () => {
    if (qty > 1) {
      setqty(qty - 1);
    }
  };

  const Addtowishlist = async () => {
    if (checktoken) {
      const wishlist_value = {
        product_name: Data23[showoption].product_name,
        product_id: Data23[showoption].product_id
          ? null
          : Data23[showoption]._id,
        item_or_variant: Data23[showoption].product_id ? "variant" : "item",
        product_variant_id: Data23[showoption].product_id
          ? Data23[showoption]._id
          : null,
      };
      const response = await addtowishlistapi(wishlist_value);
      if (response.data.status == "successfully") {
        dispatch(addwishlist(globalvariable.wishlist + 1));

        refetch();
      }
    } else {
      nvg("/login");
    }
  };
  const Removetowishlist = async () => {
    const wishlist_value = {
      product_id: Data23[showoption].product_id ? null : Data23[showoption]._id,
      item_or_variant: Data23[showoption].product_id ? "variant" : "item",
      product_variant_id: Data23[showoption].product_id
        ? Data23[showoption]._id
        : null,
    };
    const response = await removetowishlistapi(wishlist_value);
    if (response.data.status == "successfully") {
      dispatch(addwishlist(globalvariable.wishlist - 1));
      refetch();
    }
  };

  // add to cart start here
  const addtocartfun = async () => {
    try {
      const cart_value = {
        name: Data23[showoption].product_name,
        id: Data23[showoption].product_id ? null : Data23[showoption]._id,
        quantity: qty,
        price: Data23[showoption].selling_price,
        image: Data23[showoption].product_image1,
        size: Data23[0].mutipleSize[selectedSize],
        brand: Data23[showoption].brand,
        rating: 5,
      };

      // Check if there is an existing cart in localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the item already exists in the cart by comparing the `id`
      const itemIndex = existingCart.findIndex(
        (item) => item.id === cart_value.id
      );

      if (itemIndex !== -1) {
        // Item already exists, update the quantity
        existingCart[itemIndex].quantityy += qty;
        toast(`Item quantity updated successfully`);
      } else {
        // Item doesn't exist, add it to the cart
        existingCart.push(cart_value);
        toast(`Item added to cart successfully`);
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } catch (error) {
      console.log(error.message);
    }
  };

  let ispresent = false;
  useEffect(() => {
    setloading(true);
    if (isLoading == false) {
      const newdata1 = [data?.data, ...data.productvariant];

      const newdata = newdata1.map((item) => ({
        ...item,
        weightandtype: `${item.weight} ${item.weight_type}`, // Replace 'defaultValue' with your desired value
      }));

      setData(newdata);
      setloading(false);
    }
  }, [data, isLoading]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/delAvailable-info/${delto}`
      );
      if (res.status === 200) {
        toast(res?.data?.message);
      } else {
        toast(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  const transfer = () => {
    nvg("/category", {
      state: {
        id: location.state?.categoryid,
        pagename: location.state?.pagename,
      },
    });
    window.location.reload();
  };

  const transfer3 = (productid) => {
    nvg("/productdetails", {
      state: {
        id: productid,
        categoryid: location.state?.categoryid,
        pagename: location.state?.pagename,
      },
    });
    window.location.reload();
  };
  return isLoading == true ? (
    ""
  ) : (
    <>
      <Header />
      <HelmetTag
        url={window.location.href}
        description={data?.data?.sort_description}
        keywords={data?.data?.meta_keywords}
        title={
          Data23?.[showoption]?.product_name +
          " | " +
          data?.parentcategory?.[0]?.name +
          " | " +
          data?.childcategory?.[0]?.name
        }
      />
      {/* breadcrumb start */}
      <div className="breadcrumb-main marginfromtop">
        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div
                className="breadcrumb-contain m-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "5px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {/* <h2>product</h2> */}
                  <ul>
                    <li>
                      <a href="/">home</a>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <p
                        onClick={() => {
                          transfer();
                        }}
                        style={{ cursor: "pointer", fontSize: "12px" }}
                      >
                        {data?.parentcategory?.[0]?.name}
                      </p>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        style={{
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {data?.childcategory?.[0]?.name}
                      </a>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        style={{
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {data?.child_sub_category?.[0]?.name}
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="header-contain"
                  style={{ padding: "8px 0px 0px 0px" }}
                >
                  <div
                    className="icon-block  twoicon"
                    style={{ width: "100%", display: "none" }}
                  >
                    <ul
                      className="theme-color"
                      style={{
                        width: "100%",
                        background: "",
                        justifyContent: "space-around",
                        paddingRight: "10px",
                      }}
                    >
                      <li
                        className=" icon-md-block"
                        onClick={() => redirectfun("/")}
                      ></li>
                      <li></li>
                      <li
                        className="mobile-setting "
                        onClick={() => redirectfun("/order-history")}
                      ></li>
                      <li
                        className="mobile-wishlist item-count icon-desk-none"
                        onClick={() => redirectfun("/wishlist")}
                      >
                        <img
                          src="/images/mega-store/brand/heart.png"
                          className="newwidthpro hellopooja"
                          alt="heart"
                        />
                        <label
                          htmlFor=""
                          style={{ fontSize: "10px", margin: "0px" }}
                        >
                          Wishlist
                        </label>
                        <div
                          className="item-count-contain inverce"
                          style={{ top: "-4px", left: "9px" }}
                        >
                          {" "}
                          1{" "}
                        </div>
                      </li>
                      <li
                        className="mobile-cart
                      item-count"
                        onClick={() => {
                          redirectfun("/cart");
                        }}
                      >
                        <img
                          src="/images/mega-store/brand/shopping-cart.png"
                          className="newwidthpro  hellopooja"
                          alt="cart"
                        />
                        <label
                          htmlFor=""
                          style={{ fontSize: "10px", margin: "0px" }}
                        >
                          Cart
                        </label>

                        <div
                          className="item-count-contain inverce"
                          style={{ top: "-4px", left: "9px" }}
                        >
                          {" "}
                          {2}{" "}
                        </div>
                        {/* <div className="item-count-contain inverce" style={{top:'-4px',left:'9px'}}> {Cartnumber} </div> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb End */}
      {/* section start */}
      <section
        className="section-big-pt-space b-g-light"
        style={{ background: "white" }}
      >
        <div className="collection-wrapper">
          <div className="custom-container">
            <div className="">
              <div className="col-lg-12 col-sm-12 col-xs-12">
                <div className="container-fluid">
                  {/* <div className="row">
                      <div className="col-xl-12">
                      </div>
                    </div> */}
                  <div
                    className="row"
                    style={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <div className="col-lg-6 makestk">
                      <div className="row">
                        <div className="col-md-3 col-3 superpadding3">
                          <div
                            class="container-fluid px-lg-4 px-md-3 px-2"
                            style={{ paddingLeft: "0px", paddingRight: "0px" }}
                          >
                            <div
                              style={{ padding: "0px 0px 5px 0px" }}
                              className="shirt"
                            >
                              <img
                                src={`${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`}
                                onClick={() => {
                                  setviewimg(
                                    `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                  );
                                }}
                                alt
                                style={{ aspectRatio: "1/1" }}
                                className="img-fluid  image_zoom_cls-0"
                              />
                            </div>
                            {Data23?.[showoption]?.product_image2 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt2"
                              >
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image2}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image2}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-1"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {Data23?.[showoption]?.product_image3 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt3"
                              >
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image3}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image3}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-2"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            {Data23?.[showoption]?.product_image4 ? (
                              <div
                                style={{ padding: "5px 0px" }}
                                className="shirt4"
                              >
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image4}`}
                                  onClick={() => {
                                    setviewimg(
                                      `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image4}`
                                    );
                                  }}
                                  alt
                                  style={{ aspectRatio: "1/1" }}
                                  className="img-fluid  image_zoom_cls-3"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-md-9 col-9">
                          <div className="product-slick ">
                            <div className="sm:h-[600px]  h-[400px] w-full">
                              {/* <ReactImageMagnify
                          
                                {...{
                                  smallImage: {
                                    alt: "Wristwatch by Versace",
                                    isFluidWidth: true,
                                    src:
                                      viewimg == null
                                        ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                        : viewimg,
                                    width: 1000,
                                    height: 1000,
                                  },
                                  largeImage: {
                                    src:
                                      viewimg == null
                                        ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                        : viewimg,
                                    width: 836,
                                    height: 1100,
                                  },
                                  enlargedImagePosition: "over",

                                 
                                }}
                              /> */}

                              <ZoomImgIff
                                img={
                                  viewimg == null
                                    ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                    : viewimg
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 rtl-text p-0">
                      <div
                        className="product-right "
                        style={{
                          boxShadow: "0px 14px 40px 0px rgba(0, 0, 0, 0.12)",
                          borderRadius: "10px",
                          padding: "20px 17px",
                        }}
                      >
                        <div className=" flex items-center justify-between">
                          <div>
                            <h2>{Data23?.[showoption]?.product_name}</h2>

                            <div className=" flex items-center mt-2 justify-between">
                              <div className="flex border w-fit px-2 py-1 cursor-pointer items-center gap-x-2">
                                <span className="flex gap-x-1 items-center ">
                                  <span>5</span>
                                  <FaStar className="mb-1 text-blue-400" />
                                </span>
                                <span className="border-l-2 border-gray-300 pl-2">
                                  {getComment?.length || 0} Ratings
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <a
                              href="javascript:void(0)"
                              style={{ color: "#fff" }}
                            >
                              <img
                                className="sm:h-20 sm:w-26 h-12 w-18"
                                src={`${process.env.REACT_APP_API_IMAGE_URL}${data?.brandLogo}`}
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                        <div
                          id="selectSize"
                          className="pro-group addeffect-section product-description border-product d-flex"
                          style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="revieu-box">
                            <ul className="pro-price">
                              <li
                                style={{
                                  color: "#059fe2",
                                  fontWeight: "700",
                                  fontSize: "18px",
                                }}
                              >
                                {/* ₹{Data23?.[showoption]?.selling_price} */}₹
                                {Data23?.[showoption]?.selling_price}{" "}
                                {Data23?.[showoption]?.stock_record?.discount ==
                                0 ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    MRP{" "}
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        margin: "0px",
                                        color: "#c1c1c1",
                                        lineHeight: "20px",
                                        textDecoration: "line-through",
                                        paddingLeft: "0px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      ₹{Data23?.[showoption]?.mrp_price}
                                    </span>
                                  </>
                                )}
                                {Data23?.[showoption]?.stock_record?.discount ==
                                0 ? (
                                  ""
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      color: "#059fe2",
                                      margin: "0px",
                                      lineHeight: "20px",
                                      paddingLeft: "1px",
                                      textDecoration: "none",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {`(${parseInt(
                                      ((Data23?.[showoption]?.mrp_price -
                                        Data23?.[showoption]?.selling_price) /
                                        Data23?.[showoption]?.mrp_price) *
                                        100
                                    )}%off)`}
                                  </span>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="w-full text-sm font-bold text-blue-400 ">
                            inclusive of all taxes
                          </div>

                          {Data23.map((item, index) => (
                            <div
                              className="productdetailcontainer   customwidth"
                              style={{
                                display:
                                  index == 0 &&
                                  item.color != "" &&
                                  item.color != undefined &&
                                  item.color != undefined
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <h6 className="product-title">Color</h6>
                              <div className="color-selector inline">
                                <ul>
                                  {Data23.map((item, index) => (
                                    <li>
                                      <div
                                        className="color-4"
                                        style={{
                                          display: "block",
                                          background: `${item.color}`,
                                          padding:
                                            showoption == index
                                              ? `19px 19px`
                                              : `15px 15px`,
                                        }}
                                        onClick={() => {
                                          setshowoption(index);
                                        }}
                                      ></div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                          {console.log(Data23)}
                          {Data23.map((item, index) => (
                            <div className="productdetailcontainer customwidth">
                              <h6 className="product-title mt-2">
                                Available Size
                              </h6>
                              <div className="size-box">
                                <ul>
                                  {Data23[0]?.mutipleSize?.map((str, index) => (
                                    <li
                                      onClick={() => setselectedSize(index)}
                                      style={{
                                        padding: "4px",
                                        background:
                                          selectedSize == index
                                            ? "#059fe2"
                                            : "#fff",
                                      }}
                                    >
                                      {" "}
                                      <a
                                        href="javascript:void(0)"
                                        style={{
                                          color:
                                            selectedSize == index
                                              ? "white"
                                              : "#333",
                                        }}
                                        onClick={() => {}}
                                      >
                                        {" "}
                                        {str}
                                      </a>{" "}
                                    </li>
                                  ))}
                                  {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                </ul>
                              </div>
                            </div>
                          ))}

                          {Data23.map((item, index) => (
                            <div
                              className="productdetailcontainer customwidth"
                              style={{
                                display:
                                  index == 0 &&
                                  item.weight != "" &&
                                  item.weight != undefined &&
                                  item.weight != undefined &&
                                  item.weight != 0
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <h6 className="product-title mt-2">
                                Available Weight
                              </h6>
                              <div className="size-box">
                                <ul>
                                  {Data23.map((item, index) => (
                                    <li
                                      style={{
                                        background:
                                          showoption == index
                                            ? "#059fe2"
                                            : "#fff",
                                        width: "fit-content",
                                        display: "inline-block ",
                                        padding: "0px 3px",
                                      }}
                                    >
                                      <a
                                        href="javascript:void(0)"
                                        style={{
                                          color:
                                            showoption == index
                                              ? "white"
                                              : "#333",
                                        }}
                                        onClick={() => {
                                          setshowoption(index);
                                        }}
                                      >
                                        {item.weightandtype}
                                      </a>
                                    </li>
                                  ))}
                                  {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                </ul>
                              </div>
                            </div>
                          ))}

                          <div className="productdetailcontainer customwidth">
                            <h6 className="product-title mt-3">quantity</h6>
                            <div
                              className="qty-box gap"
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "",
                              }}
                            >
                              <div className="input-group">
                                <button
                                  type="button"
                                  onClick={() => {
                                    incrementcart();
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-plus"
                                    style={{ color: "#059fe2" }}
                                  />
                                </button>
                                <input
                                  className="qty-adj form-control"
                                  type="number"
                                  style={{ width: "44px" }}
                                  readOnly
                                  value={qty}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    decrementcart();
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-minus"
                                    style={{ color: "#059fe2" }}
                                  />
                                </button>
                              </div>
                              {/* <span style={{display: 'flex',}}> */}
                              {/* <h6 className="product-title"></h6> */}

                              {/* </span> */}
                            </div>
                          </div>
                          <div className="productdetailcontainer customwidth">
                            <div className="product-buttons ">
                              <a
                                onClick={() => {
                                  addtocartfun();
                                }}
                                href="javascript:void(0) "
                                style={{
                                  background: "#059fe2",
                                  padding: "9px 9px",
                                }}
                                id="cartEffect"
                                className="btn cart-btn btn-normal tooltip-top"
                                data-tippy-content="Add to cart"
                              >
                                <i className="fa fa-shopping-cart" />
                                add to cart
                              </a>

                              <a
                                onClick={() => {
                                  Data23?.[showoption]?.wishlist_status == true
                                    ? Removetowishlist()
                                    : Addtowishlist();
                                }}
                                href="javascript:void(0) "
                                style={{
                                  background: "#059fe2",
                                  padding: "9px 9px",
                                }}
                                id="cartEffect"
                                className="btn cart-btn btn-normal tooltip-top"
                                data-tippy-content="Add to cart"
                              >
                                {Data23?.[showoption]?.wishlist_status ==
                                true ? (
                                  <FaHeart className="fa mb-1 fa-shopping-cart" />
                                ) : (
                                  <FaRegHeart className="fa mb-1 fa-shopping-cart" />
                                )}
                                Wishlist
                              </a>
                            </div>
                            {/* </span> */}
                          </div>

                          <div
                            className="productdetailcontainer w-lg-50  border-t-2  w-full d-flex"
                            style={{
                              marginTop: "10px",
                            }}
                          >
                            <div className="pro-group mt-4 ">
                              <h6 className="product-title flex items-center endlinetext">
                                Deliver To{" "}
                                <FaLocationDot color="blue " size={22} />
                              </h6>
                              <div className="delivery-detail">
                                <div className="delivery-detail-contian">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      className="form-control makeitsmall"
                                      minLength={6}
                                      maxLength={6}
                                      value={delto}
                                      style={{ padding: "0px 0.75rem" }}
                                      onChange={(e) => {
                                        setdelto(e.target.value);
                                      }}
                                      placeholder="Enter Pincode for delivery"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    style={{
                                      background: "#CFCFCF",
                                      borderRadius: "3px",
                                      color: "black",
                                      fontWeight: "700",
                                      padding: "8px 15px",
                                      fontSize: "13px",
                                    }}
                                    onClick={() => {
                                      devto();
                                    }}
                                    className="btn btn-md "
                                  >
                                    Check
                                  </button>
                                </div>
                                {/* <p>Delivery by 17 Oct, Tuesday |  <li style={{ color: '#059fe2', fontWeight: "700", fontSize: "16px" }}><span style={{color: '#CFCFCF'}}>Free</span>  ₹40</li></p> */}
                                <p style={{ color: "red" }}>
                                  {delresponse["status"] == true
                                    ? delresponse["msg"]
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <SharePage />

                          <div>
                            <ul className="text-gray-600  list-decimal  text-sm flex flex-col">
                              <li className="flex items-center gap-x-2">
                                <FaHandPointRight /> 100% Original Products
                              </li>
                              <li className="flex items-center gap-x-2">
                                <FaHandPointRight /> Pay on delivery might be
                                available
                              </li>
                              <li className="flex items-center gap-x-2">
                                <FaHandPointRight /> Easy 7 days exchanges
                              </li>
                            </ul>
                          </div>

                          <div className="productdetailcontainer mt-3 w-100">
                            <h5 className="product-title ">Description</h5>
                            <p style={{ color: "#8F9091", fontSize: "12px" }}>
                              {Data23?.[showoption]?.sort_description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="product-right "
                        style={{
                          marginTop: "20px",
                          boxShadow: "0px 14px 40px 0px rgba(0, 0, 0, 0.12)",
                          borderRadius: "10px",
                          padding: "20px 17px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          id="selectSize"
                          className="pro-group addeffect-section product-description border-product d-flex"
                          style={{
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="productdetailcontainer w-100">
                            <h5 className="product-title ">Product Details</h5>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: Data23?.[showoption]?.description,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InfoList />
      <RelativeProduct productId={id}  parentCat= {data?.parentcategory?.[0]} childCat={data?.childcategory?.[0]} subChildCat={data?.child_sub_category?.[0]}   />
      <OverviewSection3 getComment={getComment} />
      <Features />
      <Footer />
    </>
  );
}

export default Productdetails;
 