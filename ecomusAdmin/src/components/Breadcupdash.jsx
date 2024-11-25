import React from "react";
import { NavLink } from "react-router-dom";

const Breadcupdash = ({ name }) => {
  return (
    <div
      className="dashboard"
      style={{ width: "100%" }}
    >
      <div className="row d-flex justify-content-between">
        <div className="col-6"><p style={{fontWeight:'700', fontSize:'22px',margin:'0px'}}>Dashboard</p></div>
        <div className="col-6">
        <div className="d-flex justify-content-end" style={{gap:"11px"}}>
        
        <div className="_width_20 addnew">
          <button className="btn text-white customcolor2">
            <NavLink
              to="/addproduct"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              Add Produtct
            </NavLink>
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcupdash;
