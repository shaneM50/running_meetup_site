import React from "react";
import HyperLink from "./HyperLink";

function Header({ title, navItems, ...props }) {
  return (
    <header className="App-header">
      <h1>{title}</h1>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.href}>
              <HyperLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;