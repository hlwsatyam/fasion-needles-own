import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CatList() {
  const [allProducts, setAllProducts] = useState([]);
  const listRef = useRef(null); // Reference to the scrollable container

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/catList`,
        {}
      );
      if (res.status === 200) {
        setAllProducts(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // State for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft); // Mouse starting position
    setScrollLeft(listRef.current.scrollLeft); // Current scroll position
  };

  // Handle mouse up or mouse leave to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse move event to scroll the content
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only move if dragging is active

    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft; // Current mouse position
    const move = (x - startX) * 2; // Multiply by a factor for scroll speed

    listRef.current.scrollLeft = scrollLeft - move; // Update scroll position
  };
const nvg=useNavigate()
  return (
    <div
      ref={listRef}
      className="flex my-4 no-scroll-Width overflow-scroll whitespace-nowrap gap-4"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? "grab" : "pointer" }}
    >
      {allProducts.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() =>
                nvg(`/category/${item.name}`, {
                  state: { id: item._id },
                })
              }
            className="group relative flex flex-row items-center bg-[#212121] justify-center gap-2 rounded-2xl px-3 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
          >
            <div
              className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-[1px] ![mask-composite:subtract]"
            ></div>
            <svg
              className="size-4 text-[#ffaa40]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 15"
              height="15"
              width="15"
            >
              <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="10"
                fill="currentColor"
              >
                FN
              </text>
            </svg>

            <div
              className="shrink-0 bg-border w-[1px] h-4"
              role="none"
              data-orientation="vertical"
            ></div>
            <span className="inline animate-gradient whitespace-pre bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%] text-center">
              {item.name.replace(/ /g, "-")}
            </span>
            <svg
              stroke-linecap="round"
              className="text-[#9c40ff]"
              stroke-width="1.5"
              aria-hidden="true"
              viewBox="0 0 10 10"
              height="11"
              width="11"
              stroke="currentColor"
              fill="none"
            >
              <path
                stroke-linecap="round"
                d="M1 1l4 4-4 4"
                className="transition group-hover:translate-x-[3px]"
              ></path>
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default CatList;
