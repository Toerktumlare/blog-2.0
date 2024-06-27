import React from "react";
import Menu from "../menu/menu";
import { standard } from "./header.module.css";

const Header = () => {
  return (
    <header className="terminal-nav">
      <Menu />
    </header>
  );
};

export default Header;
