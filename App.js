const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBmOGI3OTk5ZTRjMjUwMWVjZGUzOTExN2Q4YWM2MCIsInN1YiI6IjY0NjM5N2EzZWY4YjMyMDEzODg4MWZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3ZH4B1l5QYzHyNIZFpBLcGpAJb_KWgSDyOYGYxrSmA'
    }
};
let genreGlobal = [];
const searchInput = document.getElementById("search_input");

searchInput.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        const searchQuery = searchInput.value;
        const url = `search/displaymov.html?search=${encodeURIComponent(searchQuery)}`;
        window.location.href = url;
    }
})

document.addEventListener('DOMContentLoaded', async function() {
    await getGenreData();

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((data) => {
        // fetching the datas
        const idArr = data.results.splice(1, 20);
        const id0 = data.results[0].id;
        const back0 = data.results[0].backdrop_path;

        const title0 = data.results[0].title;
        const overview0 = data.results[0].overview;
        const rating0 = data.results[0].vote_average;
        const genreArr =  data.results[0].genre_ids.slice(0, 3);
        const year0 = data.results[0].release_date.split('-')[0];

        // image in the bg
        const header = document.querySelector('header');
        const backdrop = `url(https://image.tmdb.org/t/p/original${back0})`;
        header.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), ${backdrop}`;
        header.style.backgroundRepeat = 'no-repeat'
        header.style.backgroundSize = 'cover';
        header.style.backgroundAttachment = 'fixed';

        // title + limit 3 words per line
        const titleElement = document.getElementById("titlehome");
        titleElement.innerHTML = limitTextToThreeWords(title0);
        function limitTextToThreeWords(text) {
            const words = text.trim().split(" ");
            if (words.length > 3) {
              return words.slice(0, 3).join(" ") + " <br> " + words.slice(3).join(" ");
            } else {
                return text;
            }
        }

        // getting genre string
        const genreNames = genreArr.map((genreArr) => getGenreById(genreArr));
        Promise.all(genreNames).then((genres) => {
            const genre0 = genres.join(', ');

            // plot summary, genre, year, and rating
            document.getElementById("plotsummaryhome").textContent = overview0;
            document.getElementById("genrehome").textContent = genre0;
            document.getElementById("yearhome").textContent = year0;
            document.getElementById(
                "ratehome"
            ).innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${rating0}`;
            const buttonDiv = document.getElementById("buttonshome");
            const aDiv1 = document.createElement("a");

            aDiv1.textContent = "Read More";
            aDiv1.href = `sinopsis/sinopsis.html?id=${id0}`
            aDiv1.id = "play";
            buttonDiv.appendChild(aDiv1);
        });

        idArr.map((data)=>{
            displaySmallMovies(data, "mosttrending");
        })

        // displayTrailer(id0);
    });
    displayTrending();
});

function displayTrending(){
    fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
    .then((response)=>response.json())
    .then((data)=>{
        const id1 = data.results;
        id1.map((data)=>{
            displaySmallMovies(data, "mostpopular");
        })
    })
}

function displaySmallMovies(data, theId){
    const post1 = data.poster_path;
    const title1 = data.title;
    const rating1 = data.vote_average;
    const idMovie1 = data.id;

    const aDiv = document.createElement("a");
    const imgDiv = document.createElement("img");
    const div1Div = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const i1Div = document.createElement("i");
    const span3 = document.createElement("span");

    span1.textContent = title1;
    span2.textContent = rating1;
    i1Div.classList.add("bi", "bi-star-fill");
    span2.appendChild(i1Div);

    div1Div.appendChild(span1);
    div1Div.appendChild(span2);
    div1Div.appendChild(span3);
    div1Div.classList.add("overlay");

    imgDiv.src = `https://image.tmdb.org/t/p/original${post1}`;
    imgDiv.alt = "Poster";
    imgDiv.classList.add("poster");

    aDiv.classList.add("card", "clean");
    aDiv.appendChild(imgDiv);
    aDiv.appendChild(div1Div);
    aDiv.href = `sinopsis/sinopsis.html?id=${idMovie1}`;
    document.getElementById(theId).appendChild(aDiv);
}

// function displayTrailer(movieTitles) {
//     fetch(`https://api.themoviedb.org/3/movie/${movieTitles}/videos?language=en-US`, options)
//     .then((response) => response.json())
//     .then((data) => {
//         const results = data.results;
//         const trailer = results.find(item => item.type === 'Trailer');
//         if (trailer) {
//             const videoKey = trailer.key;
//             const playerDiv = document.getElementById('trailer');
//             const iframe = document.createElement('iframe');
//             iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
//             playerDiv.appendChild(iframe);
//         }
//     });
// }

function getGenreById(genreId) {
    return new Promise((resolve, reject) => {
        const genre = genreGlobal.find((genre) => genre.id === genreId);
        if (genre) {
            resolve(genre.name);
        }else{
            reject('Unknown Genre');
        }
    });
}

async function getGenreData() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    genreGlobal = data.genres;
}
