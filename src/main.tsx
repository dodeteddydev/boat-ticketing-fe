import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContextProvider";
import "./index.css";
import { Routes } from "./routes/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes />
        </GlobalContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
