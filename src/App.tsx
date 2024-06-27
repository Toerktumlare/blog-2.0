import React from "react";
import LayoutWrapper from "./components/layout/layoutWrapper.tsx";
import Main from "./components/main/main.tsx";
import Styleguide from "./routes/styleguide.tsx";
import About from "./routes/about.tsx";
import Root from "./routes/root.tsx";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

if (process.env.NODE_ENV !== "production") {
  new EventSource("/esbuild").addEventListener("change", (e) => {
    const { added, removed, updated } = JSON.parse(e.data);

    if (!added.length && !removed.length && updated.length === 1) {
      for (const link of document.getElementsByTagName("link")) {
        const url = new URL(link.href);

        if (url.host === location.host && url.pathname === updated[0]) {
          const next = link.cloneNode();
          if (next instanceof HTMLAnchorElement) {
            next.href = updated[0] + "?" + Math.random().toString(36).slice(2);
            next.onload = () => link.remove();
          }
          if (link.parentNode != null) {
            link.parentNode.insertBefore(next, link.nextSibling);
          }
          return;
        }
      }
    }

    location.reload();
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/styleguide",
    element: <Styleguide />,
  },
]);

const App = () => {
  return (
    <LayoutWrapper>
      <RouterProvider router={router} />
    </LayoutWrapper>
  );
};

export default App;
