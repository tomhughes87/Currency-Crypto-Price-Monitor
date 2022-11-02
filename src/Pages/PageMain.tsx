import React from "react";
import AverageTickerValues from "../Components/AverageTickerValues/AverageTickerValues";
import ButtonsAndStats from "../Components/ButtonsAndStats/ButtonsAndStats";
import "./page.css";

export default function PageMain() {
  return (
    <>
      <div id="MainContainer-MainPage">
        <AverageTickerValues />
        <ButtonsAndStats />
      </div>
    </>
  );
}
