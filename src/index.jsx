import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import 'prismjs/themes/prism-okaidia.css'

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
