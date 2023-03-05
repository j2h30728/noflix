import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

const client = new QueryClient();
console.log(import.meta.env.BASE_URL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
