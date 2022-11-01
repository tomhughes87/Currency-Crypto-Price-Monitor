//////////////////////////
//  Currency Symbols    //
//////////////////////////

export default function GetCurrenySymbol(ticker: any): any {
  ticker = ticker.split("/"); // eg: get btc/usd > ["btc","usd"]
  // debugger;

  // let symStart = ""; // some currency have symbols at the start: $99
  // let symEnd = ""; //some, many crypto, have their names at the end

  switch (ticker[1]) {
    case "GBP":
      return {
        frontSymbol: "£",
        endSymbol: "",
      };
    // break;

    case "USD":
      return {
        frontSymbol: "$",
        endSymbol: "",
      };
    // symStart = "$";
    // break;

    case "EUR":
      return {
        frontSymbol: "€",
        endSymbol: "",
      };
    //   symStart = "€";
    //   break;

    case "PAX":
      return {
        frontSymbol: "",
        endSymbol: " Pax (Cryto)",
      };
    //   symEnd = "Pax (Cryto)";
    //   break;

    case "BTC":
      return {
        frontSymbol: "",
        endSymbol: " Bitcoin (Cryto)",
      };
    //   symEnd = "Bitcoin (Cryto)";
    //   break;

    case "USDC":
      return {
        frontSymbol: "",
        endSymbol: " USD coin (Cryto)",
      };
    //   symEnd = "USD coin (Cryto)";
    //   break;

    case "ETH":
      return {
        frontSymbol: "",
        endSymbol: " Ether (Cryto)",
      };
    //   symEnd = "Ether (Cryto)";
    //   break;

    case "USDT":
      return {
        frontSymbol: "",
        endSymbol: " Tether (Cryto)",
      };
    //   symEnd = "Tether (Cryto)";
    //   break;

    default:
      return {
        frontSymbol: "",
        endSymbol: "",
      };
  }

  // return [symStart, symEnd];
}
