import "./App.css";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";

import About from "./pages/About";

import Wishlist from "./pages/Wishlist";

import Productdetails from "./pages/Productdetails";
import Category from "./pages/Category/Category";

import Login from "./pages/Login/Login";

import Profile from "./pages/profilepage/Profile";
import Addresslist from "./pages/Addresslist";



import Thankyoupage from "./pages/Thankyoupage";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pay from "./pages/Pay";
import Categoryforbrand from "./pages/Category-for-brand";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart2 from "./pages/Cart2";
import OrderSummary from "./pages/Checkout2";
import ContactUs from "./pages/ContactUs";
import TrackDelevery from "./pages/TrackOrder";
import CareerPage from "./pages/Careers";
import Faq from "./pages/Faq";
import ShippingPolicy from "./pages/ShiipingPc";
import CancellationPolicy from "./pages/CancellationPol";
import Blogs from "./pages/Blogs";

import ForgetPass from "./pages/ForgetPass";
import OrderDetails from "./pages/profilepage/OrderDetails";
import Error404 from "./pages/Error404";
import PaymentFailed from "./pages/PaymentFailed";
import OrderHistorytwo from "./pages/OrderHistorytwo";
import OrderHistoryDetails from "./pages/OrderHistoryDetails";
import { HelmetProvider } from 'react-helmet-async';
import BrandFilter from "./pages/BrandFilter";
import CatFilter from "./pages/CatDumm";
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <div className="mx-auto container">
        <ToastContainer />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to={'/'} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart2 />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout/" element={<OrderSummary />} />
          <Route path="/productdetails/:name/:id" element={<Productdetails />} />
          {/* <Route path="/productdetails/:id/:name" element={<Productdetails />} /> */}
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
      </div>
      <Footer />
    </HelmetProvider>

  )
}

export default App;