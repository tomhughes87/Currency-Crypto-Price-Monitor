import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageMain from "./Pages/PageMain";
import PageButtonsStats from "./Pages/PageButtonsStats";
import PageAverageTickerValues from "./Pages/PageAverageTickerValues";
import Page404 from "./Pages/Page404";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/buttonsandstats" element={<PageButtonsStats />} />
        <Route path="/avgticval" element={<PageAverageTickerValues />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
