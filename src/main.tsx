import "./index.css";

import { createActorContext } from "@xstate/react";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";

import { authMachine } from "@/state/authMachine";

import Theme from "./theme";

export const AuthMachineContext = createActorContext(authMachine);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthMachineContext.Provider>
        <Theme />
      </AuthMachineContext.Provider>
    </CookiesProvider>
  </React.StrictMode>
);
