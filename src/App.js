import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import Logout from "./components/Logout/Logout";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  return (
   <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/productdetails" element={<ProductDetails />} />
      </Routes>
   </>
  );
}

export default App;
