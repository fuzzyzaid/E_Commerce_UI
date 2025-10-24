import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { UserContext } from "../UserContext/UserContext";
import styles from "./Cart.module.css";
import Header from "../Header/Header";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <>
      <Header />
      <div className={styles.container}>
        {cart.length === 0 ? (
          <h3 className={styles.emptyCart}>Your cart is empty.</h3>
        ) : (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.productName}
                  className={styles.productImage}
                />
                <div className={styles.details}>
                  <h3>{item.productName}</h3>

                  <div className={styles.priceRow}>
                    <span className={styles.unitPrice}>
                      ${item.price} / lb
                    </span>

                    <span className={styles.multiply}>×</span>

                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.max(Number(item.quantity) - 1, 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Number(item.quantity) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.itemTotal}>
                      = ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartFooter}>
              <h3>Total: ${total.toFixed(2)}</h3>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
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