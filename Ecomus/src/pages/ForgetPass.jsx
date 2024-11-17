import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const OrderSummary = () => {
  const [isMobVerified, setIsMobVerified] = useState(false);
  const [canMobEdit, setCanMobEdit] = useState(true);
  const [isShowOtpContainer, setIsShowOtpContainer] = useState(false);
  const [cuurentEntredOtp, setCurrentEntredOtp] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    newPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const veryFyNow = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/verification/mob`,
        {
          phone: formData.phone,
        }
      );
      if (res.status === 200) {
        setCanMobEdit(false);
        setIsShowOtpContainer(true);
        setOtp(res.data.otp);
      } else {
        toast(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast(error?.message || "Something went wrong");
    }
  };
  const resetNow = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/verification/resetPassword`,
        {
          phone: formData.phone,
          newPassword: formData.newPass,
        }
      );
      if (res.status === 200) {
        window.location.href = "/login";
      } else {
        toast(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast(error?.message || "Something went wrong");
    }
  };

  const VerifyOTP = () => {
    if (otp === cuurentEntredOtp) {
      setIsMobVerified(true);
      setCanMobEdit(true);
      setIsShowOtpContainer(false);
    } else {
      toast("OTP is not valid");
    }
  };

  return (
    <form>
      <Header />

      <div className="grid sm:px-10 py-4 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Payment Details */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Forget Password</p>
          {!isMobVerified && (
            <p className="text-gray-400">
              Enter Your Register Mobile Number and We will send you a OTP to
              reset your password.
            </p>
          )}

          {/* Form Fields */}
          <label
            htmlFor="mobile"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            {isMobVerified ? "New Password" : "Mobile"}
          </label>
          <input
            type="text"
            id="email"
            name={isMobVerified ? "newPass" : "phone"}
            readOnly={!canMobEdit}
            value={isMobVerified ? formData.newPass : formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
            placeholder={isMobVerified ? "2017Abc" : "987654311"}
          />
          {!isMobVerified &&
            !isShowOtpContainer &&
            formData.phone.length >= 10 &&
            formData.phone.length <= 13 && (
              <p
                onClick={veryFyNow}
                className="text-white cursor-pointer w-fit bg-gray-500 p-2 rounded-md mt-2"
              >
                Verify Now
              </p>
            )}
          {isShowOtpContainer && (
            <div className="text-white flex items-center  gap-x-3  w-fit   p-2 rounded-md mt-2">
              <input
                type="number"
                onChange={(e) => {
                  setCurrentEntredOtp(e.target.value);
                }}
                className="w-20 border px-2 py-2 text-black  rounded-md"
                placeholder="otp"
                name=""
                id=""
              />
              <p
                onClick={VerifyOTP}
                className="text-white cursor-pointer w-fit bg-gray-500 p-2 rounded-md "
              >
                Verify Now
              </p>
              <p
                onClick={() => {
                  setCanMobEdit(true);
                  setIsShowOtpContainer(false);
                }}
                className="text-white cursor-pointer w-fit bg-gray-500 p-2 rounded-md "
              >
                Edit
              </p>
            </div>
          )}
          {isShowOtpContainer && (
            <div className="text-white   w-fit   p-2 rounded-md mt-2"></div>
          )}

          {isMobVerified && formData.newPass === "" && (
            <p className="text-green-500">
              OTP Verified! Create Your New Password
            </p>
          )}

          {formData.newPass.length > 3 && (
            <p
              onClick={resetNow}
              className="text-white mt-2 cursor-pointer w-fit bg-gray-500 p-2 rounded-md "
            >
              Reset Password
            </p>
          )}
        </div>
      </div>

      <Footer />
    </form>
  );
};

export default OrderSummary;
