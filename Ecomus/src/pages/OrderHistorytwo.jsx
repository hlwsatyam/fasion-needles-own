import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useGetOrderByUserQuery } from "../store/api/orderapi";

const OrderHistorytwo = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const { data: orderlist, isLoading: orderlistLoading } =
    useGetOrderByUserQuery();

  useEffect(() => {
    if (orderlist?.orderlist) {
      setOrders(orderlist.orderlist);
    }
  }, [orderlist]);

  return (
    <div>
      <Header />
      <div className="breadcrumb-main bg-light py-2">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <i className="fa fa-angle-double-right" /> Order History
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-4">Order History</h5>
            <div className="row">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h6 className="">Order ID: {order.orderid}</h6>
                        <p className="card-text">
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.order_date).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                          <strong>Grand Total:</strong> ₹{order.grand_total_amount}
                        </p>
                        <p className="card-text">
                          <strong>Status:</strong> {order.order_status}
                        </p>
                        <div className="mb-2 border-t-2 pt-2 ">
                          <strong>Items:</strong>
                          <div>
                            {order.items.map((item, index) => (
                              <div key={index} className="d-flex align-items-center mb-1">
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}${item.image}`}
                                  alt={item.name}
                                  className="img-thumbnail me-2"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                  }}
                                />
                                <span>
                                  {item.name.length > 20
                                    ? item.name.substring(0, 10) + "..."
                                    : item.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/order-history-detail`,{
                            state: { order: order }
                          })}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No orders found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default OrderHistorytwo;
