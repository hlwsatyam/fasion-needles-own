import React, { useEffect, useState } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 25.99,
      quantity: 1,
      size: "M",
      rating: 4,
      image: "https://source.unsplash.com/random/150x150?t-shirt",
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 49.99,
      quantity: 1,
      size: "32",
      rating: 5,
      image: "https://source.unsplash.com/random/150x150?jeans",
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 199.99,
      quantity: 1,
      size: "L",
      rating: 3,
      image: "https://source.unsplash.com/random/150x150?leather-jacket",
    },
  ]);

  useEffect(() => {
    const cartdata = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    console.log(cartdata);
    setItems(cartdata);
  }, []);

  const updateQuantity = (id, change) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    try {
      // Filter out the item to be removed from the cart
      const updatedItems = items.filter((item) => item.id !== id);

      // Update the state with the new list
      setItems(updatedItems);

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedItems));

      toast(`Item removed from cart successfully`);
    } catch (error) {
      console.log(`Error removing item from cart: ${error.message}`);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = 0;
  const total = subtotal + tax;

  const navigate = useNavigate();
  const handleSubmit = (e) => {

    e.preventDefault();
    navigate("/checkout", { state: { items, total } });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 bg-gray-100 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {items.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item?.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold truncate w-[200px]">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Brand: {item.brand}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < item.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2 text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="font-bold ml-4">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <FaTrash
                  size={28}
                  className="text-red-500 ml-4 cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax </span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
