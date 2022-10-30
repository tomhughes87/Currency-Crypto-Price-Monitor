import React, { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "", url_symbol: "" }]);
  const [loading, setLoading] = useState(true);

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
  //        RETURN        //
  //////////////////////////

  return (
    <>
      {" "}
      <div id="btnContainer">
        {/* InterviewBtns */}
        <input id="searchInput" onKeyUp={search}></input>
        {btnDataArr.map((tricker) => (
          <button key={tricker.url_symbol} className="btn">
            {tricker.name}
          </button>
        ))}
      </div>
    </>
  );
}
// key={tricker.url_symbol}
// onClick={handleBtnClick}

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
