const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const getData = async () => {
  const data = await fetch("https://api.coinpaprika.com/v1/tickers?quotes=KRW");
  return data;
};

getData().then((res) => console.log(res.json()));
