import React, { useState, useEffect } from "react";

export function Stats(props: any) {
  //   const ws = new WebSocket(`wss://ws.bitstamp.net`);

  const [apiStats, setApiStats] = useState({
    open: "-",
    high: "-",
    low: "-",
    percent_change_24: "-",
  });

  const UrlFromBtn: string = props.btnclicked.toLowerCase().replace("/", "");

  //
  //
  // API FETCH
  // useEffect(() => {
  //   console.log("useeffect running");
  //   // fetch(`https://www.bitstamp.net/api/v2/ticker/btceur`) //works
  //   fetch(`https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`) //works
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setApiStats(data);
  //     });
  // }, [props]);
  //
  //
  //

  //
  //
  // ASYNC, looping errors
  useEffect(() => {
    setApiStats({ open: "-", high: "-", low: "-", percent_change_24: "-" });
    async function fetchApiFunc() {
      try {
        let res = await fetch(
          `https://www.bitstamp.net/api/v2/ticker/${UrlFromBtn}`
          // , {
          // origin:'*'
          // mode: "cors",
          // headers: {
          // "Access-Control-Allow-Origin": "*",
          // },
          // }
        );
        console.log(res);
        // while (res.type === undefined) {
        //   res = await fetch("https://www.bitstamp.net/api/v2/ticker/btcusd");
        // }
        const data = await res.json();
        // console.log("async trying:", data);
        setApiStats(data);
        return data;
      } catch {
        const SecondsBeforeRetry = 2;
        // console.log(
        //   "error fetch API, trying again in:",
        //   SecondsBeforeRetry,
        //   "second(s)"
        // );

        <LoadingIssues />;
        setTimeout(fetchApiFunc, SecondsBeforeRetry * 1000);
      }
    }
    fetchApiFunc();
  }, [props]); //
  //

  //
  //
  //
  // ASYNC part 2
  // useEffect(() => {
  //   const fetchApiFunc = async () => {
  //     const data = await fetch("https://www.bitstamp.net/api/v2/ticker/btcusd");
  //     const json = await data.json();
  //     console.log("heres the data:", json);
  //   };
  //   fetchApiFunc();
  // }, [props]); //
  //
  //
  //
  //

  // WEBSOCKET
  //   useEffect(() => {
  //     // ws.close();
  //     console.log("stats/ ws func running");

  //     // console.log("websocket called");
  //     const apiCall = {
  //       event: "bts:subscribe",
  //       // data: { channel: "order_book_btcusd" },
  //       // data: { channel: `live_trades_btcusd` },
  //       //   data: { channel: `live_trades_${UrlFromBtn}/` },
  //       //   data: { channel: `live_trades_${UrlFromBtn}` },
  //       //   data: { channel: `live_trades_btcusd/` },

  //       //   data: { channel: `live_trades_btcusd` }, //WORKS... on hot reload only!!!
  //       //   data: { channel: `live_trades_btceur` }, // WORKS... on hot reload only!
  //       //   data: { channel: `live_trades_btcgbp` }, //BROKEN!
  //       //   data: { channel: `live_trades_btcpax` }, //BROKEN!
  //       // data: { channel: `live_trades_gbpusd` }, //!
  //       // data: { channel: `live_trades_gbpeur` }, //!
  //       // data: { channel: `live_trades_eurusd` }, //!
  //     };

  //     ws.onopen = (event) => {
  //       ws.send(JSON.stringify(apiCall));
  //     };

  //     ws.onmessage = function (event) {
  //       const json = JSON.parse(event.data);
  //       console.log(`[message] Data received from server: ${json}`);
  //       try {
  //         if ((json.event = "data")) {
  //           console.log("json.data: ", json.data);
  //           // console.log("json.data.price: ", json.data.price);

  //           if (json.data) {
  //             setApiStats(json.data);
  //             console.log("Set ApiStats");

  //             //   return;
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     //   }, []);
  //   }, [props]);

  let [symbStart, symbEnd] = Symb(props.btnclicked);

  return (
    <>
      <div id="statsContainer">
        <h1>stats</h1>
        <p>from btn prop: {props.btnclicked}</p>
        {/* <p>{apiStats}</p> */}
        <p>url: {UrlFromBtn}</p>

        <p>
          Today opened at: {symbStart}
          {apiStats.open} {symbEnd}
        </p>
        <p>
          Today's High:{symbStart}
          {apiStats.high} {symbEnd}
        </p>
        <p>
          Today's Low:{symbStart}
          {apiStats.low}
          {symbEnd}
        </p>
        <p>
          % change over 24hrs:{apiStats.percent_change_24}
          {symbEnd}
        </p>

        <h3>332</h3>
      </div>
    </>
  );
}

// "open": "20771",
// "high": "21012",
// "low": "20361",
// "last": "20697",
// "volume": "2109.00715844",
// "vwap": "20729",
// "bid": "20694",
// "ask": "20697",
// "open_24": "20710",
// "percent_change_24": "-0.06",

export function LoadingIssues() {
  return (
    <>
      <div>LoadingIssues</div>
      <h1>We are reconnecting, bare with us</h1>
    </>
  );
}

//////////////////////////
//  Currency Symbols    //
//////////////////////////

export function Symb(ticker: any): string[] {
  ticker = ticker.split("/");

  let symStart = "";
  let symEnd = "";

  switch (ticker[1]) {
    case "GBP":
      symStart = "£";
      break;

    case "USD":
      symStart = "$";
      break;

    case "EUR":
      symStart = "€";
      break;

    case "PAX":
      symEnd = "Pax (Cryto)";
      break;

    case "BTC":
      symEnd = "Bitcoin (Cryto)";
      break;

    case "USDC":
      symEnd = "USD coin (Cryto)";
      break;

    case "ETH":
      symEnd = "Ether (Cryto)";
      break;

    case "USDT":
      symEnd = "Tether (Cryto)";
      break;

    default:
      break;
  }

  return [symStart, symEnd];
}
