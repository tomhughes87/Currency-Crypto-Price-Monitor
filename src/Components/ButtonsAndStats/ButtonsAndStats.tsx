import React, { useEffect, useState } from "react";

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(true);

  //////////////////////////
  //      Normal fetch    //
  //////////////////////////

  //   useEffect(() => {
  //     console.log("Here");
  //     try {
  //       fetch("https://www.bitstamp.net/api/v2/trading-pairs-info/")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setBtnArrData(data);
  //           setLoading(false);
  //         });
  //     } catch {
  //       console.log("errors");
  //     }
  //   }, []);

  //////////////////////////
  //      async  fetch    //
  //////////////////////////

  useEffect(() => {
    // debugger;
    async function fetchApiFunc() {
      let res = await fetch(
        `https://www.bitstamp.net/api/v2/trading-pairs-info/`,
        // "https://www.themealdb.com/api/json/v1/1/random.php",
        {
          method: "GET",
          //   mode: "cors",
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
      return data;
    }
    fetchApiFunc();
  }, []); //

  return <div>Buttons And Stats</div>;
}
