import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
const OrderSummary = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",

    city: "",

    billingAddress: "",
    billingState: "",
    country:"",
    billingZip: "",
  });

  const [shippingMethod, setShippingMethod] = useState("fedex"); // Default shipping method

  const [products, setProduct] = useState([
    {
      name: "Nike Air Max Pro 8888 - Super Light",
      size: "42EU - 8.5US",
      price: 138.99,
      image:
        "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Nike Air Max Pro 8888 - Super Light",
      size: "42EU - 8.5US",
      price: 238.99,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ]);
  const location = useLocation();
  const { items, total } = location.state || {}; // Optional chaining in case state is undefined

  useEffect(() => {
    setProduct(items);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShippingChange = (value) => {
    setShippingMethod(value);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const data = {
      total: total,
      payment_types: "COD",
      country:  formData.country,
      first_name: formData.name,
      last_name: "",
      address1: formData.billingAddress,
      address2: "",
      phone_number: formData.phone,
      pincode:  formData.billingZip,
      state: formData.billingState,
      city: formData.city,
      email: formData.email,
    };
    navigate("/pay", {
      state: {
        checkoutdata: data,
      },
    });
  };

  const calculateTotal = () => {
    const subtotal = products.reduce((acc, product) => acc + product.price, 0);
    const shippingCost = 8.0;
    return subtotal + shippingCost;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header />

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Order Summary */}
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-[100px] rounded-md border object-cover  "
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${product?.image}`}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{product.name}</span>
                  <span className="float-right text-gray-400">
                    {product.brand} X {product.quantity}
                  </span>
                  <p className="text-lg font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>

          <label
            htmlFor="cardHolder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="cardHolder"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
          {/* Form Fields */}
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
          />
           {/* Form Fields */}
          <label
            htmlFor="mobile"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Mobile
          </label>
          <input
            type="text"
            id="email"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder="987654311"
          />
          {/* Billing Address */}
          <label
            htmlFor="billingAddress"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Billing Address
          </label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder="123 Main St"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="creditExpiry"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                City
              </label>
              <input
                type="text"
                id="creditExpiry"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="Noida"
              />
            </div>

            <div>
              <label
                htmlFor="creditCvc"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                State
              </label>
              <input
                type="text"
                id="creditCvc"
                name="billingState"
                value={formData.billingState}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="Uttar Pradesh"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="billingState"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Country
              </label>
              <select
                id="billingState"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
              >
                <option>Country</option>
                <option>India</option>
                <option>Usa</option>
                <option>Canada</option>
                <option>Uk</option>
                <option>Germany</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="billingZip"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Zip Code
              </label>
              <input
                type="number"
                id="billingZip"
                name="billingZip"
                value={formData.billingZip}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
                placeholder="123456"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${calculateTotal()}
            </p>
          </div>
          <div className="flex mt-3 border-t-2 gap-x-2 mb-4 pt-4 justify-end items-center">
            <button className="  rounded-md bg-gray-900 px-6 py-2 font-medium text-white">
              Proceed
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </form>
  );
};

export default OrderSummary;
