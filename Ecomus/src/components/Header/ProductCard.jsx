import { motion } from "framer-motion";
import { FiShoppingCart, FiInfo } from "react-icons/fi";

export default function ProductCard({ product }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      className="flex  border-b-2 mb-3  flex-row bg-white shadow-md rounded-lg overflow-hidden transform transition hover:shadow-lg hover:scale-105 max-w-md mx-auto"
    >
      {/* Left Side: Image */}
      <div className=" h-[150px]    w-[100px]   overflow-hidden">
        <img
          onClick={() => {
            // transfer(item._id, item.title);
            window.location.href = `/productdetails/${product.product_name.replace(
              / /g,
              "-"
            )}/${product?._id}`;
          }}
          src={`${process.env.REACT_APP_API_IMAGE_URL}${product?.product_image1}`}
          alt={product.product_name}
          className="w-full cursor-pointer h-full object-cover transform transition hover:scale-110"
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-2/3 p-2 flex flex-col ">
        {/* Title and Brand */}
        <div>
          <h2
            onClick={() => {
              // transfer(item._id, item.title);
              window.location.href = `/productdetails/${product.product_name.replace(
                / /g,
                "-"
              )}/${product?._id}`;
            }}
            className="text-sm font-semibold cursor-pointer hover:text-gray-400 text-gray-800 line-clamp-1"
          >
            {product.product_name}
          </h2>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {product.brand}
          </p>
        </div>

        {/* Footer: Price and Actions */}
        <div className="flex justify-between items-center">
          {/* Price */}
          <p className="text-base font-bold text-blue-600">
            ₹{product.selling_price}
          </p>

          {/* Action Icons */}
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-600 transition"
              title="View Details"
            >
              <FiInfo    onClick={() => {
              // transfer(item._id, item.title);
              window.location.href = `/productdetails/${product.product_name.replace(
                / /g,
                "-"
              )}/${product?._id}`;
            }}  className="text-lg cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
