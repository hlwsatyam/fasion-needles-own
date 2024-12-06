import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MobileSubcategory from "../components/Header/MobileSubcategory ";
import ReactPaginate from "react-paginate";

import { useGetItemByBrandQuery } from "../store/api/brandapi";
import Footer from "../components/Footer";
import { useGetProductByCategoryQuery } from "../store/api/productapi";
import { Shop } from "@mui/icons-material";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import ShortNofProFil from "../components/ShortNofProFil";
const CatFilter = () => {
  const { name } = useParams();
  const [shortName, setShortName] = useState({
    Category: [],
    Brand: [],
    childCategory: [],
    subChildCategory: [],
    Color: [],
    Size: [],
    Price: [],
    searchText: "",
    shortBy: "lowToHigh",
    productPerPage: 12,
    gender: "all",
  });
  const [isFilterShown, setIsFilterShown] = useState({
    Category: true,
    Brand: true,
    childCategory: true,
    subChildCategory: true,
    Color: true,
    Size: true,
  });
  const debounceTimeout = useRef(null);
  const nvg = useNavigate();
  const [brand, setbrand] = useState(true);
  const [categoriesbtn, setcategoriesbtn] = useState(true);
  const [filter, setfilter] = useState(false);
  const [currentwdith, setcurrentwdith] = useState(window.innerWidth);
  const [showsidebar, setshowsidebar] = useState(false);
  const [sortby, setsortby] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const transfer = (productid, pname) => {
    nvg("/productdetails", {
      state: {
        id: productid,
        pname: pname,
      },
    });
    window.location.reload();
  };
  // const { data: itembybrand, isLoading: brandloading } = useGetItemByBrandQuery(
  //   name.replace(/-/g, " ")
  // );

  const {
    data: itembybrand,
    isLoading: brandloading,
    refetch,
  } = useGetProductByCategoryQuery({
    name: name.replace(/-/g, " "), // Replace dashes with spaces in the name
    filter: shortName, // Pass the filter directly
  });
  
  useEffect(() => {
    refetch();
  }, [shortName]);

  const [categories, setCategories] = useState([]);
  const [totalrecords, settotalrecords] = useState(0);
  const [filterList, setFilterList] = useState(null);
  const filterdata = async (pagenumber) => {
    try {
      setloading(true);
      let urlapi = `${
        process.env.REACT_APP_API_URL
      }/product/ByCategory/${name?.replace(/-/g, " ")}/?offset=${pagenumber}`;
      const response = await axios.get(urlapi);

      if (response.status === 200) {
        setFilterList(response.data);
      }

      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    filterdata(0);
  }, [name]);

  const pageCount = Math.ceil(totalrecords / 12);
  
  const handleFilterShown = (name, condition) => {
    setIsFilterShown((prev) => ({
      ...prev,
      [name]: condition === "+" ? false : true,
    }));
  };

  return brandloading == true ? (
    <></>
  ) : (
    <>
      <Header />
      <div className="category-header7" style={{ zIndex: 9991 }}>
        <div className="container-fluid">
          <div className="row !w-full ">
            <div className="col-12">
              <div className="category-contain">
                <div className="category-left showandhide ">
                  <div className="header-category">
                    <a className="category-toggle">
                      <i className="fa fa-bars" />
                      pages
                    </a>
                    <ul
                      id="main-menu"
                      className={
                        showsidebar == true
                          ? "collapse-category show sm pixelstrap sm-horizontal open"
                          : "collapse-category show sm pixelstrap sm-horizontal"
                      }
                    >
                      <li
                        className="back-btn"
                        onClick={() => setshowsidebar(false)}
                      >
                        <i className="fa fa-angle-left" /> back
                      </li>

                      {/* {categories.map((item, index) => (
                        <MobileSubcategory value={item} />
                      ))} */}

                      <ShortNofProFil
                        shortName={shortName}
                        setShortName={setShortName}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="searchbar-input ajax-search the-basics">
          <div className="input-group">
            <span className="input-group-text">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="28.931px"
                height="28.932px"
                viewBox="0 0 28.931 28.932"
                style={{ enableBackground: "new 0 0 28.931 28.932" }}
                xmlSpace="preserve"
              >
                <g>
                  <path d="M28.344,25.518l-6.114-6.115c1.486-2.067,2.303-4.537,2.303-7.137c0-3.275-1.275-6.355-3.594-8.672C18.625,1.278,15.543,0,12.266,0C8.99,0,5.909,1.275,3.593,3.594C1.277,5.909,0.001,8.99,0.001,12.266c0,3.276,1.275,6.356,3.592,8.674c2.316,2.316,5.396,3.594,8.673,3.594c2.599,0,5.067-0.813,7.136-2.303l6.114,6.115c0.392,0.391,0.902,0.586,1.414,0.586c0.513,0,1.024-0.195,1.414-0.586C29.125,27.564,29.125,26.299,28.344,25.518z M6.422,18.111c-1.562-1.562-2.421-3.639-2.421-5.846S4.86,7.983,6.422,6.421c1.561-1.562,3.636-2.422,5.844-2.422s4.284,0.86,5.845,2.422c1.562,1.562,2.422,3.638,2.422,5.845s-0.859,4.283-2.422,5.846c-1.562,1.562-3.636,2.42-5.845,2.42S7.981,19.672,6.422,18.111z"></path>
                </g>
              </svg>
            </span>
            <input
              type="search"
              className="form-control typeahead"
              placeholder="Search a Product"
            />
            <span className="input-group-text close-searchbar">
              <svg
                viewBox="0 0 329.26933 329"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* breadcrumb start */}
      <div className="breadcrumb-main marginfromtop breadcrumbpadding">
        <div className="container m-0">
          <div className="row !w-full">
            <div className="col">
              <div className="breadcrumb-contain">
                <div>
                  <ul>
                    <li>
                      <a href="/">home</a>
                    </li>
                    {/* <li style={{fontSize:"12px"}}>&gt;</li>
                <li><a href="javascript:void(0)">Category</a></li> */}
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a href="javascript:void(0)">
                        {name.toLocaleLowerCase()}
                        {/* {location.state?.pagename} */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb End */}
      {/* section start */}
      <section
        className="section-big-pt-space ratio_asos b-g-light"
        style={{ padding: "0px" }}
      >
        <div className="collection-wrapper" style={{ background: "#f9f9f9" }}>
          <div className="custom-container  mb-7 ">
            <div
              className="row  !p-0 !m-0   !w-full"
              style={{ background: "#f9f9f9" }}
            >
              <div
                className="col-sm-2 collection-filter category-page-side"
                style={{
                  zIndex: currentwdith < 990 ? 9991 : 1,
                  left: "-15px",
                  display:
                    currentwdith < 990
                      ? filter == true
                        ? "block"
                        : "none"
                      : "block",
                  padding: "10px",
                }}
              >
                {/* side-bar colleps block stat */}
                <div className="collection-filter-block creative-card creative-inner category-side">
                  {/* brand filter start */}
                  <div
                    className="collection-mobile-back"
                    onClick={() => {
                      setfilter(!filter);
                    }}
                  >
                    <span className="filter-back">
                      <i className="fa fa-angle-left" aria-hidden="true" /> back
                    </span>
                  </div>

                  <div className="collection-collapse-block ">
                    <h3
                      className={
                        "collapse-block-title border-b-2 pb-3 flex items-center justify-between dynamic-after2"
                      }
                    >
                      CATEGORIES
                      {isFilterShown.Category ? (
                        <FaMinus
                          onClick={() => handleFilterShown("Category", "+")}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => handleFilterShown("Category", "-")}
                        />
                      )}
                    </h3>
                    {/* {isFilterShown.Category && (
                      <div
                        className="  collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.categories.map((item2, index2) => (
                            <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input form-check-input"
                                id="item2"
                                checked={shortName.Category.includes(
                                  item2.name
                                )} // Dynamically set based on state
                                onChange={() => {
                                  setShortName((prev) => ({
                                    ...prev,
                                    Category: prev.Category.includes(item2.name)
                                      ? prev.Category.filter(
                                          (category) => category !== item2.name
                                        ) // Remove if exists
                                      : [...prev.Category, item2.name], // Add if not exists
                                  }));
                                }}
                              />

                              <label className="custom-control-label form-check-label">
                                {item2.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {isFilterShown.Category && (
                      <div className="mt-4 mb-12">
                        <input
                          value={shortName.searchText}
                          className="border rounded-md w-full py-2 px-3 w-fulll"
                          placeholder="Search..."
                          type="text"
                          onChange={(e) => {
                            const value = e.target.value;

                            if (debounceTimeout.current) {
                              clearTimeout(debounceTimeout.current);
                            }

                            debounceTimeout.current = setTimeout(() => {
                              setShortName((prev) => ({
                                ...prev,
                                searchText: value,
                              }));
                            }, 100); // Adjust debounce delay as needed
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title flex items-center justify-between dynamic-after2"
                      }
                    >
                      Highlights
                      {isFilterShown.childCategory ? (
                        <FaMinus
                          onClick={() =>
                            handleFilterShown("childCategory", "+")
                          }
                        />
                      ) : (
                        <FaPlus
                          onClick={() =>
                            handleFilterShown("childCategory", "-")
                          }
                        />
                      )}
                    </h3>
                    {isFilterShown.childCategory && (
                      <div
                        className="  collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.cildCategories.map((item2, index2) => (
                            <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input form-check-input"
                                id="item2"
                                checked={shortName.childCategory.includes(
                                  item2.name
                                )} // Dynamically set based on state
                                onChange={() => {
                                  setShortName((prev) => ({
                                    ...prev,
                                    childCategory: prev.childCategory.includes(
                                      item2.name
                                    )
                                      ? prev.childCategory.filter(
                                          (category) => category !== item2.name
                                        ) // Remove if exists
                                      : [...prev.childCategory, item2.name], // Add if not exists
                                  }));
                                }}
                              />

                              <label className="custom-control-label form-check-label">
                                {item2.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div> */}
                  <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title border-b-2 pb-3 flex items-center justify-between dynamic-after2"
                      }
                    >
                      Brands
                      {isFilterShown.Brand ? (
                        <FaMinus
                          onClick={() => handleFilterShown("Brand", "+")}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => handleFilterShown("Brand", "-")}
                        />
                      )}
                    </h3>
                    {isFilterShown.Brand && (
                      <div
                        className=" mt-4  collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.brands.map((item2, index2) => (
                            <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input form-check-input"
                                id="item2"
                                checked={shortName.Brand.includes(
                                  item2.brand_name
                                )} // Dynamically set based on state
                                onChange={() => {
                                  setShortName((prev) => ({
                                    ...prev,
                                    Brand: prev.Brand.includes(item2.brand_name)
                                      ? prev.Brand.filter(
                                          (category) =>
                                            category !== item2.brand_name
                                        ) // Remove if exists
                                      : [...prev.Brand, item2.brand_name], // Add if not exists
                                  }));
                                }}
                              />
                              <label className="custom-control-label form-check-label">
                                {item2.brand_name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title border-b-2 pb-3 flex items-center justify-between dynamic-after2"
                      }
                    >
                      All Categories
                      {isFilterShown.subChildCategory ? (
                        <FaMinus
                          onClick={() =>
                            handleFilterShown("subChildCategory", "+")
                          }
                        />
                      ) : (
                        <FaPlus
                          onClick={() =>
                            handleFilterShown("subChildCategory", "-")
                          }
                        />
                      )}
                    </h3>
                    {isFilterShown.subChildCategory && (
                      <div
                        className="  custom-scrollbar mt-3  h-[170px] overflow-y-scroll collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.childSubCategories.map(
                            (item2, index2) => (
                              <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input form-check-input"
                                  id="item2"
                                  checked={
                                    name.replace(/-/g, " ") === item2.name
                                  } // Dynamically set based on state
                                  onChange={() => {
                                    // setShortName((prev) => ({
                                    //   ...prev,
                                    //   subChildCategory:
                                    //     prev.subChildCategory.includes(
                                    //       item2.name
                                    //     )
                                    //       ? prev.subChildCategory.filter(
                                    //           (category) =>
                                    //             category !== item2.name
                                    //         ) // Remove if exists
                                    //       : [
                                    //           ...prev.subChildCategory,
                                    //           item2.name,
                                    //         ], // Add if not exists
                                    // }));

                                    window.location.href = `/category/${item2.name.replace(
                                      / /g,
                                      "-"
                                    )}`;
                                  }}
                                />

                                <label className="custom-control-label form-check-label">
                                  {item2.name}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title flex items-center justify-between dynamic-after2"
                      }
                    >
                      Colors
                      {isFilterShown.Color ? (
                        <FaMinus
                          onClick={() => handleFilterShown("Color", "+")}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => handleFilterShown("Color", "-")}
                        />
                      )}
                    </h3>

                    {isFilterShown.Color && (
                      <div
                        className="  custom-scrollbar  h-[170px] overflow-y-scroll collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.colors.map((item2, index2) => (
                            <div className="custom-control  flex items-center gap-x-4  custom-checkbox  form-check collection-filter-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input  form-check-input"
                                id="item2"
                                checked={shortName.Color.includes(item2)} // Dynamically set based on state
                                onChange={() => {
                                  setShortName((prev) => ({
                                    ...prev,
                                    Color: prev.Color.includes(item2)
                                      ? prev.Color.filter(
                                          (category) => category !== item2
                                        ) // Remove if exists
                                      : [...prev.Color, item2], // Add if not exists
                                  }));
                                }}
                              />

                              <label
                                className={`custom-control-label w-6 h-6 rounded-full form-check-label`}
                                style={{
                                  background: `${item2}`,
                                }}
                              ></label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title flex items-center justify-between dynamic-after2"
                      }
                    >
                      Sizes
                      {isFilterShown.Size ? (
                        <FaMinus
                          onClick={() => handleFilterShown("Size", "+")}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => handleFilterShown("Size", "-")}
                        />
                      )}
                    </h3>
                    {isFilterShown.Size && (
                      <div
                        className="  custom-scrollbar  h-[170px] overflow-y-scroll collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          {filterList?.sizes.map((item2, index2) => (
                            <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input form-check-input"
                                id="item2"
                                checked={shortName.Size.includes(item2)} // Dynamically set based on state
                                onChange={() => {
                                  setShortName((prev) => ({
                                    ...prev,
                                    Size: prev.Size.includes(item2)
                                      ? prev.Size.filter(
                                          (category) => category !== item2
                                        ) // Remove if exists
                                      : [...prev.Size, item2], // Add if not exists
                                  }));
                                }}
                              />

                              <label className="custom-control-label uppercase form-check-label">
                                {item2}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div> */}

                  <div className="collection-collapse-block open">
                    <h3
                      className={
                        "collapse-block-title border-b-2 pb-3  flex items-center justify-between dynamic-after2"
                      }
                    >
                      Short By Prices
                      {isFilterShown.Size ? (
                        <FaMinus
                          onClick={() => handleFilterShown("Size", "+")}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => handleFilterShown("Size", "-")}
                        />
                      )}
                    </h3>
                    {isFilterShown.Size && (
                      <div
                        className=" collection-collapse-block-content"
                        style={{
                          display: categoriesbtn == true ? "block" : "none",
                        }}
                      >
                        <div className="collection-brand-filter">
                          <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input form-check-input"
                              id="item2"
                              checked={shortName.Price.includes("500-1000")} // Dynamically set based on state
                              onChange={() => {
                                setShortName((prev) => ({
                                  ...prev,
                                  Price: prev.Price.includes("500-1000")
                                    ? prev.Price.filter(
                                        (category) => category !== "500-1000"
                                      ) // Remove if exists
                                    : [...prev.Price, "500-1000"], // Add if not exists
                                }));
                              }}
                            />

                            <label className="custom-control-label uppercase form-check-label">
                              ₹500 - ₹1000
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input form-check-input"
                              id="item2"
                              checked={shortName.Price.includes("1000-5000")} // Dynamically set based on state
                              onChange={() => {
                                setShortName((prev) => ({
                                  ...prev,
                                  Price: prev.Price.includes("1000-5000")
                                    ? prev.Price.filter(
                                        (category) => category !== "1000-5000"
                                      ) // Remove if exists
                                    : [...prev.Price, "1000-5000"], // Add if not exists
                                }));
                              }}
                            />

                            <label className="custom-control-label uppercase form-check-label">
                              ₹1000 - ₹5000
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input form-check-input"
                              id="item2"
                              checked={shortName.Price.includes("5000-10000")} // Dynamically set based on state
                              onChange={() => {
                                setShortName((prev) => ({
                                  ...prev,
                                  Price: prev.Price.includes("5000-10000")
                                    ? prev.Price.filter(
                                        (category) => category !== "5000-10000"
                                      ) // Remove if exists
                                    : [...prev.Price, "5000-10000"], // Add if not exists
                                }));
                              }}
                            />

                            <label className="custom-control-label uppercase form-check-label">
                              ₹5000 - ₹10000
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox  form-check collection-filter-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input form-check-input"
                              id="item2"
                              checked={shortName.Price.includes("10000-20000")} // Dynamically set based on state
                              onChange={() => {
                                setShortName((prev) => ({
                                  ...prev,
                                  Price: prev.Price.includes("10000-20000")
                                    ? prev.Price.filter(
                                        (category) => category !== "10000-20000"
                                      ) // Remove if exists
                                    : [...prev.Price, "10000-20000"], // Add if not exists
                                }));
                              }}
                            />

                            <label className="custom-control-label uppercase form-check-label">
                              ₹10000 - ₹20000
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* filter for sort by start here */}

              <div
                className="col-sm-2 collection-filter category-page-side"
                style={{
                  zIndex: currentwdith < 790 ? 9991 : 1,
                  left: "-15px",
                  display:
                    currentwdith < 700
                      ? sortby == true
                        ? "block"
                        : "none"
                      : "none",
                }}
              >
                {/* side-bar colleps block stat */}
                <div className="collection-filter-block creative-card creative-inner category-side">
                  {/* brand filter start */}
                  <div
                    className="collection-mobile-back"
                    onClick={() => {
                      setsortby(!sortby);
                    }}
                  >
                    <span className="filter-back">
                      <i className="fa fa-angle-left" aria-hidden="true" /> back
                    </span>
                  </div>
                  <div className="collection-collapse-block open">
                    <h3
                      className="collapse-block-title newarrow !w-full mt-0"
                      onClick={() => {
                        setbrand(!brand);
                      }}
                    >
                      Sort By
                    </h3>
                    <div
                      className="collection-collapse-block-content"
                      style={{ display: brand == true ? "block" : "none" }}
                    >
                      <div className="collection-brand-filter"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* filter for sort by end here */}
              <div className="collection-content  !p-0 !m-0   col">
                <div className="page-main-content  !p-0 !m-0    !p-0">
                  <div className="row  !p-0 !m-0   !w-full">
                    <div className=" !p-0 !m-0    col-sm-12">
                      <div
                        className="  !p-0 !m-0   collection-product-wrapper"
                        style={{ background: "#f9f9f9" }}
                      >
                        <div className="product-top-filter">
                          <div
                            className="row !w-full"
                            style={{ background: "#f9f9f9" }}
                          ></div>
                          <div className="row !w-full">
                            <div className="col-12">
                              <div className="    product-filter-content">
                                <div className="search-count !border-none !w-full sm:gap-x-5 md:gap-x-2 gap-x-4 flex items-center justify-between text-start">
                                  <ShortNofProFil
                                    shortName={shortName}
                                    setShortName={setShortName}
                                    className="md:flex flex-1 hidden flex-col pt-3   md:flex-row   items-center  bg-transparent   rounded-lg   space-y-4 md:space-y-0 md:space-x-4 animate-fadeIn"
                                  />

                                  <h5
                                    style={{
                                      fontSize: 11,
                                      color: "black",
                                      fontWeight: 100,
                                    }}
                                  >
                                    Products 0- {itembybrand?.data?.length} of
                                    Result
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="product-wrapper-grid !p-0 !m-0    product">
                          <div className=" flex !pt-3 sm:!pt-5 items-center justify-start sm:gap-x-3 gap-2 sm:gap-y-4  flex-wrap !p-0 !m-0 !w-full removepadding additionalgap">
                            {itembybrand?.data[0] ? (
                              itembybrand?.data.map((item, index) => (
                                <div className=" w-[175px] sm:w-[240px]   hover:shadow-2xl">
                                  <div
                                    className="bg-white catbox"
                                    style={{ margin: "3px 4px" }}
                                  >
                                    <div className="product-imgbox">
                                      <div className="product-front">
                                        <button
                                          type="button"
                                          className=" fixedhight"
                                          style={{ width: "100%" }}
                                          onClick={() => {
                                            window.open(
                                              `/productdetails/${item.product_name.replace(
                                                / /g,
                                                "-"
                                              )}/${item?._id}`,
                                              "_blank"
                                            );
                                          }}
                                        >
                                          <FaHeart />{" "}
                                          <img
                                            src={`${process.env.REACT_APP_API_IMAGE_URL}${item?.product_image1}`}
                                            className="sm:h-[350px]  h-[275px]  object-cover "
                                            alt={item.product_name}
                                          />{" "}
                                        </button>
                                      </div>
                                    </div>
                                    {/* <div className="product-detail detail-center detail-inverse"> */}
                                    <div className="detail-title">
                                      <p className="text-center text-sm text-yellow-800">
                                        {item?.brand}
                                      </p>
                                      <div className="detail-left">
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {" "}
                                          <button
                                            type="button"
                                            className="btn"
                                            onClick={() => {
                                              transfer(
                                                item.id,
                                                item.product_name
                                              );
                                            }}
                                          >
                                            <h6
                                              className="price-title catbox2"
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                display: "-webkit-box",
                                                WebkitLineClamp: "1",
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                              }}
                                            >
                                              {item?.product_name}
                                            </h6>{" "}
                                          </button>
                                        </div>
                                      </div>

                                      <div
                                        className="detail-right"
                                        style={{ width: "100%" }}
                                      >
                                        <div
                                          className="price"
                                          style={{ width: "100%" }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              color: "#000",
                                              fontSize: "12px",
                                              fontWeight: "500",
                                            }}
                                          >
                                            ₹{item?.selling_price}
                                            {item.mrp_price &&
                                              item.mrp_price >
                                                item.selling_price && (
                                                <>
                                                  <span
                                                    style={{
                                                      fontSize: "10px",
                                                      color: "#c1c1c1",
                                                      lineHeight: "20px",
                                                      textDecoration:
                                                        "line-through",
                                                      paddingLeft: "3px",
                                                      fontWeight: "400",
                                                    }}
                                                  >
                                                    ₹{item.mrp_price}
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "10px",
                                                      color: "#230bb3",
                                                      lineHeight: "20px",
                                                      paddingLeft: "3px",
                                                      fontWeight: "400",
                                                    }}
                                                  >
                                                    {item.mrp_price -
                                                      item.selling_price}{" "}
                                                    off
                                                  </span>
                                                </>
                                              )}
                                          </div>

                                          {/* <div className="price text-align-center" style={{display:'flex',justifyContent:'center'}}>  ₹{item.price} </div> */}
                                        </div>
                                      </div>
                                    </div>
                                    {/* </div> */}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <h2
                                style={{
                                  textAlign: "center",
                                  paddingTop: "17px",
                                  fontWeight: "600",
                                  fontSize: "20px",
                                }}
                              >
                                No Result Found !
                              </h2>
                            )}
                          </div>
                        </div>

                        {/* {loading == true ? "" : data[0] ? ( */}
                        {data[0] ? (
                          <div className="product-pagination">
                            <div className="theme-paggination-block">
                              <div className="row !w-full mobilemargin">
                                <div className="col-xl-12 col-md-12 col-sm-12">
                                  <ReactPaginate
                                    pageCount={pageCount}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={2}
                                    onPageChange={(e) => {
                                      setCurrentPage(e.selected + 1);
                                      filterdata(e.selected * 12);
                                    }}
                                    containerClassName="pagination"
                                    breakClassName="page-item"
                                    activeClassName="active"
                                    pageClassName="page-item"
                                    previousLabel={
                                      <li className="page-item">
                                        <a
                                          className="page-link"
                                          href="javascript:void(0)"
                                          aria-label="Previous"
                                        >
                                          <span aria-hidden="true">
                                            <i
                                              className="fa fa-chevron-left"
                                              aria-hidden="true"
                                            />
                                          </span>{" "}
                                          <span className="sr-only">
                                            Previous
                                          </span>
                                        </a>
                                      </li>
                                    }
                                    nextLabel={
                                      <li className="page-item">
                                        <a
                                          className="page-link"
                                          href="javascript:void(0)"
                                          aria-label="Next"
                                        >
                                          <span aria-hidden="true">
                                            <i
                                              className="fa fa-chevron-right"
                                              aria-hidden="true"
                                            />
                                          </span>{" "}
                                          <span className="sr-only">Next</span>
                                        </a>
                                      </li>
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="header7 !p-0 bottomdgn">
                <div className="custom-container !p-0 ">
                  <div className="row !w-full">
                    <div className="col-12">
                      <div
                        className="header-contain"
                        style={{ padding: "8px 0px 0px 0px" }}
                      >
                        <div
                          className="collection-product-wrapper"
                          style={{ width: "100%" }}
                        >
                          <div className="product-top-filter">
                            <div className="row !w-full">
                              <div
                                className="col-xl-12"
                                style={{
                                  padding: "17px 0",
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div
                                  className=""
                                  onClick={() => {
                                    setfilter(!filter);
                                  }}
                                >
                                  <span
                                    className="filter "
                                    style={{ paddingright: "100px" }}
                                  >
                                    <i
                                      className="fa fa-filter"
                                      aria-hidden="true"
                                      style={{
                                        fontSize: "24px",
                                        color: "#4150b5",
                                      }}
                                    />
                                  </span>
                                </div>

                                <div
                                  className="toggle-nav"
                                  style={{ justifyContent: "center" }}
                                  onClick={() => setshowsidebar(!showsidebar)}
                                >
                                  <i className="fa fa-bars sidebar-bar" />
                                </div>

                                {/* <div className="collection-collapse">
                                  <h3
                                    className="collapse-block-title mt-0"
                                    onClick={() => {
                                      setsortby(!sortby);
                                    }}
                                  >
                                    <i
                                      class="fa-solid fa-arrow !w-full-down-wide-short"
                                      style={{ color: "#4150b5" }}
                                      onClick={() => {
                                        setsortby(!sortby);
                                        console.log("click me");
                                      }}
                                    />
                                  </h3>
                                </div> */}
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
          </div>
        </div>
      </section>
      {/* section End */}
      {/* <Footer /> */}
    </>
  );
};
export default CatFilter;
