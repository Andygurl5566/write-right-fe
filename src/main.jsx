import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import CssBaseline from '@mui/material/CssBaseline'
import { queryClient } from "./lib/queryClient.js";

import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CssBaseline />
        <App />
      </BrowserRouter>
      {/* TODO: ReactQueryDevtools allows inspection of queries durring development
      remove before launch */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
