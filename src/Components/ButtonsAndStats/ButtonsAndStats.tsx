import React, { useEffect, useState } from "react";
import "./styles.css";

import GetCurrenySymbol from "./utils/getCurrencySymbols";
import search from "./utils/searchBtn";
// import { Stats } from "./Stats/Stats";

/////////////////////////////////////////////////////////////////////////////

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
  // const [loadingToggle, setLoadingToggle] = useState(true);

  //////////////////////////
  //       fetch btns Async    //
  //////////////////////////

  // useEffect(() => {
  //   async function fetchBtnApiFunc() {
  //     console.log("CALLLLLLLLLL");
  //     let res = await fetch(
  //       `https://www.bitstamp.net/api/v2/trading-pairs-info/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //         },
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error(`Error! status: ${res.status}`);
  //     }
  //     console.log(res);
  //     const data = await res.json();
  //     setBtnArrData(data);
  //     setLoadBtns(true);
  //     return data;
  //   }
  //   if (loadBtns === false) {
  //     console.log("btns not loaded yet");
  //     fetchBtnApiFunc();
  //   } else {
  //     console.log("btns loaded already");
  //     return;
  //   }
  // }, []);

  //////////////////////////
  //       fetch btns normal    //
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

  function handleBtnClick(e: any) {
    e.preventDefault();
    console.log("btn clicked", e.target);
    setMiniBtnContainer("min-btn-container"); //shrink the btns container
    setClickedBtnValue(e.target.innerHTML); //add title to stats container
    setUrlFromBtn(clickedBtnValue.toLowerCase().replace("/", ""));
    return;
  }

  function passCurrentBtnPress({ oldUrl }: any) {
    console.log(`Most recently pressed: ${UrlFromBtn}`);
    console.log(`recivered from looping func ${oldUrl}`);
  }

  //////////////////////////
  //     Fetch Stats      //
  //////////////////////////

  // ASYNC, fetch stats, looping on errors. many CORS issues with this url
  useEffect(() => {
    // https://rapidapi.com/guides/api-requests-intervals
    // setApiStats({ open: "-", high: "-", low: "-", percent_change_24: "-" }); //on btn click, clear the prev stats whilst loading new stats

    // if (UrlFromBtn === "") {
    //   return;
    // }

    // setLoadingToggle(!loadingToggle);
    // let x = false;

    let interval = setInterval(async () => {
      console.log("hi");

      const res = await fetch(
        `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
      );
      console.log("res status", res);

      // fetch(`https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setApiStats(data);
      //     SetcurrencySymbols(GetCurrenySymbol(clickedBtnValue));
      //   });

      // // async function fetchApiFunc() {
      // // passCurrentBtnPress("{UrlFromBtn}");
      // // console.log("starting fetch");
      // // if (checkUrlOutOfBlock()={UrlFromBtn}){
      // // if (x === false) {
      // // console.log(` cancel ${UrlFromBtn} fetch func tiggered`);
      // // return;
      // // } else {
      // // console.log({ UrlFromBtn });
      // try {
      //   let resStats =  fetch(
      //     `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
      //   );
      //   // console.log("res status", resStats);

      //   const dataStats =  resStats.json();
      //   // console.log("this", dataStats);
      //   if (dataStats) {
      //     setApiStats(dataStats);
      //     SetcurrencySymbols(GetCurrenySymbol(clickedBtnValue));
      //     // console.log("got data and set");
      //     return;
      //   }
      //   console.log("fetch again in 10sec");
      //   // setTimeout(fetchApiFunc, 20000); // refetch after x seconds
      // } catch {
      //   const SecondsBeforeRetry = 2;
      //   console.log(`Fetch Failed, ${SecondsBeforeRetry} secs until retry`);
      //   // setTimeout(fetchApiFunc, SecondsBeforeRetry * 1000); // if failed: wait and try again (some endpoints fail often)
      // }
      // }
      // }

      // fetchApiFunc();
    }, 7000);
    return () => clearInterval(interval);

    // while (loadingToggle) {

    // if (loadingToggle){
    // console.log({ loadingToggle });
    // for (let i = 0; i < 10; i++) {
    // setTimeout(fetchApiFunc, 10000); // refetch after x seconds
    // }

    // }
    // }
    // setTimeout(fetchApiFunc, 10000); // refetch after x seconds
    // setTimeout(fetchApiFunc, 10000); // refetch after x seconds
    // setTimeout(fetchApiFunc, 1000); // refetch after x seconds

    // }
  }, [UrlFromBtn]); // on receiveing url "" from btn click

  function searchHighlighted() {
    setMiniBtnContainer(""); //remove shrink the btns container
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
