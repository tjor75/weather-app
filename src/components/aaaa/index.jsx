import { useState } from "react";
import Modal from "../UI/Modal";
import clouds from "../../assets/icons/clouds.png";
import "./About.css";

function About() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="about-btn" onClick={() => setIsOpen(true)}>
                &#x1F465;
            </button>
            <Modal className="about-modal" isOpen={isOpen} setIsOpen={setIsOpen}>
                <div>
                    <img src={clouds} alt="Clouds" />
                    <h2>Weather App</h2>
                    <p>A solution based on the <a href="https://devchallenges.io/challenge/weather-app">DevChallenges' project</a></p>
                    <p>&copy;2025 Uriel E. & <a href="https://tjor.vercel.app/">Lucas T.</a></p>
                </div>
                <div className="assets-from">
                    <p>Assets from:</p>
                    <div>
                        <a href="https://www.flaticon.com/free-icons/windy">
                            Windy icons (apien)
                        </a>
                        <a href="https://www.flaticon.com/free-icons/cold" >
                            Cold icons (riajulislam)
                        </a>
                        <a href="https://4vector.com/free-vector/world-map-more-detail-clip-art-104869">
                            World Map (4vector)
                        </a>
                        <a href="https://fonts.google.com/specimen/Be+Vietnam+Pro">
                            Be Vietnam Pro (B&#x1EA3;o, Le, Nguy&#x1EC5;n)
                        </a>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default About;