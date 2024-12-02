import React, { useState } from "react";

function ShortNofProFil({ className, shortName, setShortName }) {
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div
      className={
        className ||
        "flex flex-1 flex-col pt-3 md:flex-row  items-center  bg-transparent   rounded-lg   space-y-4 md:space-y-0 md:space-x-4 animate-fadeIn"
      }
    >
      {/* Sort Options */}
      <div className="w-full  md:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort by
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={ shortName.shortBy}
          onChange={(e) =>
            setShortName((p) => ({
              ...p,
              shortBy: e.target.value,
            }))
          }
        >
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Products Per Page */}
      <div className="w-full md:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Products per page
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          
          value={ shortName.productPerPage}
          onChange={(e) =>
            setShortName((p) => ({
              ...p,
              productPerPage: e.target.value,
            }))
          }
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="w-full md:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={ shortName.gender}
          onChange={(e) =>
            setShortName((p) => ({
              ...p,
              gender: e.target.value,
            }))
          }
        >
          <option value="all">All</option>
          <option value="male">Men</option>
          <option value="female">Women</option>
        </select>
      </div>
    </div>
  );
}

export default ShortNofProFil;
