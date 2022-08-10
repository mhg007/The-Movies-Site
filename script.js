const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getAllMovies(API_URL);

async function getAllMovies(url) {
  let temp = url;
  let pageNo = 1;
  url += pageNo;
  for (let i = 0; i <= 5; i++) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
    pageNo++;
    url = temp + pageNo;
  }
}

function showMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

async function searchMovies(url) {
  main.innerHTML = "";
  const res = await fetch(url);
  const data = await res.json();

  var movies = data.results;
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    searchMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

function topMovies(movies) {
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    if (vote_average >= 8) {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
              <img src="${IMG_PATH + poster_path}" alt="${title}">
              <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
              </div>
              <div class="overview">
            <h3>Overview</h3>
            ${overview}
          </div>
          `;
      main.appendChild(movieEl);
    }
  });
}
async function getTopMovies(url) {
  let temp = url;
  let pageNo = 1;
  url += pageNo;
  for (let i = 0; i <= 10; i++) {
    const res = await fetch(url);
    const data = await res.json();

    topMovies(data.results);
    pageNo++;
    url = temp + pageNo;
  }
}

function callTopMovies() {
  main.innerHTML = "";
  getTopMovies(API_URL);
}
