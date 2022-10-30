import React, { useEffect, useState } from "react";
import "./styles.css";
// import { Stats } from "./Stats/Stats";

/////////////////////////////////////////////////////////////////////////////

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [loading, setLoading] = useState(true);
  const [clickedBtnValue, setClickedBtnValue] = useState("");

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
    // return Stats();
  }

  //////////////////////////
  //        RETURN        //
  //////////////////////////

  return (
    <>
      <div id="MainContainer-btns-stats-graph">
        <input id="Input-search" onKeyUp={search}></input>

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

        <div id="Container-stats">
          <h1>stats</h1>
          <p>
            from btn prop:
            {/* {props.btnclicked} */}
          </p>

          <p>
            Today opened at:
            {/* {symbStart}
            {apiStats.open} {symbEnd} */}
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

//////////////////////////
//    Search for btn    //
//////////////////////////

export function search(e: any) {
  const searchValue = e.target.value.toUpperCase();
  const btns = document.getElementsByClassName(
    "btn"
  ) as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < btns.length; i++) {
    //MATCH ANYPART
    if (btns[i].innerHTML.includes(searchValue)) {
      btns[i].style.display = "";
    } else {
      btns[i].style.display = "none";
    }
  }
}
