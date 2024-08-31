import * as React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer.tsx";
import Header from "../header/header.tsx";
import styles from "./main.module.css";
import MainWrapper from "../mainWrapper/mainwrapper.tsx";

export default function Main({ children }: MainProps) {
  return (
    <div className={styles.main}>
      <Header />
      <MainWrapper>
        <Outlet />
        <Footer className="pt50 pb10" />
      </MainWrapper>
    </div>
  );
}

interface MainProps {
  children?: JSX.Element | string | JSX.Element[];
}
