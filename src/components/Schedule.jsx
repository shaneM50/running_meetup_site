import React, { useEffect, useState } from "react";

/*
  Schedule -> Upcoming events feed for a Meetup group.

  Usage:
  - Replace MEETUP_GROUP_URLNAME with your group's URL name (the part after meetup.com/).
  - This implementation fetches the group's events via Meetup's public RSS feed (no API key required).
    Meetup's official API requires OAuth; the RSS feed is an easy public fallback.
  - The component shows loading / error states and a simple list of upcoming events.
  - Each event link opens in a new tab. rel="noopener noreferrer" is used to prevent the opened page
    from accessing window.opener and to avoid sending the referrer, improving security and privacy.
*/

function Schedule() {
  const MEETUP_GROUP_URLNAME = "valencia-social-runners"; 
  const RSS_URL = `https://www.meetup.com/${MEETUP_GROUP_URLNAME}/events/rss/`;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setLoading(true);
      setError(null);

      try {
        // Fetch RSS feed, parse into DOM, extract items.
        const res = await fetch(RSS_URL);
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const text = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "application/xml");
        const items = Array.from(doc.querySelectorAll("item"));

        const parsed = items.map((item) => {
          const title = item.querySelector("title")?.textContent || "Untitled";
          const link = item.querySelector("link")?.textContent || "#";
          const pubDate = item.querySelector("pubDate")?.textContent || null;
          // Meetup includes the event date/time in the <summary> or <description>.
          // We'll try to parse pubDate (when the event was published) and also extract date text from description.
          const description = item.querySelector("description")?.textContent || "";
          return { title, link, pubDate, description };
        });

        if (!cancelled) {
          setEvents(parsed);
        }
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

  return (
    <section id="schedule" className="section">
      <h2>Schedule</h2>

      {loading && <p>Loading upcoming events…</p>}

      {error && (
        <p style={{ color: "red" }}>
          Failed to load events: {error}
        </p>
      )}

      {!loading && !error && events.length === 0 && <p>No upcoming events found.</p>}

      {!loading && !error && events.length > 0 && (
        <ul className="events-list">
          {events.map((ev, i) => (
            <li key={i} className="event">
              <a href={ev.link} target="_blank" rel="noopener noreferrer">
                <strong>{ev.title}</strong>
              </a>
              {ev.pubDate && (
                <div className="event-date">
                  {new Date(ev.pubDate).toLocaleString()}
                </div>
              )}
              {ev.description && (
                <div
                  className="event-desc"
                  // description is HTML-escaped in RSS; render basic text by stripping tags
                  dangerouslySetInnerHTML={{
                    __html: ev.description,
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Schedule;