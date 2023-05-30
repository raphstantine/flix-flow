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
        const url = `../search/displaymov.html?search=${encodeURIComponent(searchQuery)}`;
        window.location.href = url;
    }
})

document.addEventListener('DOMContentLoaded', async function() {
    const queryString = window.location.search;
    const urlParameter = new URLSearchParams(queryString);
    const id = urlParameter.get('id');

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then((response)=>response.json())
    .then((data)=>{
        const backdrop = data.backdrop_path;
        const poster = data.poster_path;
        const title = data.title;
        const overview = data.overview;

        const header = document.querySelector('header');
        const backdropStyle = `url(https://image.tmdb.org/t/p/original${backdrop})`;
        header.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), ${backdropStyle}`;
        header.style.backgroundSize = '1280px 720px';
        
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => {
            const crew = data.crew;
            const directingNamesSet = new Set();
            const writingNamesSet = new Set();
        
            crew.forEach((person) => {
                if(person.known_for_department === 'Directing') directingNamesSet.add(person.name);
                else if(person.known_for_department === 'Writing') writingNamesSet.add(person.name);
            });
        
            const directingNames = Array.from(directingNamesSet).slice(0, 1);
            const writingNames = Array.from(writingNamesSet).slice(0, 5);
            const director = directingNames.join(', ');
            const writer = writingNames.join(', ');

            const titleDiv = document.getElementById("titlefilm");
            const imgDiv = document.createElement("img");
            const div1Div = document.createElement("div");
            const h31Div = document.createElement("h3");
            const h32Div = document.createElement("h3");
            const h33Div = document.createElement("h3");
            const summaryDiv = document.getElementById("summaryfilm");
            const pDiv = document.createElement("p");

            titleDiv.classList.add('judul');
            imgDiv.src = `https://image.tmdb.org/t/p/original${poster}`;
            div1Div.classList.add('title');
            h31Div.textContent = title;
            h32Div.textContent = 'Director: ' + director;
            if(writer) h33Div.textContent = 'Writers: ' + writer;
            pDiv.textContent = overview;

            div1Div.appendChild(h31Div);
            div1Div.appendChild(h32Div);
            div1Div.appendChild(h33Div);
            // div1Div.id = "summaryfilm";
            div1Div.appendChild(pDiv);
            titleDiv.appendChild(imgDiv);
            titleDiv.appendChild(div1Div);
            displayTrailer(id);
        });
        displayActors(id);
    })
})

function displayActors(id){
    const cards = document.getElementById("actorcards");
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
    .then((response)=>response.json())
    .then((data)=>{
        const cast = data.cast.slice(0, 5);
        
        cast.map((data)=>{
            const name = data.name;
            const character = data.character;
            const profile = data.profile_path;
            
            const aDiv = document.createElement("a");
            const imgDiv = document.createElement("img");
            const div1Div = document.createElement("div");
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            const span3 = document.createElement("span");

            aDiv.classList.add('card', 'clean');
            imgDiv.src = `https://image.tmdb.org/t/p/original${profile}`;
            div1Div.classList.add('overlay');
            span1.textContent = name;
            span2.textContent = character;

            div1Div.appendChild(span1);
            div1Div.appendChild(span2);
            div1Div.appendChild(span3);
            aDiv.appendChild(imgDiv);
            aDiv.appendChild(div1Div);
            cards.appendChild(aDiv);
        })
    })
}

function displayTrailer(movieTitles){
    fetch(`https://api.themoviedb.org/3/movie/${movieTitles}/videos?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
        const results = data.results;
        const trailer = results.find(item => item.type === 'Trailer');
        if (trailer) {
            const videoKey = trailer.key;
            const div = document.getElementById("trailerfilm");
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
            // iframe.width = "400px";
            // iframe.height = "300px";
            div.appendChild(iframe);
        }
    });
}