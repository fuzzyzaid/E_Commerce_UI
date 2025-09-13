import React, { useContext, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import Header from "../Header/Header";
import { CartContext } from "../CartContext/CartContext";
import DialogBox from "../AddToCartDialogBox/AddToCartDialogBox"; // same dialog as Home/Shop

function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  // Get product from navigation state
  const product = useMemo(() => location.state?.product || null, [location.state]);
  const [quantity, setQuantity] = useState(1);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ productName: "", quantity: 1 });

  useEffect(() => {
    if (!product) {
      navigate("/shop");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    const qty = Math.max(1, Number(quantity) || 1);
    addToCart(product, qty);
    setDialogData({ productName: product.productName, quantity: qty });
    setDialogOpen(true);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.imageCol}>
          <img
            src={`/${product.image}`}
            alt={product.productName}
            className={styles.productImage}
          />
        </div>

        <div className={styles.infoCol}>
          <h1 className={styles.productName}>{product.productName}</h1>

          <div className={styles.metaRow}>
            <span className={styles.price}>${product.price} / lb</span>
            {product.category && (
              <span className={styles.categoryBadge}>{product.category}</span>
            )}
          </div>

          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}

          <div className={styles.controls}>
            <div className={styles.quantityBox}>
              <label htmlFor="qty" className={styles.qtyLabel}>Quantity</label>
              <input
                id="qty"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.quantityInput}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate(-1)}
              className={styles.backButton}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      <DialogBox
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        productName={dialogData.productName}
        quantity={dialogData.quantity}
      />
    </div>
  );
}

export default ProductDetails;