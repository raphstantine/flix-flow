import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export function Display() {
    const [query, setQuery] = useState(undefined);
    const [genreData, setGenreData] = useState(undefined);
    const [text, setText] = useState(undefined);
    const [data, setData] = useState(undefined);

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
            return;
        }

        function getGenreById(genreId) {
            return genreData?.find((genre) => genre.id === genreId) ?? "Unknown Genre";
        }

        if (query) {
            const genre = query.get("genre");
            const search = query.get("search");
            const type = query.get("type");
            const year = query.get("year");
            const genreNames = getGenreById(Number(genre)).name;
            if (genre) {
                setText(`Search Genre: ${genreNames}`);
                fetch(
                    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
                    options
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setData(data.results);
                    });
            }
            if (search) {
                setText(`Search by "${search}"`);
                fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
                    options
                )
                .then((response) => response.json())
                .then((data) => {
                    setData(data.results);
                });
            }
            if (type) {
                setText(`Search Type: ${type}`);
                if (type === "popular") {
                    fetch(
                        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                        options
                    )
                    .then((response) => response.json())
                    .then((data) => {
                        setData(data.results);
                    });
                }
            }
            if (year) {
                setText(`Search Year: ${year}`);
                fetch(
                    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`,
                    options
                )
                .then((response) => response.json())
                .then((data) => {
                    setData(data.results);
                });
            }
        }
    }, [query, genreData]);
    
    return <>
    <div class="home">
      <header style={{
      }}>
        <Navbar/>
      </header>
    </div>

    <section class="badan">
      <div class="bungkus">
        <h3 id="searchby">{text}</h3>
        <div class="cards" id="container">
            {data?.map((movie) => (
                <a href={`/sinopsis?id=${movie.id}`} class="card clean col-4 col-md-2 col-lg-2">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Poster" class="img-fluid"></img>
                    <div class="overlay">
                        <span>{movie.title}</span>
                        <span>{movie.vote_average}<i class="bi bi-star-fill"></i></span>
                        <span></span>
                    </div>
                </a>
                ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>;
}
