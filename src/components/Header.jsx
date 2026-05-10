import React from "react";
import HyperLink from "./HyperLink";

function Header({ title, navItems, ...props }) {
  return (
    <header className="App-header">
      <h1>{title}</h1>
      <nav>
        <ul>
          {navItems.map(aNavItem => (
            <li key={aNavItem.href}>
              <HyperLink href={aNavItem.href} label={aNavItem.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;