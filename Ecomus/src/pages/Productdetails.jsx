import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ModalImage from "react-modal-image";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

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
import PrevView from "../components/PrevViewPro";

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
  const { id, name } = useParams();
  const recentlydata = getrecetly();
  const dispatch = useDispatch();
  const checktoken = gettoken();
  const globalvariable = useSelector((state) => state);
  const [viewimg, setviewimg] = useState(null);
  const [qty, setqty] = useState(1);
  const [showoption, setshowoption] = useState(0);
  const [selectedSize, setselectedSize] = useState();
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

  useEffect(() => {
    let timer;
    let lightbox;
    // Set a timeout to delay the execution of the GLightbox initialization
    timer = setTimeout(() => {
      lightbox = GLightbox({
        selector: ".glightbox",
      });
       
    }, 200);  

    // Cleanup timeout when component unmounts or when viewimg changes
    return () => {
      lightbox?.destroy();
      clearTimeout(timer);
    };
  }, ); // Dependency array ensures the effect runs when viewimg changes

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
    p(id);
  }, [id]); // Ensure `id` is included in the dependency array for proper reactivity

  const p = async (id) => {
    try {
      const allId = localStorage.getItem("allId");
      const allIdArray = allId ? JSON.parse(allId) : []; // Parse the array or initialize as an empty array if null

      if (!allIdArray.includes(id)) {
        // Check if the id is not already present
        allIdArray.unshift(id); // Add the id to the array
        localStorage.setItem("allId", JSON.stringify(allIdArray)); // Save the updated array back to localStorage
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log any errors that might occur
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
    console.log(selectedSize);
    if (Data23[0]?.mutipleSize.length > 0) {
      if (selectedSize === undefined || selectedSize === null) {
        return toast("Please select size");
      }
    }
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
                          window.open(
                            `/category/${data?.parentcategory?.[0]?.name.replace(
                              / /g,
                              "-"
                            )}`,
                            "_blank"
                          );
                        }}
                        style={{ cursor: "pointer", fontSize: "12px" }}
                      >
                        {data?.parentcategory?.[0]?.name}
                      </p>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a
                        href={`/category/${data?.childcategory?.[0]?.name.replace(
                          / /g,
                          "-"
                        )}`}
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
                        href={`/category/${data?.child_sub_category?.[0]?.name.replace(
                          / /g,
                          "-"
                        )}`}
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
              </div>
            </div>
          </div>
        </div>
      </div>

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
                            <div className="sm:h-[600px]  h-[350px] w-full">
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
                              {/* <ZoomImgIff
                                img={
                                  viewimg == null
                                    ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                    : viewimg
                                }
                              /> */}

                              <a
                                href={
                                  viewimg == null
                                    ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                    : viewimg
                                }
                                className="glightbox block !h-full !w-full "
                              >
                                <img
                                  src={
                                    viewimg == null
                                      ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                      : viewimg
                                  }
                                  className="h-full w-auto object-cover"
                                  alt="Thumbnail"
                                />
                              </a>

                              {/* <ModalImage
                                small={
                                  viewimg == null
                                    ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                    : viewimg
                                }
                                large={
                                  viewimg == null
                                    ? `${process.env.REACT_APP_API_IMAGE_URL}${Data23?.[showoption]?.product_image1}`
                                    : viewimg
                                }
                                alt="Hello World!"
                                style={{
                                  width: "auto",
                                  borderRadius: "10px",
                                  margin: "auto",
                                  height: "100%",
                                }}
                                imageBackgroundColor="red"
                                height={"100%"}
                                width={"auto"}
                              /> */}
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
                            <h2 className="font-semibold">
                              {Data23?.[showoption]?.product_name}
                            </h2>

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
                              // href={`/brand/${data?.data?.brand?.replace(
                              //   / /g,
                              //   "-"
                              // )}`}
                              style={{ color: "#fff" }}
                            >
                              <img
                                className="!h-auto  !w-auto"
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
                                0
                                  ? ""
                                  : Data23?.[showoption]?.mrp_price !=
                                      Data23?.[showoption]?.selling_price && (
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
                                    {Data23?.[showoption]?.mrp_price !=
                                      Data23?.[showoption]?.selling_price &&
                                      `(${parseInt(
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

                          {Data23?.map(
                            (item, index) =>
                              Data23[0]?.mutipleSize.length > 0 && (
                                <div className="productdetailcontainer customwidth">
                                  <h6 className="product-title mt-2">
                                    Available Size
                                  </h6>
                                  <div className="size-box">
                                    <ul>
                                      {Data23[0]?.mutipleSize?.map(
                                        (str, index) => (
                                          <li
                                            onClick={() =>
                                              setselectedSize(index)
                                            }
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
                                              style={{
                                                color:
                                                  selectedSize == index
                                                    ? "white"
                                                    : "#333",
                                              }}
                                            >
                                              {" "}
                                              {str}
                                            </a>{" "}
                                          </li>
                                        )
                                      )}
                                      {/* <li style={{ background: "#059fe2" }}><a style={{ color: "white" }} href="javascript:void(0)">l</a></li> */}
                                    </ul>
                                  </div>
                                </div>
                              )
                          )}

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
      <RelativeProduct
        productId={id}
        parentCat={data?.parentcategory?.[0]}
        childCat={data?.childcategory?.[0]}
        subChildCat={data?.child_sub_category?.[0]}
      />
      <OverviewSection3 getComment={getComment} />
      <Features />
      <PrevView />
      {/* <Footer /> */}
    </>
  );
}

export default Productdetails;
