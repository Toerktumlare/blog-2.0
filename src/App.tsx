import { MDXProvider } from "@mdx-js/react";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Article } from "./components/article/article/article.tsx";
import { h1 } from "./components/article/h1/h1.tsx";
import MdxImg from "./components/article/img/mdximg.tsx";
import Mermaid from "./components/article/mermaid/Mermaid.tsx";
import LayoutWrapper from "./components/layout/layoutWrapper.tsx";
import Main from "./components/main/main.tsx";
import Script from "./components/script/script.tsx";
import articles from "./content/articles.tsx";
import "./global.css";
import About from "./routes/about.tsx";
import Root from "./routes/root.tsx";
import Styleguide from "./routes/styleguide.tsx";

console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV !== "production") {
//   new EventSource("/esbuild").addEventListener("change", (e) => {
//     const { added, removed, updated } = JSON.parse(e.data);

//     if (!added.length && !removed.length && updated.length === 1) {
//       for (const link of document.getElementsByTagName("link")) {
//         const url = new URL(link.href);

//         if (url.host === location.host && url.pathname === updated[0]) {
//           const next = link.cloneNode();
//           if (next instanceof HTMLAnchorElement) {
//             next.href = updated[0] + "?" + Math.random().toString(36).slice(2);
//             next.onload = () => link.remove();
//           }
//           if (link.parentNode != null) {
//             link.parentNode.insertBefore(next, link.nextSibling);
//           }
//           return;
//         }
//       }
//     }

//     location.reload();
//   });
// }

const routes = articles.map((article) => {
  return {
    path: article.path,
    element: (
      <>
        <ScrollRestoration />
        <Article frontmatter={article.metadata}>{article.content}</Article>
      </>
    ),
  };
});

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
      ...routes,
    ],
  },
  {
    path: "/styleguide",
    element: <Styleguide />,
  },
], {
  basename: '/toerktumlare',  // Replace <repository-name> with your actual GitHub repository name
});

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
  img: (props: any) => (
    <MdxImg src={props.src} height={props.height} width={props.width}/>
  ),
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
      {""}
      {props.children}
    </pre>
  ),
  li: (props: any) => (
    <li style={{}} {...props}>
      {props.children}
    </li>
  ),
  Mermaid,
  Script,
};

const basename = '/<repository-name>'

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
