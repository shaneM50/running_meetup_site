import React from "react";

function Connect() {
  return (
    <section id="connect" className="section">
      <h2>Connect</h2>

      <div className="connect-links">
        <p>
          <strong>Telegram:</strong>{" "}
          <a
            href="https://t.me/your_telegram_group"
            target="_blank"
            rel="noopener noreferrer" // prevents the opened page from accessing window.opener and stops referrer info being sent
          >
            Join our Telegram group
          </a>
        </p>
        <p>
          <strong>Meetup:</strong>{" "}
          <a
            href="https://www.meetup.com/your-meetup-group"
            target="_blank"
            rel="noopener noreferrer" // improves security (blocks window.opener) and privacy (omits referrer)
          >
            Join our Meetup group
          </a>
        </p>
      </div>
    </section>
  );
}

export default Connect;