import * as React from "react";
import globals from "./main.module.css";
import styles from "./main.module.css";
import Header from "../header/header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";

export default function Main({ children }: MainProps) {
  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
      <Footer className="pt 10 pb10" />
    </div>
  );
}

interface MainProps {
  children?: JSX.Element | string | JSX.Element[];
}
