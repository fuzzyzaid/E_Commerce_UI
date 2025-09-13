import React from "react";
import styles from "./AddToCartDialogBox.module.css";

function AddToCartDialogBox({ isOpen, onClose, productName, quantity }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>
          {quantity}× {productName} was added to the cart.
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          OK
        </button>
      </div>
    </div>
  );
}

export default AddToCartDialogBox;