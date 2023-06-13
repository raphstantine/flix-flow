import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export function Sinopsis() {
    const [query, setQuery] = useState(undefined);
    const [genreData, setGenreData] = useState(undefined);
    const [movieData, setMovieData] = useState(undefined);
    const [actorData, setActorData] = useState(undefined);
    const [videoData, setVideoData] = useState(undefined);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBmOGI3OTk5ZTRjMjUwMWVjZGUzOTExN2Q4YWM2MCIsInN1YiI6IjY0NjM5N2EzZWY4YjMyMDEzODg4MWZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3ZH4B1l5QYzHyNIZFpBLcGpAJb_KWgSDyOYGYxrSmA'
            }
        };

        if (!query) setQuery(new URLSearchParams(window.location.search));
        async function getGenreData() {
            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
            const data = await response.json();
            setGenreData(data.genres);
        }

        if (!genreData) {
            getGenreData();
        }

        if (query) {
            const id = query.get("id");
            if (id) {
                if (!movieData) {
                    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options).then(x => x.json()).then(x => setMovieData(x));
                }

                if (!actorData) {
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options).then(x => x.json()).then(x => setActorData(x.crew));
                }

                if (!videoData) {
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options).then(x => x.json()).then(x => setVideoData(x.results));
                }
            }
        }
    }, [query]);

console.log("VideoData :", videoData);
console.log("ActorData :", actorData);
console.log("MovieData :", movieData);
    return <>
    <div class="home">
      <header style={{
        color: "white"
      }}>
        <Navbar/>
      </header>
        
    </div>
    <main style={{
        color: "white", display: "flex",
        justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ width: "80%", marginBottom: "25px", marginTop: "25px"}}>
            <h1>{movieData?.title}</h1>
            <p>{movieData?.release_date?.split("-")[0]}</p>
            <div style={{ display: "flex" }}>
                <img alt="Poster" src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} style={{ width: "250px" }}/>
                <iframe src={`https://www.youtube.com/embed/${videoData?.find(x => x.type === "Trailer")?.key}`}
                    style={{width: "100%"}} title="Trailer"></iframe>
            </div>
            {/* Buttons of genres */}
            <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", columnGap: "10px" }}>
                {movieData?.genres.map(x => (
                    <button type="button" class="btn btn-outline-light" style={{borderRadius: "50px"}}>{x.name}</button>
                ))}
            </div>
            {/* Overview */}
            <p style={{marginTop: "5px", maxWidth: "70%"}}>{movieData?.overview}</p>
            <div style={{maxWidth: "70%", display: "flex", flexDirection: "column"}}>
                <hr></hr>
                <p
                    style={{margin: 0}}
                ><b>Director:</b> <span>{actorData?.filter(x => x.known_for_department === "Directing")?.map(x => x.name).join(", ")}</span></p>
                <hr></hr>
                <p
                style={{margin: 0}}
                ><b>Writers:</b> <span>
                    {actorData?.filter(x => x.known_for_department === "Writing")?.map(x => x.name).join(", ")}
                    </span>
                </p>
                <hr></hr>
                <p
                style={{margin: 0}}
                ><b>Actors:</b> <span>
                {actorData?.filter(x => x.known_for_department === "Acting")?.map(x => x.name).join(", ")}</span></p>
            </div>
        </div>
    </main>
    <Footer/>
    </>;
}
