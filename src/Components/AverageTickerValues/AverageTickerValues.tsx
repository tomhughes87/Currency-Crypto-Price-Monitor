import React, { useEffect, useState } from "react";
import Coinbaselogo from "./coinbase_logo.svg";
import "./styles.css";

export default function AverageTickerValues() {
  const [priceBitstampeWs, setPriceBitstampWs] = useState(-1); //using -1 is to check if data is loaded (stock could never be -)
  const [priceCoinbaseWs, setPriceCoinbaseWs] = useState<number>(-1);
  const [bitfinexPriceWs, setbitfinexPriceWs] = useState(-1);

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
            setbitfinexPriceWs(json[1][0]);
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
    bitfinexPriceWs,
    priceBitstampeWs,
    priceCoinbaseWs,
  ]); //Reason for 'let' in readme

  ///////////////////
  //   RETURN     //
  //////////////////
  return (
    <>
      <div id="MainContainer-AvgTickerVal">
        <h1>Price of Bitcoin in USD:</h1>
        <div>
          <h3>BitStamp:</h3>
          <p>${priceBitstampeWs}</p>
        </div>
        <div>
          <h3>CoinBase:</h3>

          <p>${priceCoinbaseWs}</p>
        </div>
        <div>
          <h3>bitfinex:</h3>

          <p>${bitfinexPriceWs}</p>
        </div>
        <div>
          <h3>Average Price:</h3>
          <img src={Coinbaselogo} />
          <p>${pricesAveraged}</p>
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
