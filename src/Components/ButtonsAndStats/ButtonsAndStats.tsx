import React, { useEffect, useState } from "react";
import "./styles.css";
import GetCurrenySymbol from "./utils/getCurrencySymbols";
import search from "./utils/searchBtn";
// import { Stats } from "./Stats/Stats";

/////////////////////////////////////////////////////////////////////////////

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [loading, setLoading] = useState(true);
  const [clickedBtnValue, setClickedBtnValue] = useState("");
  const [apiStats, setApiStats] = useState({
    open: "-",
    high: "-",
    low: "-",
    percent_change_24: "-",
  });
  const [UrlFromBtn, setUrlFromBtn] = useState("-");

  //////////////////////////
  //       fetch btns     //
  //////////////////////////

  useEffect(() => {
    async function fetchApiFunc() {
      let res = await fetch(
        `https://www.bitstamp.net/api/v2/trading-pairs-info/`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      console.log(res);
      const data = await res.json();
      setBtnArrData(data);
      return data;
    }
    fetchApiFunc();
  }, []);

  //////////////////////////
  //   Handle btn click   //
  //////////////////////////

  function handleBtnClick(e: any) {
    e.preventDefault();
    console.log("btn clicked", e.target);
    setClickedBtnValue(e.target.innerHTML);
    setUrlFromBtn(clickedBtnValue.toLowerCase().replace("/", ""));
    return;
  }

  //////////////////////////
  //     Fetch stats      //
  //////////////////////////
  // ASYNC, fetch stats, looping on errors. many CORS issues with this url
  useEffect(() => {
    setApiStats({ open: "-", high: "-", low: "-", percent_change_24: "-" }); //on btn click, clear the prev stats whilst loading new stats
    async function fetchApiFunc() {
      try {
        let res = await fetch(
          `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
        );
        const data = await res.json();
        setApiStats(data);
        return data;
      } catch {
        const SecondsBeforeRetry = 2;
        // <LoadingIssues />;
        setTimeout(fetchApiFunc, SecondsBeforeRetry * 1000); // if failed: wait and try again (some endpoints fail often)
      }
    }
    fetchApiFunc();
  }, [UrlFromBtn]); // on receiveing url "" from btn click

  //////////////////////////
  //        RETURN        //
  //////////////////////////
  return (
    <>
      <div id="MainContainer-btns-stats-graph">
        {/* /////////////////////////////// */}
        {/* //           Search          // */}
        <input id="Input-search" onKeyUp={search}></input>

        {/* /////////////////////////////// */}
        {/* //        Btn section        // */}
        <div id="Container-btns">
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
            {/* {props.btnclicked} */}
          </p>

          <p>
            Today opened at:
            {/* {symbStart} */}
            {apiStats.open}
            {/* {symbEnd} */}
          </p>

          <p>
            Today's High:
            {/* {symbStart}
            {apiStats.high} {symbEnd} */}
          </p>

          <p>
            Today's Low:
            {/* {symbStart}
            {apiStats.low}
            {symbEnd} */}
          </p>

          <p>
            % change over 24hrs:
            {/* {apiStats.percent_change_24}         {symbEnd} */}
          </p>
        </div>

        <div id="Container-graph"></div>
      </div>
    </>
  );
}

/////////////////////////////////////////////////////////////////////////////

// export function Stats(props: any) {

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
