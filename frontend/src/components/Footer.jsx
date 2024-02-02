import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import {
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import Logo from "../assets/logo.jpg";
import connexion from "../services/connexion";

import "./footer.css";

const handleLogout = async () => {
  try {
    // Appeler la route de déconnexion côté serveur
    await connexion.post("/logout");

    // Rediriger ou mettre à jour l'état de l'application après la déconnexion
    // (facultatif, en fonction de votre logique d'application)
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

function Footer() {
  return (
    <footer className="socialCtn">
      <div className="social">
        <a
          aria-label="facebook"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <SlSocialFacebook className="socialIcon" />
        </a>
        <a
          aria-label="linkedin"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialLinkedin className="socialIcon" />
        </a>
        <div>
          <a
            onClick={handleLogout}
            aria-label="logoGreen"
            href="/"
            rel="noreferrer"
          >
            <img src={Logo} alt="logo du site" className=" logoGreen" />
          </a>
          <p className="goodbye">Disconnect</p>
        </div>
        <a
          aria-label="instagram"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialInstagram className="socialIcon" />
        </a>
        <a
          aria-label="twitter"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialTwitter className="socialIcon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
