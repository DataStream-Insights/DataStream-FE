import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AlertProvider } from "./context/AlertContext";
import { ConfirmProvider } from "./context/ConfirmContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </AlertProvider>
  </StrictMode>
);
