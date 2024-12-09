import { FaShippingFast } from "react-icons/fa";
import { useState, useEffect } from "react";

const DeliveryBanner = () => {
  const [timer, setTimer] = useState(3600); // 1 hour countdown in seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
      <FaShippingFast className="mr-2 h-5 w-5 animate-bounce" />
      <span>up to 60% Off!</span>
      <div className="ml-1 flex items-center">
        <span className="mr-1">Offer ends in:</span>
        <span className="bg-white text-indigo-600 px-2 py-1 rounded font-bold">{formatTime(timer)}</span>
      </div>
    </div>
  );
};

export default DeliveryBanner;
