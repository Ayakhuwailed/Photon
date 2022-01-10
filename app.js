const auth = "563492ad6f9170000100000143d021b01305419c9574cef0335b8fec";
const gallery = document.querySelector(".gallery");
const fore = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let curr;
//event listener

searchInput.addEventListener("input", update);
fore.addEventListener("submit", (e) => {
  e.preventDefault();
  curr = searchValue;
  search(searchValue);
});
more.addEventListener("click", loadMore);
function update(e) {
  searchValue = e.target.value;
}

async function fetcApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generate(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class=gallery-info>
    <p>${photo.photographer}</p>       
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}> </img> 
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";

  const data = await fetcApi(fetchLink);
  generate(data);
}

async function search(query) {
  clear();
  fetchLink = ` https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;

  const data = await fetcApi(fetchLink);

  generate(data);
}
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (curr) {
    fetchLink = ` https://api.pexels.com/v1/search?query=${curr}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetcApi(fetchLink);
  generate(data);
}
curatedPhotos();
