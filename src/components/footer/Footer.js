import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="bottom">
          <div className="left">
            <img id="footer-img" src="./img/image.png" alt="" />
            <span>© 2024 Dashah Ventures - Opc Private Limited. All rights reserved.</span>
          </div>
          <div className="right">
            <div className="social">
              <a href="https://twitter.com/Grittytech"><img src="/img/twitter.png" alt="Twitter" /></a>
              <a href="https://www.linkedin.com/in/dashah-ventures-opc-private-limited-7845922b5/"><img src="/img/linkedin.png" alt="LinkedIn" /></a>
              <a href="https://www.instagram.com/grittytech?igsh=MWRwNndkemRnbWtpOQ=="><img src="/img/instagram.png" alt="Instagram" /></a>
            </div>
            <div className="link">
              <img src="/img/language.png" alt="Language" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
