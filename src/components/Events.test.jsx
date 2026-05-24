import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import Events from "./Events";

jest.mock("./HyperLink", () => (props) => {
  return <a href={props.href} target={props.openNewTab ? "_blank" : undefined}>{props.label}</a>;
});

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

const RSS_URL = "https://rss-proxy-0phy.onrender.com/meetup";

/* helper to build simple xml with items */
const xmlWithItems = (items = []) => `<?xml version="1.0" encoding="utf-8"?><rss><channel>${items
  .map(
    (it) =>
      `<item>${it.title !== undefined ? `<title><![CDATA[${it.title}]]></title>` : ""}${
        it.link !== undefined ? `<link>${it.link}</link>` : ""
      }</item>`
  )
  .join("")}</channel></rss>`;

test("renders events from real RSS sample XML", async () => {
  const sampleXml = xmlWithItems([
    { title: "5K Turia Park Run", link: "https://www.meetup.com/valencia-social-runners/events/314770382/" },
    { title: "5K Turia Park Run", link: "https://www.meetup.com/valencia-social-runners/events/314935735/" },
  ]);

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => sampleXml,
  });

  render(<Events />);

  // initial loading shown
  expect(screen.getByText(/Loading próximos eventos/i)).toBeInTheDocument();

  // then heading and both items appear
  await waitFor(() =>
    expect(screen.getByRole("heading", { name: /Próximos Eventos/i })).toBeInTheDocument()
  );

  expect(screen.getAllByText("5K Turia Park Run").length).toBe(2);

  const links = screen.getAllByRole("link", { name: "5K Turia Park Run" });
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute(
    "href",
    "https://www.meetup.com/valencia-social-runners/events/314770382/"
  );
  expect(links[1]).toHaveAttribute(
    "href",
    "https://www.meetup.com/valencia-social-runners/events/314935735/"
  );

  expect(global.fetch).toHaveBeenCalledWith(RSS_URL);
});

test('Empty feed shows "No próximos eventos."', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => xmlWithItems([]),
  });

  render(<Events />);

  await waitFor(() => expect(screen.getByText(/No próximos eventos\./i)).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledWith(RSS_URL);
});

test("Error path: non-OK response shows status in message", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 502,
    text: async () => "",
  });

  render(<Events />);

  await waitFor(() => expect(screen.getByText(/Error loading próximos eventos:/i)).toBeInTheDocument());
  expect(screen.getByText(/502/)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(RSS_URL);
});

test("Error path: fetch rejects (network failure) shows error message", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("network failure"));

  render(<Events />);

  await waitFor(() => expect(screen.getByText(/Error loading próximos eventos:/i)).toBeInTheDocument());
  expect(screen.getByText(/network failure/)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(RSS_URL);
});

test("Cancelled update on unmount does not throw and only calls fetch once", async () => {
  let resolveFetch;
  const fetchPromise = new Promise((res) => {
    resolveFetch = res;
  });

  global.fetch = jest.fn().mockReturnValue(fetchPromise);

  const { unmount } = render(<Events />);

  // unmount before fetch resolves
  unmount();

  // resolve fetch after unmount
  resolveFetch({
    ok: true,
    text: async () => xmlWithItems([{ title: "One", link: "https://a" }]),
  });

  // wait a tick to let any state updates (none should error)
  await waitFor(() => {});

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("Fallback values for missing title/link: Untitled and #", async () => {
  const xml = `<?xml version="1.0"?><rss><channel>
    <item><title></title><link></link></item>
  </channel></rss>`;

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => xml,
  });

  render(<Events />);

  await waitFor(() => expect(screen.getByRole("heading", { name: /Próximos Eventos/i })).toBeInTheDocument());

  // Items should render with fallback title "Untitled"
  const untitled = screen.getAllByText("Untitled");
  expect(untitled.length).toBeGreaterThanOrEqual(1);

  // Links should include "#" fallback
  const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
  expect(hrefs).toEqual(expect.arrayContaining(["#"]));
});

test("Performance: repeated renders don't refetch unnecessarily", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: async () => xmlWithItems([{ title: "One", link: "https://a" }]),
  });

  const { rerender } = render(<Events />);

  await waitFor(() => expect(screen.getByText("One")).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);

  // rerender same component (no prop changes) — effect should not re-run
  rerender(<Events />);
  await waitFor(() => expect(screen.getByText("One")).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
