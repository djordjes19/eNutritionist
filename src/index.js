import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Ads from "./pages/Ads/Ads";
import Auth from "./pages/Auth";
import NewAd from "./pages/NewAd";
import ProfileSettings from "./pages/ProfileSettings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/newad" element={<NewAd />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
