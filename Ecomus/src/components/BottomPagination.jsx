import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const BottomPagination = () => {
  const [active, setActive] = useState(1);

  const next = () => {
    if (active < 5) setActive(active + 1);
  };

  const prev = () => {
    if (active > 1) setActive(active - 1);
  };

  return (
    <div className="flex justify-center border-t-2 pt-3 items-center gap-4">
      <button
        className={`flex items-center gap-2 rounded-full ${
          active === 1 ? "text-gray-400 cursor-not-allowed" : ""
        }`}
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex items-center gap-2">
        {[1, 2, "...", 5].map((index, idx) => (
          <button
            key={idx}
            className={`rounded-full px-3 py-1 ${
              active === index ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } ${index === "..." ? "cursor-default" : ""}`}
            onClick={() => typeof index === "number" && setActive(index)}
            disabled={index === "..."}
          >
            {index}
          </button>
        ))}
      </div>
      <button
        className={`flex items-center gap-2 rounded-full ${
          active === 5 ? "text-gray-400 cursor-not-allowed" : ""
        }`}
        onClick={next}
        disabled={active === 5}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BottomPagination;
