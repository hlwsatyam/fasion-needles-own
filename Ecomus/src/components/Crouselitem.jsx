import React from "react";
import { useNavigate } from "react-router-dom";

const Crouselitem = ({ item }) => {
  return (
    <div>
      <div
        className="product-box product-box2"
        onClick={() => {
          window.location.href = `/productdetails/${item.product_name.replace(
            / /g,
            "-"
          )}/${item._id}`;
        }}
      >
        <div className="product-imgbox">
          <div className="product-front">
            <a href="javascript:void(0)">
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}${item.product_image1}`}
                srcSet={`${process.env.REACT_APP_API_IMAGE_URL}${item.product_image1}`}
                alt={item.product_name}
                className="h-[275px]   object-fill "
              />
            </a>
          </div>

          
       {(item?.trendingproduct === "Active" || item?.newarrivedproduct === "Active") && (
  <p
    className={`absolute top-1 left-1 text-white text-[11px] px-2 rounded ${
      item?.trendingproduct === "Active" ? "bg-green-500 " : "bg-red-500"
    }`}
  >
    {item?.trendingproduct === "Active" ? "Trending" : "new"}
  </p>
)}

        </div>
        <div className="product-detail product-detail2">
          <a href="javascript:void(0)">
            <h3 style={{ fontWeight: 400, fontSize: "12px" }}>
              {item.product_name}
            </h3>
          </a>
          <h5 style={{ fontSize: "12px", color: "black" }}>
            {item.selling_price}

            <span
              style={{
                fontSize: "10px",
                color: "#059fe2",
                lineHeight: "20px",
                paddingLeft: "3px",
                fontWeight: "400",
              }}
            >
              ₹{item?.mrp_price}
            </span>
            <p
              style={{
                fontSize: "10px",
                color: "#059fe2",
                lineHeight: "20px",
                paddingLeft: "3px",
                fontWeight: "400",
                display: "inline",
                textDecoration: "none",
                textDecorationLine: "none",
              }}
            >
              {`(${parseInt(
                ((item.mrp_price - item.selling_price) / item.mrp_price) * 100
              )} %off)`}
            </p>
            {/* {item.stockrecords[0]?.discount == 0 ? '' : <span style={{fontSize: '10px',color: '#c1c1c1',lineHeight: '20px',textDecoration: 'line-through',paddingLeft:'3px',fontWeight:'400'}}>₹{item.stockrecords[0]?.mrp}</span>}{item.stockrecords[0]?.discount == 0 ? '' : <span style={{fontSize: '10px',textDecoration:'none', color: '#230bb3',lineHeight: '20px',paddingLeft:'3px',fontWeight:'400'}}>{item.stockrecords[0]?.discount_type == "amount" ? `(₹${item.stockrecords[0]?.discount} off)` : `(${item.stockrecords[0]?.discount} %off)`}</span>} */}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Crouselitem;
