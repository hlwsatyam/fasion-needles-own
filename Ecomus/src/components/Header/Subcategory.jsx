import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Subcategory = ({ value, issubcategory }) => {
  const nvg = useNavigate();
  console.log(value);
  const transfer2 = (id, title) => {
    nvg(`/category/${id}/${title}/none`);
    // nvg("/category", { state: { id: id } });
  };
  return (
    <li className={issubcategory == 0 ? "" : "mega"}>
      {issubcategory == 0 ? (
        <button
          type="button"
          onClick={() => {
            transfer2(value._id, value.name);
          }}
          className="btn dark-menu-item desgin1 ulappear"
          style={{ padding: "6px 18px 0px 18px" }}
        >
          &nbsp; <span className="largefont "> {value.name} </span>
        </button>
      ) : (
        <>
          {" "}
          <button
            onClick={() =>
              (window.location.href = `/category/${value._id}/${value.name}/none`)
            }
            type="button"
            className="btn dark-menu-item desgin1 ulappear"
            style={{ padding: "6px 18px 0px 18px" }}
          >
            {/* <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}${value.banner}`}
              style={{ width: "25px" }}
              alt={404}
              className="hideonlaptop"
            />{" "} */}
            &nbsp; <span className="largefont"> {value.name}</span>
          </button>
          <ul className="mega-menu z-20 full-mega-menu  resultappear newwith">
            <div>
              <div className="container">
                {
                  // Break subcategories into chunks of 5 items each
                  value.subcategories
                    .reduce((resultArray, item, index) => {
                      const chunkIndex = Math.floor(index / 5);
                      if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = []; // start a new chunk
                      }
                      resultArray[chunkIndex].push(item);
                      return resultArray;
                    }, [])
                    .map((chunk, chunkIndex) => (
                      <div className="link-section !flex  gap-x-10">
                        {chunk.map((item) => (
                          <div key={item._id} className="menu-title   mb-2">
                            <h5
                              onClick={() => {
                                transfer2(item._id, item.name);
                              }}
                              style={{ cursor: "pointer" }}
                              className=" !text-blue-500 border-b-2   hover:!rotate-2 !text-sm"
                            >
                              {item.name}
                            </h5>

                            {item?.subcategories?.map((i, idx) => (
                              <div key={item._id} className="menu-title mb-2">
                                <h5
                                  onClick={() => {
                                    transfer2(item._id, item.name);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className=" !text-black hover:!rotate-2 !text-xs"
                                >
                                  {i.name}
                                </h5>
                              </div>
                            ))}
                            <br className="w-full" />
                          </div>
                        ))}
                      </div>
                    ))
                }
              </div>
            </div>
          </ul>
        </>
      )}
    </li>
  );
};

export default Subcategory;
