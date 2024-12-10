import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useGetProductBySearchQuery } from "../store/api/productapi";
import ProductCard from "./Header/ProductCard";
import { TextField } from "@mui/material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GlassMagnifier } from "react-image-magnifiers";
import { FaSearch } from "react-icons/fa";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [serchvalue, setserchvalue] = useState("");
  const [showrecords, setshowrecords] = useState(false);

  const {
    data: searchapidata,
    isLoading: searchloading,
    refetch: refetchsearch,
  } = useGetProductBySearchQuery(serchvalue);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const searchresult = async (value) => {
    if (!value) {
      refetchsearch();
    } else {
      refetchsearch();
    }
  };




  useEffect(() => {
    const handleFocus = () => {
      document.body.style.overflow = "hidden"; // Prevent scrolling when input is focused
    };

    const handleBlur = () => {
      document.body.style.overflow = ""; // Restore scrolling when input loses focus
    };

    // Attach the event listeners to input elements
    const inputFields = document.querySelectorAll("input, textarea");
    inputFields.forEach(field => {
      field.addEventListener("focus", handleFocus);
      field.addEventListener("blur", handleBlur);
    });

    return () => {
      inputFields.forEach(field => {
        field.removeEventListener("focus", handleFocus);
        field.removeEventListener("blur", handleBlur);
      });
    };
  }, []);










  const checkText = async (e) => {
    if (e.key === "Enter" && serchvalue !== "") {
      window.location.href = `/category/${serchvalue.replace(/ /g, "-")}`;
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <FiSearch onClick={openModal} className="mr-2 cursor-pointer text-2xl" />

      {/* Modal */}
      {isOpen && (
        <motion.div
          className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="bg-white  min-h-[500px] w-[90%] max-w-lg p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                <FiSearch className="mr-2 text-gray-700" /> Search
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FiX />
              </button>
            </div>

           
          
       <TextField
               
              fullWidth
              required
            
              inputMode="search"
              value={serchvalue}
              onChange={(e) => {
                searchresult(e.target.value);
                setserchvalue(e.target.value);
                setshowrecords(true);
              }}
              onKeyDown={(e) => checkText(e)}
              placeholder="Type to search..."
              className="w-full m-0   border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              InputProps={{
                startAdornment: <FaSearch color="gray"   />,
              }}
            />


 

            {/* Search Results */}
            <div className="mt-4 overflow-y-auto max-h-[400px] border-t pt-2">
              {searchloading && <p>Loading...</p>}

              {searchapidata?.results?.length > 0
                ? searchapidata.results.map((item, index) => <ProductCard product={item} key={index} />)
                : !searchloading && (
                    <p className="text-gray-500">No results found.</p>
                  )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
