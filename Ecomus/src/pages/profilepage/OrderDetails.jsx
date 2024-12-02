import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

const OrderDetails = () => {
  const { item: order } = useLocation().state;

  return (
    <div className=" min-h-screen">
      <Header />
      <div className="  mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-8">
        {/* Order Info */}
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-sm mt-2">
            Order ID: <span className="font-medium">{order.orderid}</span>
          </p>
          <p className="text-sm">
            Order Date:{" "}
            <span className="font-medium">
              {new Date(order.order_date).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Shipping Info */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Shipping Details
          </h2>
          <p className="text-sm">
            <span className="font-bold">Name:</span> {order.shipping_first_name}{" "}
            {order.shipping_last_name}
          </p>
          <p className="text-sm">
            <span className="font-bold">Address:</span>{" "}
            {order.shipping_address1}, {order.shipping_city},{" "}
            {order.shipping_state}, {order.shipping_country} -{" "}
            {order.shipping_pincode}
          </p>
          <p className="text-sm">
            <span className="font-bold">Email:</span> {order.shipping_email}
          </p>
          <p className="text-sm">
            <span className="font-bold">Mobile:</span> {order.shipping_mobile}
          </p>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-100">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Order Summary
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="text-gray-700 border-b">
                  <td className="py-4 px-4 font-medium">{item.name}</td>
                  <td className="py-4 px-4">
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-center">
                    ₹{item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Order Total */}
          <div className="mt-6 text-right">
            <p className="text-sm">
              <span className="font-medium">Subtotal:</span> ₹
              {order.sub_total_amount.toFixed(2)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Shipping Charges:</span> ₹
              {order.shipping_charges.toFixed(2)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Tax:</span> ₹
              {order.tax_amount.toFixed(2)}
            </p>
            <p className="text-lg font-bold mt-2">
              Total: ₹{order.grand_total_amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Payment Details
          </h2>
          <p className="text-sm">
            <span className="font-bold">Payment Method:</span>{" "}
            {order.payment_method}
          </p>
          <p className="text-sm">
            <span className="font-bold">Payment Status:</span>{" "}
            <span
              className={`font-medium ${
                order.payment_status === "pending"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {order.payment_status}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Order Status:</span>{" "}
            <span
              className={`font-medium ${
                order.order_status === "pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {order.order_status}
            </span>
          </p>
        </div>
      </div>
  
    </div>
  );
};

export default OrderDetails;
