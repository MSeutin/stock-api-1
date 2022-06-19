let form = document.querySelector("#my-form");
let ticker = document.querySelector("#ticker");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let tickerResult = document.querySelector(".tickerResult");
let startDateResult = document.querySelector(".startDateResult");
let endDateResult = document.querySelector(".endDateResult");
let startPrice = document.querySelector(".startPrice");
let endPrice = document.querySelector(".endPrice");
let profitLoss = document.querySelector(".profitLoss");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  tickerResult.textContent = ticker.value;
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.value}&outputsize=full&apikey=${config.API_key}`;
  getData(url, start.value, end.value);
});

async function getData(url, startDate, endDate) {
  const response = await fetch(url);
  let data = await response.json();
  while (!data["Time Series (Daily)"][startDate]) {
    console.log(`INVALID START DATE: ${startDate}`);
    break;
  }
  startDateResult.textContent = startDate;
  endDateResult.textContent = endDate;
  startPrice.textContent = Number(
    data["Time Series (Daily)"][startDate]["4. close"]
  ).toFixed(2);
  endPrice.textContent = Number(
    data["Time Series (Daily)"][endDate]["4. close"]
  ).toFixed(2);
  let e = Number(endPrice.textContent);
  let s = Number(startPrice.textContent);
  let change = e - s;
  let res = ((change / s) * 100).toFixed(2);
  profitLoss.textContent = `${res} %`;
}
