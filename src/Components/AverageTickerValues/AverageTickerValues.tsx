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
  const [pricBitfinexeWs, setPriceBitfinexWs] = useState(-1);

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
            setPriceBitfinexWs(json[1][0]);
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

  ///////////////////
  //   RETURN     //
  //////////////////
  return (
    <>
      <div id="MainContainer-avgTickerVal">
        <div id="Container-live" className="live-active-container">
          <div id="bg">
            <div id="live-dot" className="live-active-dot"></div>
          </div>
          <p id="text-live">Live</p>
        </div>
        <h1>Avage Price of Bitcoin/USD</h1>
        <div id="Container-site-price">
          <div className="card-site-price">
            <img id="logoBitstamp" className="logo" src={logoBitstamp} />
            <p className="price-site-price">
              ${priceBitstampeWs.toLocaleString()}
            </p>
          </div>
          <div className="card-site-price">
            <img id="logoCoinbase" className="logo" src={logoCoinbase} />
            <p className="price-site-price">
              ${priceCoinbaseWs.toLocaleString()}
            </p>
          </div>
          <div className="card-site-price">
            <img id="logoBitfinex" className="logo" src={logoBitfinex} />
            <p id="txt-price-bitfinex" className="price-site-price">
              ${pricBitfinexeWs.toLocaleString()}
            </p>
          </div>
        </div>
        <div id="Container-average-price">
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
