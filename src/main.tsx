import "./index.css";

import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*<MantineProvider*/}
    {/*  withNormalizeCSS*/}
    {/*  withGlobalStyles*/}
    {/*  theme={{*/}
    {/*    colorScheme: "light",*/}
    {/*    fontFamily:*/}
    {/*      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",*/}
    {/*    spacing: {*/}
    {/*      xs: 15,*/}
    {/*      sm: 20,*/}
    {/*      md: 25,*/}
    {/*      lg: 30,*/}
    {/*      xl: 40,*/}
    {/*    },*/}
    {/*  }}*/}
    {/*>*/}
    {/*  <App />*/}
    {/*</MantineProvider>*/}
    <Theme />
  </React.StrictMode>
);
