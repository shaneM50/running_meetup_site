import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Connect from "./components/Connect";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}

export default App;