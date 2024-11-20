import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Subcategory = ({ value, issubcategory }) => {
  const nvg = useNavigate();
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
          {/* <img
            src={`${process.env.REACT_APP_API_IMAGE_URL}${value.banner}`}
            style={{ width: "25px" }}
            alt={404}
            className="hideonlaptop"
          />{" "} */}
          &nbsp; <span className="largefont"> {value.name} </span>
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
                <div className="row">
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
                        <div
                          key={chunkIndex}
                          className="col-12 md:w-1/5 mega-box"
                        >
                          <div className="link-section">
                            {chunk.map((item) => (
                              <div key={item._id} className="menu-title mb-2">
                                <h5
                                  onClick={() => {
                                    transfer2(item._id, item.name);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className="hover:text-blue-600"
                                >
                                  {item.name}
                                </h5>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
          </ul>
         
         
        </>
      )}
    </li>
  );
};

export default Subcategory;
