export function Footer() {
    return <footer className="footer-distributed">
      <div className="footer-left">
        <h3>Flix<span>Flow.</span></h3>

        <p className="footer-company-name">FlixFlow © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa-solid fa-location-dot" style={{ color: "#ffffff" }}></i>
          <p>
            <span>Universitas Multimedia Nusantara</span> Serpong, Kabupaten
            Tangerang, Banten
          </p>
        </div>

        <div>
          <i className="fa-sharp fa-solid fa-phone" style={{ color: "#ffffff" }}></i>
          <p>+62-1234-56789</p>
        </div>

        <div>
          <i className="fa-regular fa-envelope" style={{ color: "#ffffff" }}></i>
          <p><a href="mailto:support@company.com">Flixflow@company.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Kami adalah perusahaan Streaming Film.
        </p>

        <div className="footer-icons">
          <a href="https://www.facebook.com/Cristiano"
            ><i className="fa-brands fa-facebook-f" style={{ color: "#ffffff" }}></i
          ></a>
          <a href="https://www.instagram.com/cristiano/"
            ><i className="fa-brands fa-instagram" style={{ color: "#ffffff" }}></i
          ></a>
          <a href="https://www.youtube.com/channel/UCvA9_f5Lwk-poMynabtrZPg"
            ><i className="fa-brands fa-youtube" style={{ color: "#ffffff" }}></i
          ></a>
        </div>
      </div>
    </footer>
}