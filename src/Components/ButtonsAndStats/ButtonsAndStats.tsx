import React, { useEffect, useState } from "react";
// import { Stats } from "./Stats/Stats";

/////////////////////////////////////////////////////////////////////////////

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [loading, setLoading] = useState(true);
  const [clickedBtnValue, setClickedBtnValue] = useState("");

  //////////////////////////
  //      async  fetch    //
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
      console.log("async trying:", data);
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
      {" "}
      <div id="btnContainer">
        {/* InterviewBtns */}
        <input id="searchInput" onKeyUp={search}></input>
        {btnDataArr.map((tricker) => (
          <button
            key={tricker.url_symbol}
            className="btn"
            onClick={handleBtnClick}
          >
            {tricker.name}
          </button>
        ))}

        {/* <Stats /> */}
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
