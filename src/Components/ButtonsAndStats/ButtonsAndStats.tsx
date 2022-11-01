import React, { useEffect, useState } from "react";
import "./styles.css";

import GetCurrenySymbol from "./utils/getCurrencySymbols";
import search from "./utils/searchBtn";

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [loadBtns, setLoadBtns] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clickedBtnValue, setClickedBtnValue] = useState("");
  const [apiStats, setApiStats] = useState({
    last: "-",
    open: "-",
    high: "-",
    low: "-",
    percent_change_24: "-",
  });
  const [UrlFromBtn, setUrlFromBtn] = useState("xrpusd");
  const [miniBtnContainer, setMiniBtnContainer] = useState("");
  const [currencySymbols, SetcurrencySymbols] = useState({
    frontSymbol: "",
    endSymbol: "",
  });

  //////////////////////////
  //      fetch btns      //
  //////////////////////////

  useEffect(() => {
    const abortController = new AbortController();
    // https://wanago.io/2022/04/11/abort-controller-race-conditions-react/
    // https://medium.com/@icjoseph/using-react-to-understand-abort-controllers-eb10654485df // <this will help

    fetch(`https://www.bitstamp.net/api/v2/trading-pairs-info/`)
      .then((res) => res.json())
      .then((data) => {
        setBtnArrData(data);
        setLoadBtns(true);
        // return data;
        return () => abortController.abort();
      });
  }, []);

  //////////////////////////
  //   Handle btn click   //
  //////////////////////////

  function handleBtnClick(e: any): void {
    e.preventDefault();
    setUrlFromBtn(e.target.innerHTML.toLowerCase().replace("/", "")); //updated
    setClickedBtnValue(e.target.innerHTML); //add title to stats container
    setLoading(!loading);
    setMiniBtnContainer("min-btn-container"); //shrink the btns container
    return;
  }

  //////////////////////////
  //     Fetch Stats      //
  //////////////////////////

  useEffect(() => {
    expimenting();
    let interval = setInterval(async () => {
      try {
        expimenting();
        const res = await fetch(
          `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
        );
        const dataStats = await res.json();

        // Do things with data
        setApiStats(dataStats);
        SetcurrencySymbols(GetCurrenySymbol(clickedBtnValue));

        // Log the data & response
        console.log("res status", res);
        console.log("Data", dataStats);

        // handle error
      } catch (error: unknown) {
        console.log(error);
        console.log("caught an error!");
      }
      // time of interval
    }, 5000);
    return () => clearInterval(interval);
  }, [UrlFromBtn]); // on receiveing url "" from btn click

  function searchHighlighted() {
    setMiniBtnContainer(""); //remove shrink the btns container
  }
  //////////////////////////
  //        expimenting   //
  //////////////////////////
  /*trying to call and func when the useEffect is started and then also within the setinterval- 
  this will mean i can fetch the data on click without waiting for the setinterval time
  if it works i'll see hi on click and then after every interval too
  */
  function expimenting() {
    console.log("hi");
    return;
  }

  //////////////////////////
  //        RETURN        //
  //////////////////////////
  return (
    <>
      <div id="MainContainer-btns-stats-graph">
        {/* /////////////////////////////// */}
        {/* //           Search          // */}
        <input
          id="Input-search"
          onKeyUp={search}
          onFocus={searchHighlighted}
        ></input>

        {/* /////////////////////////////// */}
        {/* //        Btn section        // */}
        <div id="Container-btns" className={miniBtnContainer}>
          {btnDataArr.map((tricker) => (
            <button
              key={tricker.url_symbol}
              className="btn"
              onClick={handleBtnClick}
            >
              {tricker.name}
            </button>
          ))}
        </div>
        {/* /////////////////////////////// */}
        {/* //      Stats section        // */}

        <div id="Container-stats">
          <h1>stats</h1>
          <p>
            from btn prop:
            {clickedBtnValue}
          </p>

          <p>
            Last price:
            {currencySymbols.frontSymbol}
            {apiStats.last}
            {currencySymbols.endSymbol}
          </p>

          <p>
            Today opened at:
            {currencySymbols.frontSymbol}
            {apiStats.open}
            {currencySymbols.endSymbol}
          </p>

          <p>
            Today's High:
            {currencySymbols.frontSymbol}
            {apiStats.high}
            {currencySymbols.endSymbol}
          </p>

          <p>
            Today's Low:
            {currencySymbols.frontSymbol}
            {apiStats.low}
            {currencySymbols.endSymbol}
          </p>

          <p>
            Change over 24hrs:
            {apiStats.percent_change_24}%
          </p>
        </div>

        <div id="Container-graph"></div>
      </div>
    </>
  );
}

/////////////////////////////////////////////////////////////////////////////

export function LoadingIssues() {
  return (
    <>
      <div>LoadingIssues</div>
      <h1>We are reconnecting, bare with us</h1>
    </>
  );
}

/////////////////////////////////////////////////////////////////////////////
