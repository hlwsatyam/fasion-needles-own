import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const OrderHistoryDetails = () => {
  const { state } = useLocation(); // Destructure state from location
  const order = state?.order; // Extract order data (ensure it's not undefined)
  console.log(order);
  const [showtax, setshowtax] = useState(false);

  useEffect(() => {
    if (!order) {
      // Optionally handle the case when order data is not passed
      console.log("Order data not available");
    }
  }, [order]);

  return (
    <>
      <Header />

      {/*section start*/}
      <section className="section-big-py-space b-g-light marginfromtop">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div
                className="table-responsive hist"
                style={{ borderRadius: "6px" }}
              >
                <h5
                  style={{
                    padding: "9px 9px",
                    fontWeight: 400,
                    display: "flex",
                    gap: 3,
                    fontSize: 14,
                    paddingBottom: "20px",
                  }}
                >
                  <img src="/images/Arro.png" alt="arrow" /> Back to Shop
                </h5>
                <div>
                  <h4
                    className="Orderstatus addmedia"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 9px",
                      fontWeight: 700,
                      fontSize: "13px",
                      paddingBottom: "20px",
                      paddingTop: "10px",
                    }}
                  >
                    Order Id: {order?.orderid || "N/A"}{" "}
                    {/* Display dynamic order ID */}
                    <span style={{ display: "block", color: "black" }}>
                      Order Status: {order.order_status}
                    </span>
                  </h4>
                </div>

                <table className="table">
                  <thead className="two">
                    <tr className="three">
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      >
                        Image
                      </th>
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      >
                        Product Name
                      </th>
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      >
                        Price
                      </th>
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      >
                        Quantity
                      </th>
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      >
                        Total
                      </th>
                      <th
                        className="family px-3"
                        style={{ fontWeight: 600, fontSize: "14px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dynamically render order items */}
                    {order?.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3">
                          <img
                            src={`${process.env.REACT_APP_API_IMAGE_URL}${item.image}`}
                            width="80px"
                            alt="cart"
                          />
                        </td>
                        <td className="pnwidth px-3">
                          <span
                            style={{
                              color: "black",
                              fontSize: "14px",
                              lineHeight: "63px",
                            }}
                          >
                            {item.name.length > 20
                              ? item.name.substring(0, 20) + "..."
                              : item.name}
                          </span>
                        </td>
                        <td>
                          <h6
                            className="td-color px-2"
                            style={{
                              fontWeight: 400,
                              lineHeight: "63px",
                              fontSize: "14px",
                            }}
                          >
                            ₹{item.price}
                          </h6>
                        </td>
                        <td
                          className=" px-3"
                          style={{
                            fontWeight: 400,
                            lineHeight: "63px",
                            fontSize: "14px",
                          }}
                        >
                          <span>{item.quantity}</span>
                        </td>
                        <td>
                          <h6
                            className="td-color px-2"
                            style={{
                              fontWeight: 400,
                              lineHeight: "63px",
                              fontSize: "14px",
                              color: "#230BB3",
                            }}
                          >
                            ₹{item.price * item.quantity}
                          </h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h5
                  style={{
                    display: "flex",
                    gap: "4px",
                    padding: "9px 9px",
                    fontWeight: 400,
                    fontSize: 14,
                    paddingBottom: "20px",
                  }}
                >
                  <img src="/images/Arro.png" alt="arrow" /> Back to Shop
                </h5>
              </div>
            </div>
            <div className="col-md-4 mt-lg-0 mt-md-0 mt-sm-3 mt-xs-3">
              <div
                className="py-2 px-2"
                style={{ background: "#ffff", borderRadius: 6 }}
              >
                <div>
                  <h4
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 9px",
                      fontWeight: 700,
                      fontSize: "14px",
                      paddingBottom: "20px",
                      paddingTop: "10px",
                    }}
                  >
                    Payment Details{" "}
                    <span style={{ display: "block", color: "#8f9091" }}>
                      {order?.payment_method || "N/A"}
                    </span>
                  </h4>
                </div>

                {/* Display order payment details */}
                <div
                  className="firstrow px-3 d-flex justify-content-between"
                  style={{ padding: "5px 0px" }}
                >
                  <span
                    className="family"
                    style={{ fontWeight: 600, fontSize: "12px" }}
                  >
                    {order?.items?.length} Items
                  </span>
                  <span
                    className="family"
                    style={{
                      fontWeight: 500,
                      color: "#230BB3",
                      fontSize: "12px",
                    }}
                  >
                    ₹{order?.sub_total_amount}
                  </span>
                </div>

                <div
                  className="firstrow px-3 d-flex justify-content-between"
                  style={{ padding: "5px 0px" }}
                >
                  <span
                    className="family"
                    style={{ fontWeight: 600, fontSize: "12px" }}
                  >
                    Shipping
                  </span>
                  <span
                    className="family"
                    style={{
                      fontWeight: 500,
                      color: "#230BB3",
                      fontSize: "12px",
                    }}
                  >
                    ₹{order?.shipping || 0}
                  </span>
                </div>

                <br />
                <div className="firstrow px-3 pt-1 d-flex justify-content-between">
                  <span style={{ fontWeight: 600, fontSize: "12px" }}>
                    Order Total
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: "#230BB3",
                      fontSize: "12px",
                    }}
                  >
                    ₹{order?.sub_total_amount}
                  </span>
                </div>
                <br />
                <hr />
                <div
                  className="firstrow px-3 d-flex justify-content-between"
                  style={{ padding: "5px 0px" }}
                >
                  <span
                    className="family"
                    style={{ fontWeight: 600, fontSize: "12px" }}
                  >
                    Payment Mode
                  </span>
                  <span
                    className="family"
                    style={{
                      fontWeight: 500,
                      color: "#8F9091",
                      fontSize: "12px",
                    }}
                  >
                    {order?.payment_method}
                  </span>
                </div>

                <br />
                <div className="firstrow px-3 d-flex justify-content-between">
                  <span style={{ fontWeight: 600, fontSize: "12px" }}>
                    Delivery Address
                  </span>
                  <p style={{ color: "#2B2A29", fontSize: "13px" }}>
                    {order?.shipping_address1}
                  </p>
                </div>
                <div className="firstrow px-3 d-flex justify-content-between">
                  <span style={{ fontWeight: 600, fontSize: "12px" }}>
                    Phone:
                  </span>
                  <p style={{ color: "#2B2A29", fontSize: "13px" }}>
                    {order?.shipping_mobile}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*section end*/}
      <Footer />
    </>
  );
};

export default OrderHistoryDetails;
