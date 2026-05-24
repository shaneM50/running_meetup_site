import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Connect from "./components/Connect";
import Events from "./components/Events";
import Footer from "./components/Footer";

function App() {
  const SITE_NAME = 'Valencia Social Runners';
  const NAV_ITEMS  = [
    { href: '#about', label: 'Sobre nosotros' },
    { href: '#connect', label: 'Únete' },
    { href: '#events', label: 'Eventos' },
  ];

  return (
    <div className="App">
      <Header title={SITE_NAME} navItems={NAV_ITEMS} />
      <main>
        <About />
        <Connect />
        <Events />
      </main>
      <Footer label={SITE_NAME} />
    </div>
  );
}

export default App;