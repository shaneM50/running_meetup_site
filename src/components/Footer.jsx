import React from "react";

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