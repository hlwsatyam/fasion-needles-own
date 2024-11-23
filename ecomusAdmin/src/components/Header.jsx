import React, { useState } from "react";
import img from "../assets/qwerty.png";
import { BsFillEnvelopeFill } from "react-icons/bs";
import {
  FaBell,
  FaCog,
  FaEuroSign,
  FaSignature,
  FaUserAlt,
} from "react-icons/fa";
import {
  getprivateurl,
  getsoh,
  gettoken,
  privateurl,
  removeToken,
} from "../Localstorage/Store";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
// import img2 from "../assets/loginlogo.png";
import img2 from "../assets/fashion needles.webp";
 

const Header = () => {
  const nvg = useNavigate();
  const userinfo = gettoken();

  const logoutevt = async () => {
    removeToken();
    nvg("/");
  };
  const sshh = getsoh();

 

  return userinfo ? (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 7px",
      }}
    >
      <div>
        {sshh !== true ? (
          <img
            src={img2}
            className="mix-blend-color-burn"
            alt="Fashion Needles"
            style={{ height: "54px", marginLeft: "54px" }}
          />
        ) : (
          ""
        )}
      </div>
      <div style={{ display: "flex" }}>
        <div className="icongroup">
          <div style={{ width: "0px", height: "0px" }}></div>

          <div className="icon white">
            <div className="btn-group">
              {/* <button type="button" className="btn btn-danger"></button> */}
              <button
                type="button"
                className="btn dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaBell size="19px" />
                {/* <span className="visually-hidden">Toggle Dropdown</span> */}
              </button>
              <ul className="dropdown-menu">
                <div className="notification">
                  <h6 style={{ position: "relative", top: "10px" }}>
                    Notification
                  </h6>
                  {/* <h6 className="ms-auto">Clear All</h6> */}
                </div>{" "}
                
              </ul>
            </div>
          </div>

           
        </div>
        <div className="userlogo">
          <img src={img} alt="qwerty" />
        </div>
       
      </div>
    </div>
  ) : (
    ""
  );
};

export default Header;
