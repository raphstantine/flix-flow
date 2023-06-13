export function Navbar() {
  const genres = [
    {
      name: "Horror",
      id: 27,
    },
    {
      name: "Action",
      id: 28,
    },
    {
      name: "Romance",
      id: 10749,
    },
    {
      name: "Crime",
      id: 80,
    },
    {
      name: "Comedy",
      id: 35,
    },
  ];

  const years = [
    2023,
    2022,
    2021,
    2020,
    2019 
  ];

    return <nav className="navbar navbar-expand-custom navbar-mainbg">
    <a className="navbar-brand navbar-logo" href="/">
      <img src="/logo.jpeg" width="50px" className="img-fluid" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
    >
      <i className="fas fa-bars text-black"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <div className="hori-selector">
          <div className="left"></div>
          <div className="right"></div>
        </div>
        <li className="nav-item">
          <a className="nav-link" href="/"><i className="fas fa-tachometer-alt"></i>Home</a>
        </li>
        <li className="nav-item dropdown">
          <a
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Genre
          </a>
          <ul className="dropdown-menu">
            {genres.map((genre) => (
              <li>
                <a
                  className="dropdown-item"
                  href={`/display?genre=${genre.id}`}
                >
                  {genre.name}
                </a>
              </li>
              ))}
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/display?type=popular"
            ><i className="far fa-calendar-alt"></i>Popular</a>
        </li>
        <li className="nav-item dropdown">
          <a
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="far fa-copy"></i>Year
          </a>
          <ul className="dropdown-menu">
            {years.map((year) => (
              <li>
                <a
                  className="dropdown-item"
                  href={`/display?year=${year}`}
                >
                  {year}
                </a>
              </li>
              ))}
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./aboutus"
            ><i className="fas fa-tachometer-alt"></i>About Us</a
          >
        </li>
      </ul>
    </div>
    <div className="search_user">
      <button className="btn my-2 my-sm-0" type="submit">
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ color: "#101010ce" }}
        ></i>
      </button>
      <input onKeyUp={(e) => {
        if (e.key === "Enter"){
            const searchQuery = e.currentTarget.value;
            const url = `/display?search=${encodeURIComponent(searchQuery)}`;
            window.location.href = url;
        }
      }} type="text" placeholder="Search..." id="search_input" />
    </div>
  </nav>
}