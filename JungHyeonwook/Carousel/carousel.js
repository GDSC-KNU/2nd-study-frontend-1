const sliderWrapper = document.getElementById("slider");
// const controller_element = document.getElementById("controller");
const pagination_element = document.getElementById("pagination");
const prevButton = document.getElementById("controller_prev");
const nextButton = document.getElementById("controller_next");

const pageChanger = (e) => {};

let currentPage = 0;
let slider_length = 5;

prevButton.addEventListener("click", () => {
  if (currentPage <= 0) return;
  currentPage--;
  changePage(currentPage);
  console.log(currentPage);
});

nextButton.addEventListener("click", () => {
  if (currentPage >= slider_length - 1) return;
  currentPage++;
  changePage(currentPage);
  console.log(currentPage);
});

const changePage = (n) => {
  sliderWrapper.style.marginLeft = -100 * n + "%";
};

const paginationButton = (page) => {
  const button = document.createElement("button");
  button.innerText = page;

  button.addEventListener("click", () => {
    currentPage = page - 1;
    changePage(page - 1);
  });

  return button;
};

const setupPagination = () => {
  for (let i = 1; i <= slider_length; i++) {
    pagination_element.appendChild(paginationButton(i));
  }
};

setupPagination();

// transition-property: all;
// transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
// transition-duration: 150ms;
