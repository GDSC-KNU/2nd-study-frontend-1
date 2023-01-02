const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

// 더미 데이터
const list_items = Array.from({ length: 70 })
  .fill(0)
  .map((item, i) => `item ${i} 입니다.`);

//현재 페이지
let currentPage = 1;
// item 갯수
let totalItemsCount = list_items.length;
// 보여지는 페이지 index 목록
let pageCount = 5;
// 한 페이지당 display되는 item
let itemsPerPage = 5;
// 총 페이지 개수
let totalPageCount = Math.ceil(totalItemsCount / itemsPerPage);
// 페이지 그룹(1~5 : 1그룹, 6~10: 2그룹)
let pageGroup = Math.ceil(currentPage / pageCount);

function paginationButton(page) {
  const button = document.createElement("button");
  button.innerText = page;
  //github.com/GDSC-KNU/2nd-study-frontend-1.git
  https: button.addEventListener("click", function () {
    currentPage = page;
    // console.log(`currentPage : ` + currentPage, "currentGroups : " + pageGroup);
  });

  return button;
}

function pageMoveButton(direction) {
  const button = document.createElement("button");
  button.innerText = direction === "이전" ? "이전" : "다음";

  button.addEventListener("click", function (e) {
    const isFirstGroup = pageGroup <= 1;
    const isLastGroup = Math.ceil(totalPageCount / itemsPerPage) <= pageGroup;
    if (direction === "이전" && !isFirstGroup) {
      pageGroup--;
    } else if (direction === "다음" && !isLastGroup) {
      pageGroup++;
    }
    setupPagination();
  });

  return button;
}

function setupPagination() {
  let lastIndexOfCurrentPage = pageGroup * pageCount;
  //pageGroup 내 마지막 페이지 숫자
  const lastNumber =
    lastIndexOfCurrentPage > totalPageCount
      ? totalPageCount
      : lastIndexOfCurrentPage;
  //pageGroup 내 첫번째 페이지 숫자
  const firstNumber = lastNumber - (pageCount - 1);

  // console.log(pageGroup, firstNumber, lastNumber);
  pagination_element.innerHTML = "";
  pagination_element.appendChild(pageMoveButton("이전"));
  for (let i = firstNumber; i <= lastNumber; i++) {
    pagination_element.appendChild(paginationButton(i));
  }
  pagination_element.appendChild(pageMoveButton("다음"));
}

setupPagination();
