const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBmOGI3OTk5ZTRjMjUwMWVjZGUzOTExN2Q4YWM2MCIsInN1YiI6IjY0NjM5N2EzZWY4YjMyMDEzODg4MWZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3ZH4B1l5QYzHyNIZFpBLcGpAJb_KWgSDyOYGYxrSmA"
  }
};
const searchInput = document.getElementById("search_input");
const container = document.getElementById("container");
let genreGlobal = [];

searchInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const searchQuery = searchInput.value;
    const url = `displaymov.html?search=${encodeURIComponent(searchQuery)}`;
    window.location.href = url;
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  await getGenreData();
  console.log(genreGlobal);
  const queryString = window.location.search;
  const urlParameter = new URLSearchParams(queryString);
  const genre = urlParameter.get("genre");
  const search = urlParameter.get("search");
  const type = urlParameter.get("type");
  const text = document.getElementById("searchby");
  const year = urlParameter.get("year");

  if (genre) {
    const genreNames = await getGenreById(genre);
    text.textContent = `Search by Genre: ${genreNames}`;
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const arr = data.results;
        arr.map((data) => {
          displayPosters(data);
        });
      });
  } else if (search) {
    text.textContent = 'Search by "' + search + '"';
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const arr = data.results;
        arr.map((data) => {
          displayPosters(data);
        });
      });
  } else if (type) {
    if (type === "popular") {
      text.textContent = "Search by Popular";
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          const arr = data.results;
          arr.map((data) => {
            displayPosters(data);
          });
        });
    }
  } else if (year) {
    text.textContent = `Search by Year: ${year}`;
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const arr = data.results;
        arr.map((data) => {
          displayPosters(data);
        });
      });
  }
});

function displayPosters(data) {
  const post0 = data.poster_path;
  const title0 = data.title;
  const rating0 = data.vote_average;
  const id0 = data.id;

  if (rating0 != 0) {
    const aDiv = document.createElement("a");
    const imgDiv = document.createElement("img");
    const div1Div = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const iDiv = document.createElement("i");

    aDiv.href = "#";
    aDiv.classList.add("card", "clean", "col-4", "col-md-2", "col-lg-2");

    if (post0) {
      imgDiv.src = `https://image.tmdb.org/t/p/original${post0}`;
      imgDiv.alt = "Poster";
      imgDiv.classList.add("img-fluid");
    }

    div1Div.classList.add("overlay");
    span1.textContent = title0;
    span2.textContent = rating0;
    iDiv.classList.add("bi", "bi-star-fill");
    span2.appendChild(iDiv);
    div1Div.appendChild(span1);
    div1Div.appendChild(span2);
    div1Div.appendChild(span3);

    aDiv.href = `../sinopsis/sinopsis.html?id=${id0}`;
    aDiv.appendChild(imgDiv);
    aDiv.appendChild(div1Div);
    container.appendChild(aDiv);
  }
}

function getGenreById(genreId) {
  return new Promise((resolve, reject) => {
    const id = parseInt(genreId, 10);
    const genre = genreGlobal.find((genre) => genre.id === id);
    if (genre) {
      resolve(genre.name);
    } else {
      reject("Unknown Genre");
    }
  });
}

async function getGenreData() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  );
  const data = await response.json();
  genreGlobal = data.genres;
}
