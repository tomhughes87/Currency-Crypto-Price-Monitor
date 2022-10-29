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
  //   const wsBitstamp = new WebSocket("wss://ws.bitstamp.net");
  //   useEffect(() => {
  //     const apiCall = {
  //       event: "bts:subscribe",
  //       data: { channel: `live_trades_btcusd` },
  //     };
  //     wsBitstamp.onopen = (event) => {
  //       wsBitstamp.send(JSON.stringify(apiCall));
  //     };
  //     wsBitstamp.onmessage = function (event) {
  //       const json = JSON.parse(event.data);
  //       console.log(`[message] Data received from server: ${json}`);
  //       try {
  //         if ((json.event = "data")) {
  //           if (json.data.price) {
  //             setBitstampPriceWs(json.data.price);
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //   }, []);

  //   ///////////////////////
  //   //   CoinBase-WS     //
  //   ///////////////////////
  const [coinbasePriceWs, setCoinbasePriceWs] = useState(123456789);

  //   const ws = new WebSocket("wss://ws-feed.prime.coinbase.com");

  const ws = new WebSocket(
    // GET wss://ws-feed.exchange.coinbase.com
    // Sec-WebSocket-Extensions: permessage-deflate
    "wss://ws-feed.exchange.coinbase.com"
  );
  useEffect(() => {
    console.log("doing thi");

    const apiCall = {
      type: "subscribe",

      product_ids: ["ETH-USD", "BTC-USD"],
      channels: ["ticker_batch"],
    };

    //   type: "subscribe",
    //   channel: "level2",
    //   //   product_ids: ["BTC-USD"],
    //   channels: [
    //     // "level2",
    //     "heartbeat",
    //     {
    //       name: "ticker",
    //       product_ids: ["BTC-USD"],
    //     },
    //   ],
    //   headers: "Sec-WebSocket-Extensions: permessage-deflate",
    // };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);

      try {
        // if (json.price) {
        setCoinbasePriceWs(json.price);

        // }
        // console.log(json);
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
  //   const wsBitfinex = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
  //   const w = new ws("wss://api-pub.bitfinex.com/ws/2");

  //   useEffect(() => {
  //     const apiCall = {
  //       event: "subscribe",
  //       channel: "ticker",
  //       symbol: "tBTCUSD",
  //     };

  //     wsBitfinex.onopen = (event) => {
  //       wsBitfinex.send(JSON.stringify(apiCall));
  //     };

  //     wsBitfinex.onmessage = function (event) {
  //       const json = JSON.parse(event.data);

  //       try {
  //         if (json[0] !== undefined) {
  //           if (typeof json[1][0] == "number") {
  //             console.log(json[1][0]);
  //             setbitfinexPriceWs(json[1][0]);
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //   }, []);

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  // if (coinbasePriceWs !=)

  //   if (coinbasePriceWs === "undifined") {
  //   }

  return (
    <>
      <div>AverageTickerValues</div>
      <div>
        <h3>BitStamp:</h3>
        {/* <p>${bitstampPriceWs}</p> */}
      </div>
      <div>
        <h3>CoinBase:</h3>

        {/* <p>${coinbasePriceWs.slice(0, -3)}</p> */}
        <p>${coinbasePriceWs}</p>
        {/* <p>${coinbasePriceWs.toFixed()}</p> */}
      </div>
      <div>
        <h3>bitfinex:</h3>

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
