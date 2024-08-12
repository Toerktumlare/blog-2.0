import React from "react";
import { Link } from "react-router-dom";
import "../../global.css";
import styles from "./menu.module.css";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <Link to={`/`}>/home/toerktumlare/</Link>
      </div>
      <div>
        <ul>
          <li className={styles.listItem}>
            <Link className={styles.menuLink} to={`/`}>
              ~/home
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.menuLink} to={`/about`}>
              ~/about
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
