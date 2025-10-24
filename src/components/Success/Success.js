import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { UserContext } from "../UserContext/UserContext";
import styles from "./success.module.css";

function Success() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const name = user?.fullName || user?.name || user?.email || "Customer";

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <FiCheckCircle className={styles.icon} aria-hidden="true" />
        <h1 className={styles.title}>Order Complete</h1>
        <p className={styles.message}>
          Thank you, <strong className={styles.name}>{name}</strong>. Your order has been placed successfully.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.homeButton}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default Success;