import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "./routes/Routes";
import { GlobalContextProvider } from "./context/GlobalContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes />
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
);
