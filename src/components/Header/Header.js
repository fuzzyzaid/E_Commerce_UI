import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import styles from "./Header.module.css";
import { UserContext } from "../UserContext/UserContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (typeof logout === "function") logout();
    else localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/");
  };

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

          {user ? (
            <li className={styles.userBlock}>
              <span className={styles.userName}>
                {user.name || user.fullName || user.email}
              </span>

              <button
                onClick={handleLogout}
                className={styles.logoutIconButton}
                title="Logout"
                aria-label="Logout"
              >
                <FiLogOut className={styles.logoutIcon} />
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
