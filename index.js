let one = "apikey=";
let form = document.querySelector("#my-form");
let ticker = document.querySelector("#ticker");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let tickerResult = document.querySelector(".tickerResult");
let startDateResult = document.querySelector(".startDateResult");
let endDateResult = document.querySelector(".endDateResult");
let startPrice = document.querySelector(".startPrice");
let two = "FXIA00Z3WNN45IAZ";
let endPrice = document.querySelector(".endPrice");
let profitLoss = document.querySelector(".profitLoss");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  tickerResult.textContent = ticker.value.toUpperCase();
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.value.toUpperCase()}&outputsize=full&${one}${two}`;
  console.log(`startDate: ${start.value}`)
  getData(url, start.value, end.value);
});

async function getData(url, startDate, endDate) {

  try {
      const response = await fetch(url);
  let data = await response.json();
  startDateResult.textContent = startDate;
  endDateResult.textContent = endDate;
  // console.log(data["Time Series (Daily)"]);
  startPrice.textContent = Number(
    data["Time Series (Daily)"][startDate]["4. close"]
  ).toFixed(2);
  console.log(startPrice.textContent);
  endPrice.textContent = Number(
    data["Time Series (Daily)"][endDate]["4. close"]
  ).toFixed(2);
  let e = Number(endPrice.textContent);
  let s = Number(startPrice.textContent);
  let change = e - s;
  let res = ((change / s) * 100).toFixed(2);
  profitLoss.textContent = `${res} %`;
    
  } catch (err) {
    alert(err);
  }

}

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});