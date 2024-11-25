import { useEffect, useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Webinfoform from "./Webinfoform";
import axios from "axios";

const Webinfo = () => {
  const [allText, setAllText] = useState([]);
  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/testomonials-info`
      );
      if (res.status === 200) {
        setAllText(res.data);
      }
    } catch (error) {}
  };
  const deleteHandle = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/testomonials-info/deleteHandle/${id}`
      );
      if (res.status === 200) {
         window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="dashboardcontent px-2">
        <div className="container-fuild px-2 desgin1">
          <div className="row bg-white ">
            <div
              className="col-lg-12 d-flex justify-content-between py-2"
              style={{
                background: "#bcdae9",
                color: "#00693E",
              }}
            >
              <p className="m-0 customfont">Website Info</p>
              <div className="addnew d-block mb-2"></div>
            </div>
          </div>
        </div>
        <Webinfoform />

        <div className="container-fuild px-2 mb-2 desgin1">
          <div className="row bg-white ">
            <div
              className="col-lg-12 d-flex justify-content-between py-2"
              style={{
                background: "#bcdae9",
                color: "#00693E",
              }}
            >
              <p className="m-0  !text-xs customfont">Name</p>
              <p className="m-0  !text-xs customfont">subject</p>
              <p className="m-0  !text-xs customfont">Description</p>
              <div className=" m-0 customfont"> Star</div>
              <div className=" m-0 customfont"> Action</div>
            </div>
          </div>
        </div>

        {allText?.map((item, index) => {
          return (
            <div className="container-fuild px-2 desgin1">
              <div className="row bg-white ">
                <div
                  className="col-lg-12 d-flex justify-content-between py-2"
                  style={{
                    background: "#bcdae9",
                    color: "#00693E",
                  }}
                >
                  <p className="m-0 !text-xs customfont">{item.name}</p>
                  <p className="m-0 !text-xs customfont">{item.subject}</p>
                  <p className="m-0 !text-xs customfont">{item.description}</p>
                  <div className="m-0 !text-xs customfont"> {item.noOfStar}</div>
                  <div className="m-0 !text-xs cursor-pointer customfont" onClick={()=>deleteHandle(item._id)}>Delete</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Webinfo;
