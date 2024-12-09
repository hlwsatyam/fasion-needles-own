"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DeliveryBanner from "../TimerOrder";
import { useGetAllCategoriesQuery } from "../../store/api/categoryapi";
import logo from "../../img/fashion needles.webp";
import { gettoken } from "../../Localstorage/Store";
import { useGetProductBySearchQuery } from "../../store/api/productapi";
const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    // { name: "Company", href: "#" },
    // { name: "Stores", href: "#" },
  ],
};

export default function Example() {
  const [open, setOpen] = useState(false);
  const [serchvalue, setserchvalue] = useState("");
  const [showrecords, setshowrecords] = useState(false);
  const checktoken = gettoken();
  const { data: categoryData, isLoading } = useGetAllCategoriesQuery();
  const {
    data: searchapidata,
    isLoading: searchloading,
    refetch: refetchsearch,
    isError,
  } = useGetProductBySearchQuery(serchvalue);
  const checkText = async (e) => {
    if (e.key === "Enter" && serchvalue != "") {
      window.location.href = `/category/${serchvalue.replace(/ /g, "-")}`;
    }
  };

  const [noOfItems, setItems] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const cartdata = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      setItems(cartdata?.length);
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const searchresult = async (value) => {
    if (value == undefined || value == null || value == "") {
      refetchsearch();
    } else {
      refetchsearch();
      // setsearchdata(response.data.data)
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b overflow-scroll no-scroll-Width border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {categoryData?.data?.slice(0, 2).map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {categoryData?.data?.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category?.subcategories?.slice(0, 2).map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.name}
                            src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a
                            href={`/category/${item.name.replace(/ /g, "-")}`}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1 cursor-pointer">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category?.subcategories?.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.subcategories.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a
                                href={`/category/${item.name.replace(
                                  / /g,
                                  "-"
                                )}`}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {gettoken ? (
                  <a
                    href="/profile"
                    className="-m-2   p-2 font-medium text-gray-900"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/mega-store/brand/profile.png`}
                      className="newwidthpro"
                      alt={"Shop At Fashion Needles"}
                    />
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create account
                  </a>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on Your First 5 Delevery
        </p> */}
        <DeliveryBanner />

        <nav aria-label="Top" className="mx-auto   px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Fashion Needles</span>
                  <img
                    alt="Shop Best Dresses And Fashion Product At Fashion Needles"
                    src={logo}
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categoryData?.data?.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute z-10 inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow-sm"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category?.subcategories
                                  ?.slice(0, 2)
                                  ?.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <img
                                        alt={item.name}
                                        src={`${process.env.REACT_APP_API_IMAGE_URL}${item.banner}`}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={`/category/${item.name.replace(
                                          / /g,
                                          "-"
                                        )}`}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category?.subcategories?.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section?.subcategories.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={`/category/${item.name.replace(
                                              / /g,
                                              "-"
                                            )}`}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="ml-4   flow-root lg:ml-6">
                  <input
                   inputMode="search"
                    className="bg-gray-200 w-full h-full rounded-md border border-transparent py-2 pl-3 pr-10 text-sm placeholder-gray-500 focus:outline-none     "
                    value={serchvalue}
                    onChange={(e) => {
                      searchresult(e.target.value);

                      setserchvalue(e.target.value);
                      setshowrecords(true);
                    }}
                    onKeyDown={(e) => checkText(e)}
                    // onBlur={()=>{setshowrecords(false);searchresult([]);setserchvalue('')}}
                    placeholder="Search for Product"
                  />

{
      <ul
      className="serachlisting     shadow-2xl"
      style={{
        display: "flex",
        position: "absolute",
     
  

        flexDirection: "column",
        zIndex: 4,
        background: "#fff",
      }}
    >
      {isError == false ? (
        searchapidata?.results?.[0]?.product_name ? (
          searchapidata?.results
            .map((item, index) => (
              <li>
                <div
                  className="p-1 flex  items-center"
                  style={{ gap: "10px", cursor: "pointer" }}
                  onClick={() => {
                    // transfer(item._id, item.title);
                    window.location.href = `/productdetails/${item.product_name.replace(
                      / /g,
                      "-"
                    )}/${item?._id}`;
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE_URL}${item.product_image1}`}
                    className="   h-[100px] w-[100px] "
                    alt="product"
                  />

                  <div className="cartinfo">
                    <h6
                      style={{
                        fontSize: "12px",
                        color: "#059fe2",
                        fontWeight: "600",
                        padding: "3px 0px",
                      }}
                    >
                      {item.product_name}
                    </h6>
                    <h6
                      style={{
                        fontSize: "12px",
                        color: "#059fe2",
                        padding: "3px 0px",
                      }}
                    >
                      ₹{item.selling_price}
                    </h6>
                  </div>
                </div>
              </li>
            ))
            .slice(0, 5)
        ) : serchvalue == "" ? (
          ""
        ) : (
          <li style={{ width: "100%" }}>
            <div
              className="p-1 d-flex"
              style={{
                gap: "10px",
                padding: "4px 0px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h6
                style={{
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "600",
                  padding: "3px 0px",
                }}
              >
                No Record Found
              </h6>
            </div>
          </li>
        )
      ) : (
        ""
      )}
    </ul>
}


                </div>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />

                  {gettoken ? (
                    <a
                      href="/profile"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/mega-store/brand/profile.png`}
                        className="newwidthpro"
                        alt={"Shop At Fashion Needles"}
                      />
                    </a>
                  ) : (
                    <a
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </a>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {noOfItems}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
