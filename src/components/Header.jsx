import React from "react";
import HyperLink from "./HyperLink";

function Header() {
  return (
    <header className="App-header">
      <h1>Valencia Social Runners</h1>
      <nav>
        <HyperLink href="#about" label="Sobre nosotros" />
        <HyperLink href="#connect" label="Únete"/>
      </nav>
    </header>
  );
}

export default Header;