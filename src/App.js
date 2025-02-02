import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';

function App() {
  return (
   <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
   </>
  );
}

export default App;
