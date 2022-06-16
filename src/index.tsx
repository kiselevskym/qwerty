import React from "react";
// @ts-ignore
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TableContextProvider } from "./contexts/TableContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TableContextProvider>
        <App />
      </TableContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
