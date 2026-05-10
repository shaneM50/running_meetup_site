import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Connect from "./components/Connect";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

function App() {
  const SITE_NAME = 'Valencia Social Runners';
  const NAV_ITEMS  = [
    { href: '#about', label: 'Sobre nosotros' },
    { href: '#connect', label: 'Únete' },
  ];

  return (
    <div className="App">
      <Header title={SITE_NAME} navItems={NAV_ITEMS} />
      <main>
        <About />
        <Connect />
      </main>
      <Footer label={SITE_NAME} />
    </div>
  );
}

export default App;