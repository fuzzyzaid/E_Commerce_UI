import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import Header from "../Header/Header";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  if (!product) {
    return <h2 className={styles.error}>Product not found!</h2>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.productCard}>
          <img src={product.image} alt={product.productName} className={styles.productImage} />
          <div className={styles.details}>
            <h2 className={styles.productName}>{product.productName}</h2>
            <p className={styles.description}>{product.description || "No description available."}</p>
            <h3 className={styles.price}>Price: ${product.price}</h3>
            <div className={styles.quantityContainer}>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className={`${styles.quantityInputs} form-control text-center`}
              />
            </div>
            <button className={styles.addToCartButton}>Add to Cart</button>
            <button
              className={styles.backButton}
              onClick={() => navigate("/shop")}  // Adjust the path to the shop page if needed
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
