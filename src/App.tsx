import React from "react";
import LayoutWrapper from "./components/layout/layoutWrapper.tsx";
import Main from "./components/main/main.tsx";
import Styleguide from "./routes/styleguide.tsx";
import About from "./routes/about.tsx";
import Root from "./routes/root.tsx";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {MDXProvider} from '@mdx-js/react'
import MonadInJava from "./content/monad-in-java/index.mdx"
import Base64InRust from "./content/base64-in-rust/index.mdx"
import MdxImg from "./components/article/img/mdximg.tsx";
import { h1 } from "./components/article/h1/h1.tsx";

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
        path: "/monad-in-java",
        element: <MonadInJava />,
      },
      {
        path: "/base64-in-rust",
        element: <Base64InRust />,
      },
    ],
  },
  {
    path: "/styleguide",
    element: <Styleguide />,
  },
]);

const component = {
  h1: h1,
  img: MdxImg
}

const App = () => {
  return (
    <MDXProvider components={component}>
      <LayoutWrapper>
        <RouterProvider router={router} />
      </LayoutWrapper>
    </MDXProvider>
  );
};

export default App;
