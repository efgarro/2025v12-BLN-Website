import React from "react";
import styles from "../css/footer.module.css";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <>
      <SocialLinks />
      <footer className={`${styles.footer_box}`}>
        <h2 className="text-white font-bold text-center mb-1">
          Bijagual de Carara
        </h2>
        <p className="text-white text-center mb-1">
          natural@bijalapa.com | 506.8339.3335
        </p>
        <p className="text-white text-center text-xs">© 2026</p>
      </footer>
    </>
  );
};

export default Footer;
