import React from "react";

function HyperLink({ href, label, openNewTab, ...props }) {
  return (
    <a 
      className="no-underline-link" 
      href={href} 
      target={openNewTab ? "_blank" : undefined}
      rel="noopener noreferrer" // improves security (blocks window.opener) and privacy (omits referrer)
    >
        {label}
    </a>
  );
}

export default HyperLink;