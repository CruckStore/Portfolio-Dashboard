import React, { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

function Footer() {
  const { content } = useContext(ContentContext);
  const footerText = content?.other?.footerText || "© 2024 Arthur. Tous droits réservés.";

  return (
    <footer>
      <p>{footerText}</p>
    </footer>
  );
}

export default Footer;
