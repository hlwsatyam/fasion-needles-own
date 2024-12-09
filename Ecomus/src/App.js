import "./App.css";
import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./components/Footer";

// Lazy load route components
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Productdetails = React.lazy(() => import("./pages/Productdetails"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Profile = React.lazy(() => import("./pages/profilepage/Profile"));
const Addresslist = React.lazy(() => import("./pages/Addresslist"));
const Thankyoupage = React.lazy(() => import("./pages/Thankyoupage"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const Pay = React.lazy(() => import("./pages/Pay"));
const Categoryforbrand = React.lazy(() => import("./pages/Category-for-brand"));
const Cart2 = React.lazy(() => import("./pages/Cart2"));
const OrderSummary = React.lazy(() => import("./pages/Checkout2"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const TrackDelevery = React.lazy(() => import("./pages/TrackOrder"));
const CareerPage = React.lazy(() => import("./pages/Careers"));
const Faq = React.lazy(() => import("./pages/Faq"));
const ShippingPolicy = React.lazy(() => import("./pages/ShiipingPc"));
const CancellationPolicy = React.lazy(() => import("./pages/CancellationPol"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const ForgetPass = React.lazy(() => import("./pages/ForgetPass"));
const OrderDetails = React.lazy(() => import("./pages/profilepage/OrderDetails"));
const Error404 = React.lazy(() => import("./pages/Error404"));
const PaymentFailed = React.lazy(() => import("./pages/PaymentFailed"));
const OrderHistorytwo = React.lazy(() => import("./pages/OrderHistorytwo"));
const OrderHistoryDetails = React.lazy(() => import("./pages/OrderHistoryDetails"));
const BrandFilter = React.lazy(() => import("./pages/BrandFilter"));
const CatFilter = React.lazy(() => import("./pages/CatDumm"));

function App() {
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsRouteLoading(true); // Start loading when route changes
    const timeout = setTimeout(() => {
      setIsRouteLoading(false); // Finish loading after a delay
    }, 700); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <HelmetProvider>
      <div className="mx-auto container">
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart2 />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout/" element={<OrderSummary />} />
            <Route path="/productdetails/:name/:id" element={<Productdetails />} />
            <Route path="/category/:name" element={<CatFilter />} />
            <Route path="/brand/:name" element={<BrandFilter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addresslist" element={<Addresslist />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/categoryforbrand/:name" element={<Categoryforbrand />} />
            <Route path="/order-history-detail" element={<OrderHistoryDetails />} />
            <Route path="/order-history" element={<OrderHistorytwo />} />
            <Route path="/thankyoupage" element={<Thankyoupage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/track-order" element={<TrackDelevery />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/forget-pass" element={<ForgetPass />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/customer-order/:txnId" element={<OrderDetails />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
        {!isRouteLoading && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
