import React from "react";
import HyperLink from "./HyperLink";

function Footer({ label, ...props }) {
  return (
    <footer className="App-footer">
      © 
      {new Date().getFullYear()}
      {label}
    </footer>
  );
}

export default Footer;