import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";


import ItemList from "./shop/itemList";
import BarsketPage from "./shop/barsketPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<ItemList />} />
  <Route path="barsketPage" element={<BarsketPage />} />
</Routes>

  </BrowserRouter>
);
reportWebVitals();


