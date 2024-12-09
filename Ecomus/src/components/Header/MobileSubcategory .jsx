import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileSubcategory = ({ value, issubcategory }) => {
  const [showfullmenu, setshowfullmenu] = useState(false);

  return (
    <li className={issubcategory == 0 ? "" : "mega"}>
      {issubcategory == 0 ? (
        <button
          className="btn  dark-menu-item desgin1"
          style={{ padding: "6px 18px 0px 18px" }}
        >
           
          &nbsp; <span className="largefont"> {value.name} </span>
        </button>
      ) : (
        <>
          <button
            type="button"
            className="btn dark-menu-item desgin1 justshow"
            style={{ padding: "6px 18px 0px 18px" }}
            onClick={() => {
              setshowfullmenu(!showfullmenu);
              // alert("cvcv")
            }}
          >
            &nbsp; <span className="largefont"> {value.name}</span>
          </button>
          <ul className="mega-menu   full-mega-menu resultappear newwith ">
            <div>
              <div className="container">
                <div className="row">
                  {value.subcategories.map((item, index) => (
                    <div className="col mega-box" key={index}>
                      <div className="link-section">
                        <div className="menu-title">
                          <h5>
                            <span className="border-b-2 mb-3 text-sm pb-1 text-red-700 font-semibold">
                              {" "}
                              {item.name}{" "}
                            </span>

                            {item.subcategories.map((item, index) => (
                              <div
                                className=" ml-4 mt-2 col mega-box"
                                key={index}
                              >
                                <div className="link-section">
                                  <div className=" text-xs menu-title">
                                    <h5
                                      className="!mb-0 !pb-0"
                                      onClick={() =>
                                        (window.location.href = `/category/${item.name.replace(
                                          / /g,
                                          "-"
                                        )}`)
                                      }
                                    >
                                      {item.name}
                                    </h5>
                                  </div>
                                  {/* <Subsubcategory subvalue={item.children} /> */}
                                </div>
                              </div>
                            ))}
                          </h5>
                        </div>
                        {/* <Subsubcategory subvalue={item.children} /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ul>
        </>
      )}
    </li>
  );
};

export default MobileSubcategory;
