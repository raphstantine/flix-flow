import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

function limitTextToThreeWords(text = "") {
  const words = text.trim().split(" ");
  if (words.length > 3) {
    return words.slice(0, 3).join(" ") + " <br> " + words.slice(3).join(" ");
  } else {
      return text;
  }
}

export function Home() {
  const [genreData, setGenreData] = useState(undefined);
  const [popular, setPopular] = useState(undefined);
  const [mostPopular, setMostPopular] = useState(undefined);

  function getGenreById(genreId) {
    return genreData?.find((genre) => genre.id === genreId) ?? "Unknown Genre";
  }
    useEffect(() => {
      const options = {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBmOGI3OTk5ZTRjMjUwMWVjZGUzOTExN2Q4YWM2MCIsInN1YiI6IjY0NjM5N2EzZWY4YjMyMDEzODg4MWZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N3ZH4B1l5QYzHyNIZFpBLcGpAJb_KWgSDyOYGYxrSmA'
          }
      };

      async function getGenreData() {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
        const data = await response.json();
        setGenreData(data.genres);
      }

      async function getPopular() {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const data = await response.json();
        setPopular(data);
      }
      
      async function getMostPopular() {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
        const data = await response.json();
        setMostPopular(data.results);
      }

      if (!genreData) {
       getGenreData();
      }

      if (!popular) {
        getPopular();
      }

      if (!mostPopular) {
        getMostPopular();
      }
    }, []);

    return <>
    <div className="home">
      <header style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${popular?.results[0]?.backdrop_path})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <Navbar/>
        <div className="content">
          <h1 id="titlehome" className="titlehome" dangerouslySetInnerHTML={{__html: limitTextToThreeWords(popular?.results[0]?.title)}}></h1>
          <p id="plotsummaryhome" className="plotsummaryhome">{popular?.results[0].overview}</p>
          <div className="details">
            <h6>Movie</h6>
            <h5 id="genrehome">{popular?.results[0]?.genre_ids?.slice(0, 3)?.map(getGenreById).map(x=> x.name).join(", ")}</h5>
            <h4 id="yearhome">{popular?.results[0].release_date.split('-')[0]}</h4>
            <h3 id="ratehome"><span>IMDB</span><i className="bi bi-star-fill"></i> {popular?.results[0].vote_average}</h3>
          </div>
          <div id="buttonshome" className="btns">
            <a
              id="play"
             href={`/sinopsis?id=${popular?.results[0].id}`}
            >Read More</a>
          </div>
        </div>
      </header>
    </div>

    <section className="badan">
      <div className="bungkus">
        <h3>Trending</h3>
        <div className="cards" id="mosttrending">
          {popular?.results.slice(1, 20).map((movie) => (
            <a className="card clean" href={`/sinopsis?id=${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Poster" className="poster"></img>
              <div className="overlay">
                <span>{movie.title}</span>
                <span>{movie.vote_average}<i className="bi bi-star-fill"></i></span>
                <span></span>
              </div></a>
          ))}
        </div>
      </div>
    </section>
    <section className="badan">
      <div className="bungkus">
        <h3>Popular</h3>
        <div className="cards" id="mostpopular">
        {mostPopular?.map((movie) => (
            <a className="card clean" href={`/sinopsis?id=${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Poster" className="poster"></img>
              <div className="overlay">
                <span>{movie.title}</span>
                <span>{movie.vote_average}<i className="bi bi-star-fill"></i></span>
                <span></span>
              </div></a>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
}