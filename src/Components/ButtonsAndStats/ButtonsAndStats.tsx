import React, { useEffect, useState } from "react";

export default function ButtonsAndStats() {
  const [btnDataArr, setBtnArrData] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Here");
    try {
      fetch("https://www.bitstamp.net/api/v2/trading-pairs-info/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBtnArrData(data);
          setLoading(false);
        });
    } catch {
      console.log("errors");
    }
  }, []);

  return <div>Buttons And Stats</div>;
}
