import React from "react";
import HyperLink from "./HyperLink";

function Footer({ label, ...props }) {
  return (
    <footer className="App-footer">
      © 
      {new Date().getFullYear()}
      <HyperLink href="https://valenciasocialrunners.netlify.app/" label="Valencia Social Runners" openNewTab />
    </footer>
  );
}

export default Footer;