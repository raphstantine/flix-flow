import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
export function AboutUs() {
    const [hovered, setHovered] = useState(0);
    const people = [
        {
            name: "Edwin Fedora Lolo",
            role: "Mahasiswa",
            image: "/ewing.jpg",
            instagram: "https://www.instagram.com/edwinflolo/",
            youtube: "https://www.youtube.com/@MrBeast",
            facebook: "https://www.facebook.com/manchesterunited"
        },
        {
            name: "Sharone Angelica J",
            role: "Mahasiswa",
            image: "/sarun.jpg",
            instagram: "https://www.instagram.com/sharangelica/",
            youtube: "https://youtube.com/@BLACKPINK",
            facebook: "https://m.facebook.com/NewJeansOfficial/"
        },
        {
            name: "Raphael Constantine K",
            role: "Mahasiswa",
            image: "/rapael.jpg",
            instagram: "https://www.instagram.com/raphael.ck/",
            youtube: "https://youtube.com/@Raphhh",
            facebook: "https://www.facebook.com/mancity/"
        },
        {
            name: "Gilbert Evan Tilung",
            role: "Mahasiswa",
            image: "/gilbert.jpg",
            instagram: "https://www.instagram.com/gdstargazed/",
            youtube: "https://www.youtube.com/channel/UCIaLsADX-hQ6sIi3hSufjuw",
            facebook: "https://web.facebook.com/GemaShowIndo/?locale=id_ID&_rdc=1&_rdr"
        },
    ];

    return <>
     <div className="home">
      <header>
        <Navbar/>
      </header>
    </div>
    <div className="container">
      <div className="icon">
        {people.map((person, index) => <div onMouseOver={() => {
            setHovered(index)
        }} className={`imgBx ${hovered == index ? "active" : ""}`} style={{ "--i": index + 1 }} key={index} data-id="content1">
            <img src={person.image}/>
        </div>)}
      </div>

      <div className="content">
        {people.map((person, index) =>
            <div className={`contentBx ${hovered == index ? "active" : ""}`} id={`content${index + 1}`} key={index}>
                <div className="card">
                    <div className="imgBx">
                        <img src={person.image}/>
                    </div>
                    <div className="textBx">
                        <h2>{person.name}<br/><span>{person.role}</span></h2>
                        <ul className="sci">
                            <li><a href={person.instagram}><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href={person.youtube}><i className="fa-brands fa-youtube"></i></a></li>
                            <li><a href={person.facebook}><i className="fa-brands fa-facebook"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  
    <Footer/>
    </>
}