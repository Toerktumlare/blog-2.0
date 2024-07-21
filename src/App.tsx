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
import Cve2020_0601 from "./content/cve-2020-0601/index.mdx"
import DnsCompression from "./content/dns-compression/index.mdx"
import AnatomyDns from "./content/anatomy-of-dns/index.mdx"
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
      {
        path: "/cve-2020-0601",
        element: <Cve2020_0601 />,
      },
      {
        path: "/dns-compression",
        element: <DnsCompression />,
      },
      {
        path: "/anatomy-of-dns",
        element: <AnatomyDns />,
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
  h2: (props: any) => (
    <h2 style={{ marginTop: "150px", paddingBottom: "15px" }} {...props}>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 style={{ marginTop: "30px" }} {...props}>
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p style={{ marginBottom: "28px" }} {...props}>
      {props.children}
    </p>
  ),
  img: MdxImg,
  pre: (props: any) => (
    <pre
      style={{
        border: "0.5px solid",
        borderRadius: "3px",
        borderColor: "var(--primary-color)",
        padding: "10px",
        backgroundColor: "rgb(40, 42, 54)",
      }}
    >
      {" "}
      {props.children}
    </pre>
  ),
};

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
