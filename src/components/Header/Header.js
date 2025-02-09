import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`headerContainer ${styles.headerContainer}`}>
      <div className={styles.logoContainer}>
        <img src="/logo.webp" alt="Logo" className={styles.logo} />
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.openMenu : ""}`}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.iconLine}></div>
          <div className={styles.iconLine}></div>
          <div className={styles.iconLine}></div>
        </div>
        {isOpen && (
          <div className={styles.closeIcon} onClick={toggleMenu}>
            <strong>X</strong>
          </div>
        )}
        <ul className={styles.navList}> 
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/">Home</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/shop">Shop</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/cart">Cart</NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink className={styles.navLink} to="/logout">Logout</NavLink>
              </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
