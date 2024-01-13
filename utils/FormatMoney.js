export default function FormatMoney(para) {
  return new Intl.NumberFormat("tr-TR", {
    currency: "TRY",
    currencyDisplay: "narrowSymbol",
  }).format(para);
}
