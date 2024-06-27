import React from "react";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li className={styles.horizontalList}>
          <Link className={styles.menuItem} to={`/`}>
            ~/toerktumlare
          </Link>
        </li>
      </ul>
      <ul>
        <li className={styles.horizontalList}>
          <Link className={styles.menuItem} to={`/`}>
            ~/home
          </Link>
        </li>
        <li className={styles.horizontalList}>
          <Link className={styles.menuItem} to={`/about`}>
            ~/about
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
