import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "./Header";

// Mock HyperLink to simplify assertions.
jest.mock("./HyperLink", () => ({ href, label }) => <a href={href}>{label}</a>);

const NAV_ITEMS = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
];

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

test("renders title", () => {
  render(<Header title="Site Title" navItems={NAV_ITEMS} />);
  expect(screen.getByRole("heading", { level: 1, name: /site title/i })).toBeInTheDocument();
});

test("renders nav list with links", () => {
  render(<Header title="T" navItems={NAV_ITEMS} />);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "/home");
  expect(links[0]).toHaveTextContent("Home");
  expect(links[1]).toHaveAttribute("href", "/about");
  expect(links[1]).toHaveTextContent("About");
});

test("emits React warning in console when list item keys are duplicated", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const dup = [{ href: "/dup", label: "A" }, { href: "/dup", label: "B" }];
  render(<Header title="T" navItems={dup} />);

  const isConsoleCalledWithKeyWarning = consoleErrorSpy.mock.calls.some(call =>
    typeof call[0] === "string" && 
    /Encountered two children with the same key|unique "key" prop|Each child in a list should have a unique/
    .test(call[0])
  );

  expect(consoleErrorSpy).toHaveBeenCalled();
  if (!isConsoleCalledWithKeyWarning) {
    // print every captured call for debugging
    console.log('Captured console.error messages:');
    consoleErrorSpy.mock.calls.forEach((c,i) => console.log(i, c[0]));
  }
  expect(isConsoleCalledWithKeyWarning).toBe(true);

  consoleErrorSpy.mockRestore();
});
