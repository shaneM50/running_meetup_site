import React, { useEffect, useState } from "react";
import HyperLink from "./HyperLink";

function parseEvents() {
  
}

const Events = () => {
  const RSS_URL = `https://rss-proxy-0phy.onrender.com/meetup`;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseEvents = async (response) => {
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const items = Array.from(doc.querySelectorAll("item"));
    
    return items.map((item) => ({
      title: item.querySelector("title")?.textContent?.trim() || "Untitled",
      link: item.querySelector("link")?.textContent?.trim() || "#",
    }));
  }

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(RSS_URL);
        if (!response.ok) 
          throw new Error(`Error: ${response.status}`);

        const events = await parseEvents(response)

        if (!cancelled) 
          setEvents(events);
      } catch (error) {
        if (!cancelled) setError(error.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [RSS_URL]);

  if (loading) return <p>Loading próximos eventos…</p>;
  if (error) return <p className="error">Error loading próximos eventos: {error}</p>;

  return (
    <div>
      <h2>Próximos Eventos</h2>

      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event.link}>
              <HyperLink href={event.link} label={event.title} openNewTab />
            </li>
          ))}
        </ul>
      ) : (
        <p>No próximos eventos.</p>
      )}
    </div>
  );
}

export default Events;
