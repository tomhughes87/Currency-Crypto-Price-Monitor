import React, { useEffect, useState } from "react";
import logoCoinbase from "./coinbase_logo.svg";
// import logoBitstamp from "./result.svg";
import logoBitstamp from "./Bitstamp_logo.svg";
import logoBitfinex from "./Bitfinex_logo.svg";
// import logoBitstamp from "./bitstamp_logo.svg";

import "./styles.css";

export default function AverageTickerValues() {
  const [priceBitstampeWs, setPriceBitstampWs] = useState(-1); //using -1 is to check if data is loaded (stock could never be -)
  const [priceCoinbaseWs, setPriceCoinbaseWs] = useState<number>(-1);
  const [pricBitfinexeWs, setPricebitfinexWs] = useState(-1);

  ///////////////////////
  //   BitStamp-WS     //
  ///////////////////////
  const wsBitstamp = new WebSocket("wss://ws.bitstamp.net");
  useEffect(() => {
    const apiCall = {
      event: "bts:subscribe",
      data: { channel: `live_trades_btcusd` },
    };
    wsBitstamp.onopen = (event) => {
      wsBitstamp.send(JSON.stringify(apiCall));
    };
    wsBitstamp.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          if (json.data.price) {
            setPriceBitstampWs(json.data.price);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  ///////////////////////
  //   CoinBase-WS     //
  ///////////////////////
  const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");
  useEffect(() => {
    console.log("doing thi");

    const apiCall = {
      type: "subscribe",

      product_ids: ["BTC-USD"],
      channels: ["ticker_batch"],
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        if (typeof json.price === "string") {
          setPriceCoinbaseWs(Math.floor(Number(json.price))); //Change string > num. remove decimals
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  ///////////////////////
  //   BitFinex-WS     //
  ///////////////////////
  const wsBitfinex = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  useEffect(() => {
    const apiCall = {
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    };

    wsBitfinex.onopen = (event) => {
      wsBitfinex.send(JSON.stringify(apiCall));
    };

    wsBitfinex.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        if (json[0] !== undefined) {
          if (typeof json[1][0] == "number") {
            console.log(json[1][0]);
            setPricebitfinexWs(json[1][0]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  ////////////////////////
  //   Call Find Avg    //
  ////////////////////////
  let pricesAveraged = FindAvg([
    priceBitstampeWs,
    priceCoinbaseWs,
    pricBitfinexeWs,
  ]); //Reason for 'let' in readme

  ////////////////////////
  //   Listen for changes//
  ////////////////////////
  useEffect(() => {
    console.log("priceBitstampeWs has updated");
    const classes = document.getElementsByClassName("price-site-price");
    console.log(classes);

    for (let i = 0; i < classes.length; i++) {
      classes[i].addEventListener("change", (event) =>
        console.log("..................", event)
      );
    }
    // classes.addEventListener("change", (event) => {
    // console.log(event);
    //   });
  }, []);

  ///////////////////
  //   RETURN     //
  //////////////////
  return (
    <>
      <div id="MainContainer-avgTickerVal">
        <div id="Container-live" className="not-live-active-container">
          <div id="live-dot" className="not-live-active-dot"></div>
          <p>Live</p>
        </div>
        <h1>Price of Bitcoin in USD:</h1>
        <div id="Container-site-price">
          <div className="card-site-price">
            <img id="logoBitstamp" className="logo" src={logoBitstamp} />
            <p className="price-site-price">
              ${priceBitstampeWs.toLocaleString()}
            </p>
          </div>
          <div className="card-site-price">
            <img id="logoCoinbase" className="logo" src={logoCoinbase} />
            <p className="price-site-price" onMouseDown={hangleChangedPrice}>
              ${priceCoinbaseWs.toLocaleString()}
            </p>
          </div>
          <div className="card-site-price">
            <img id="logoBitfinex" className="logo" src={logoBitfinex} />
            <p className="price-site-price">
              ${pricBitfinexeWs.toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <h3>Average Price:</h3>
          <p>${pricesAveraged.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}

//////////////////////
//     SUB FUNCS   //
////////////////////

export function FindAvg(ArrOfNums: number[]) {
  let avg: number = 0;
  try {
    for (let i = 0; i < ArrOfNums.length; i++) {
      avg += ArrOfNums[i]; //add arr together
    }
    return Math.floor((avg /= ArrOfNums.length)); // divide the sum by the length, remove decimal points
  } catch {
    console.log("Error: Issue with FindAvg Func");
    return 0;
  }
}

export function hangleChangedPrice(event: any) {
  console.log("changed");
  return 0;
}