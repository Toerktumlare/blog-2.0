import React from "react";
import LayoutWrapper from "./components/layout/layoutWrapper.tsx";
import Main from "./components/main/main.tsx";
import Styleguide from "./routes/styleguide.tsx";
import About from "./routes/about.tsx";
import Root from "./routes/root.tsx";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {MDXProvider} from '@mdx-js/react'
import Example from "./content/example.mdx"
import MonadInJava from "./content/monad-in-java/index.mdx"

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
      {
        path: "/example",
        element: <Example />,
      },
      {
        path: "/monad-in-java",
        element: <MonadInJava />,
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
    <MDXProvider>
      <LayoutWrapper>
        <RouterProvider router={router} />
      </LayoutWrapper>
    </MDXProvider>
  );
};

export default App;
