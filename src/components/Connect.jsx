import React from "react";
import HyperLink from "./HyperLink";

function Connect() {
  const TELEGRAM_URL = "https://t.me/+CUGGFGbG3wFjZjBk"
  const MEETUP_URL = "https://www.meetup.com/valencia-social-runners/"

  return (
    <section id="connect" className="section">
      <h2>Connect</h2>

      <div className="connect-links">
        <p>
          <strong>Telegram:</strong>
          <HyperLink href={TELEGRAM_URL} label="Únete a nuestro grupo de Telegram" openNewTab />
        </p>
        <p>
          <strong>Meetup:</strong>
          <HyperLink href={MEETUP_URL} label="Únete a nuestro grupo de Meetup" openNewTab />
        </p>
      </div>
    </section>
  );
}

export default Connect;