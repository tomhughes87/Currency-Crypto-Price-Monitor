import React, { useEffect, useState } from "react";

// https://api.coinbase.com/v2/exchange-rates?currency=BTC

export default function AverageTickerValues() {
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

  ///////////////////////
  //   CoinBase-WS     //
  ///////////////////////
  const [coinbasePriceWs, setCoinbasePriceWs] = useState("");
  const [coinbasePlaceHolder, setCoinbasePlaceHolder] = useState([
    "null",
    "nil",
    "nil",
  ]);

  const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");
  useEffect(() => {
    const apiCall = {
      type: "subscribe",
      product_ids: ["BTC-USD"],
      channels: [
        "level2",
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
      //   console.log(`[message] Data received from server: ${json}`);
      //   console.table({ json });
      // console.log(`[message] Data received from server: ${json.product_id}`);
      //   console.log(`[message] Data received from server: ${json.changes}`);

      try {
        if (json.changes === undefined) {
        } else {
          //   console.log(json.changes);
          if (json.changes[0][0] === "buy") {
            console.log(json.changes[0][0]);
            setCoinbasePriceWs(json.changes[0][1]);
          }
        }
        // }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <>
      <div>AverageTickerValues</div>
      <div>
        <h3>BitStamp:</h3>
        <p>{bitstampPriceWs}</p>
      </div>
      <div>
        <h3>CoinBase:</h3>
        <p>{coinbasePriceWs.slice(0, -3)}</p>
      </div>
      <div>
        <h3>CoinBae:</h3>
        <p>{coinbasePriceWs.slice(0, -3)}</p>
      </div>
      <div>
        <h3>Average Price:</h3>
        <p>
          {Math.floor(
            (Number(coinbasePriceWs.slice(0, -3)) + Number(bitstampPriceWs)) / 2
          )}
        </p>
      </div>
    </>
  );
}
