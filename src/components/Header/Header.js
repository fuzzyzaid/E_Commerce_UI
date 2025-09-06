import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src="/logo.webp" alt="Store Logo" className={styles.logo} />
        <span className={styles.brandName}>GroceryMart</span>
      </div>

      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={styles.menuIcon}></span>
      </button>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;