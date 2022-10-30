//////////////////////////
//  Currency Symbols    //
//////////////////////////

export default function GetCurrenySymbol(ticker: any): string[] {
  ticker = ticker.split("/"); // eg: get btc/usd > ["btc","usd"]

  let symStart = ""; // some currency have symbols at the start: $99
  let symEnd = ""; //some, many crypto, have their names at the end

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
