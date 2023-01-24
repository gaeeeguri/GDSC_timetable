import "./index.css";

import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";

import Theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Theme />
    </CookiesProvider>
  </React.StrictMode>
);
