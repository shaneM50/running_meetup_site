import React, { useEffect, useState } from "react";
import HyperLink from "./HyperLink";

function Events() {
  const MEETUP_GROUP = "valencia-social-runners";
  const RSS_URL = `https://cors-anywhere.herokuapp.com/https://www.meetup.com/${MEETUP_GROUP}/events/rss/`;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(RSS_URL);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, "application/xml");
        const items = Array.from(doc.querySelectorAll("item"));
        const parsed = items.map((item) => ({
          title: item.querySelector("title")?.textContent?.trim() || "Untitled",
          link: item.querySelector("link")?.textContent?.trim() || "#",
        }));
        if (!cancelled) setEvents(parsed);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, [RSS_URL]);

  if (loading) return <p>Loading upcoming events…</p>;

  const showProxyNotice = !!error || events.length === 0;

  return (
    <div>
      <h2>Upcoming Events</h2>

      {showProxyNotice && (
        <p className={`proxy-info ${error ? "proxy-error" : ""}`}>
          {error ? (
            <>
              <span className="proxy-error-label">Failed to load events:</span>
              <span className="proxy-error-text">{error}</span>
            </>
          ) : null}
          <span className="proxy-note">
            A 3rd-party CORS proxy is used for development; enable temporary access at{" "}
            <a
              href="https://cors-anywhere.herokuapp.com/corsdemo"
              target="_blank"
              rel="noopener noreferrer"
            >
              cors-anywhere.herokuapp.com
            </a>{" "}
            for the events list to populate.
          </span>
        </p>
      )}

      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event.link}>
              <HyperLink href={event.link} label={event.title} openNewTab />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Events;
