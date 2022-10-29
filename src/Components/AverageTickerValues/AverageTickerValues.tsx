import React, { useEffect, useState } from "react";

// https://api.coinbase.com/v2/exchange-rates?currency=BTC

export default function AverageTickerValues() {
  const [counter, setCounter] = useState(0);
  //   useEffect(() => {
  //     setCounter(counter + 1);
  //   }, []);

  ///////////////////////
  //   BitStamp-WS     //
  ///////////////////////
  const [bitstampPriceWs, setBitstampPriceWs] = useState("");
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
      console.log(`[message] Data received from server: ${json}`);
      try {
        if ((json.event = "data")) {
          if (json.data.price) {
            setBitstampPriceWs(json.data.price);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  //   ///////////////////////
  //   //   CoinBase-WS     //
  //   ///////////////////////
  const [coinbasePriceWs, setCoinbasePriceWs] = useState("");

  const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");
  useEffect(() => {
    const apiCall = {
      type: "subscribe",
      //   product_ids: ["BTC-USD"],
      channels: [
        //     "level2",
        "heartbeat",
        {
          name: "ticker",
          product_ids: ["BTC-USD"],
        },
      ],
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        setCoinbasePriceWs(json.price);

        // console.log(json.price);
        // setTimeout(() => {
        // }, );
        // if (json.changes != undefined) {
        //   if (json.changes[0][0] === "buy") {
        //     // console.log(json.changes[0][0]);
        //     setCoinbasePriceWs(json.changes[0][1]);
        //   }
        // }
      } catch (err) {
        console.log(err);
      }
    };
    // return () => {
    //     ws.disconnect();
    //   }
  }, []);

  ///////////////////////
  //   BitFinex-WS     //
  ///////////////////////
  const [bitfinexPriceWs, setbitfinexPriceWs] = useState(0);
  const wsBitfinex = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  //   const w = new ws("wss://api-pub.bitfinex.com/ws/2");

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

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  return (
    <>
      <h1>{counter}</h1>
      <p>errs=0</p>

      <div>AverageTickerValues</div>
      <div>
        <h3>BitStamp:</h3>
        {/* <p>${bitstampPriceWs}</p> */}
      </div>
      <div>
        <h3>CoinBase:</h3>
        <p>errs=1000000+</p>

        <p>${coinbasePriceWs.slice(0, -3)}</p>
      </div>
      <div>
        <h3>bitfinex:</h3>
        <p>errs=0</p>
        {/* <p>${bitfinexPriceWs}</p> */}
      </div>
      <div>
        <h3>Average Price:</h3>
        <p>
          $
          {/* {Math.floor(
            (Number(coinbasePriceWs.slice(0, -3)) +
              Number(bitstampPriceWs) +
              bitfinexPriceWs) /
              3
          )} */}
        </p>
      </div>
    </>
  );
}
