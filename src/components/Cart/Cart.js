import React, { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import Header from "../Header/Header";

function Cart() {
  const { cart, removeFromCart, updateQuantity, user } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login"); // Redirect to login if not logged in
    } else {
      alert("Proceeding to checkout...");
      navigate("/checkout");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
      {user ? (
          <p className={styles.userInfo}>Logged in as: <strong>{user.fullName}</strong></p>
        ) : (
          <p className={styles.userInfo}>You are not logged in.</p>
        )}
        {cart.length === 0 ? (
          <h3 className={styles.emptyCart}>Your cart is empty.</h3> 
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <img src={item.image} alt={item.productName} className={styles.productImage} />
                <div className={styles.details}>
                  <h3>{item.productName}</h3>
                  <p>Price: ${item.price}</p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.productId, Math.max(item.quantity - 1, 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartFooter}>
              <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
