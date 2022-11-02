import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import "./styles.css";

import GetCurrenySymbol from "./utils/getCurrencySymbols";
import search from "./utils/searchBtn";

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [TitleFromClickedBtn, setTitleFromClickedBtn] = useState("");
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
  const [graphData, setGraphData] = useState([
    {
      id: "-",
      color: "hsl(135, 70%, 50%)",
      data: [
        {
          x: 0,
          y: 58,
        },
      ],
    },
  ]);
  // const [graphSecondsAxis, setGraphSecondsAxis] = useState(0);

  ///////////////////////////////////
  //       reseting graph         //
  //////////////////////////////////
  function resetGraphData() {
    setGraphData([
      {
        id: "-",
        color: "hsl(135, 70%, 50%)",
        data: [
          // {
          //   x: 0,
          //   y: 0,
          // },
        ],
      },
    ]);
  }

  ///////////////////////////////////
  //      add to   graphData      //
  //////////////////////////////////
  function addToGraphcData(fecthedData: any) {
    let newGraphData = graphData;

    //If graph length is too long remove first entry :
    if (newGraphData[0].data.length > 6) {
      newGraphData[0].data.shift();
    }

    //if there is more than one element in the graph data array
    // if (newGraphData[0].data[newGraphData[0].data.length == ] != undefined) {
    //   console.log(newGraphData[0].data[newGraphData[0].data.length - 1].x);
    //   const newX = newGraphData[0].data.length * 10;
    // }
    let newX;

    if (newGraphData[0].data.length === 0) {
      newX = 0;
    } else {
      newX = newGraphData[0].data[newGraphData[0].data.length - 1].x + 10;
      // console.log(newGraphData[0].data[newGraphData[0].data.length - 1].x);
    }

    //continue adding new data to graph

    // newX = newGraphData[0].data[newGraphData[0].data.length - 1].x + 10;

    //add new data
    newGraphData[0].data.push({
      x: newX,
      y: fecthedData.last.toLocaleString(),
    });

    console.log("newGraphData", newGraphData);
  }

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
        return () => abortController.abort();
      });
  }, []);

  //////////////////////////
  //   Handle btn click   //
  //////////////////////////
  function handleBtnClick(e: any): void {
    e.preventDefault();
    resetGraphData();
    setUrlFromBtn(e.target.innerHTML.toLowerCase().replace("/", "")); //updated
    setTitleFromClickedBtn(e.target.innerHTML); //add title to stats container
    setMiniBtnContainer("min-btn-container"); //shrink the btns container
    return;
  }

  //////////////////////////
  //  Timer>Fetch Stats   //
  //////////////////////////
  useEffect(() => {
    fetchStats();
    let interval = setInterval(async () => {
      fetchStats();
    }, 10000); // time of interval (10secs)
    return () => clearInterval(interval);
  }, [UrlFromBtn]); // on receiveing url "" from btn click

  //////////////////////////
  //     Fetch Stats      //
  //////////////////////////
  async function fetchStats() {
    try {
      const res = await fetch(
        `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
      );
      const dataStats = await res.json();

      // Do things with data
      setApiStats(dataStats);
      SetcurrencySymbols(GetCurrenySymbol(TitleFromClickedBtn));
      /////////////////////////////////////////////////////////////////////////////////  DATA FOR GRAPH
      console.log(graphData); /////////////////////////////////////////////////////////   practicing
      addToGraphcData(dataStats); /////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////

      // Log the data & response
      console.log("res status", res);
      console.log("Data", dataStats);

      // handle error
    } catch (error: unknown) {
      console.log(error);
      console.log("caught an error!");
    }
    return;
  }

  //////////////////////////
  //        RETURN        //
  //////////////////////////

  function handleSearchInputFocus() {
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
          onFocus={handleSearchInputFocus}
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
          <h1> {TitleFromClickedBtn}</h1>

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

        <div id="Container-graph">
          <Graph passedData={graphData} />
        </div>
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
