import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Productdetails from "./pages/Productdetails";
import Category from "./pages/Category/Category";
import Myaccount from "./pages/Myaccount";
import Login from "./pages/Login/Login";
import Testproduct from "./pages/Testproduct";
import Profile from "./pages/profilepage/Profile";
import Addresslist from "./pages/Addresslist";
import OrderHistoryDetails from "./pages/OrderHistoryDetails";
import Orderhistory from "./pages/Orderhistory";
import Credit from "./pages/Credit";
import OrderHistorytwo from "./pages/OrderHistorytwo";
import Productdetailstwo from "./pages/Productdetailstwo";
import Thankyoupage from "./pages/Thankyoupage";
import Termsconditions from "./pages/Termsconditions";
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
import { useEffect } from "react";
import ForgetPass from "./pages/ForgetPass";
function App() {
  return (
    <div className="  mx-auto">
      <ToastContainer />
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart2 />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout/" element={<OrderSummary />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/testproduct" element={<Testproduct />} />
        <Route path="/productdetails/:id" element={<Productdetails />} />
        <Route path="/productdetailstwo" element={<Productdetailstwo />} />
        <Route path="/category/:id/:name/:url" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresslist" element={<Addresslist />} />
        <Route path="/order-history-detail" element={<OrderHistoryDetails />} />
        <Route path="/order-history" element={<OrderHistorytwo />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/categoryforbrand/:name" element={<Categoryforbrand />} />
        <Route path="/thankyoupage" element={<Thankyoupage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<Termsconditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/track-order" element={<TrackDelevery />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/payment-failed" element={<h1>heyyy</h1>} />
        <Route path="/customer-order/:txnId" element={<h1>heyyygggggg</h1>}  />

      </Routes>
    </div>
  )

}

const Map = () => {
  useEffect(() => {
    window.location.href = "https://www.google.com/maps?ll=28.609226,77.351335&z=11&t=m&hl=en&gl=US&mapclient=embed&cid=2841190900802331527";
  }, []); // Added empty dependency array to run effect only once

  return null; // Return null or a simple JSX element if needed
};






export default App;
