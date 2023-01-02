export const API_END_POINT = "http://localhost:3000";

const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    let json = await res.json();
    json = json.map((item) => item.keyword);
    // console.log(json);
    // console.log(json[0]?.keyword);
    return json;
  }

  throw new Error("요청에 실패함");
};

export const fetchLanguages = async (keyword) =>
  // console.log(`${API_END_POINT}/languages?keyword=${keyword}`)
  request(`${API_END_POINT}/languages?q=${keyword}`);
// request(`http://localhost:3000/posts`);
