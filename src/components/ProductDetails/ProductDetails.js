import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import Header from "../Header/Header";
import { CartContext } from "../CartContext/CartContext";

function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`/getProduct/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product details", error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.productDetails}>
        <img src={`/${product.image}`} alt={product.productName} className={styles.productImage} />
        <div className={styles.info}>
          <h2>{product.productName}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <div className={styles.quantityBox}>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              className="form-control w-25 text-center" 
            />
          </div>
          <button onClick={() => addToCart(product, quantity)} className={styles.addToCartButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
