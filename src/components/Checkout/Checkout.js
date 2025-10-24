import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import styles from "./Checkout.module.css";
import Header from "../Header/Header";

function Checkout() {
  const { user } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Prefill name and email from user context
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: user.fullName || user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const validate = (values) => {
    const e = {};

    // Name
    if (!values.name || !values.name.trim()) e.name = "Name is required.";

    // Email
    if (!values.email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email.";

    // Phone - basic international-friendly pattern (digits, spaces, +, -)
    if (!values.phone) e.phone = "Phone number is required.";
    else if (!/^[\d+\-\s()]{7,20}$/.test(values.phone))
      e.phone = "Enter a valid phone number.";

    // Address
    if (!values.street || !values.street.trim()) e.street = "Street is required.";
    if (!values.city || !values.city.trim()) e.city = "City is required.";
    if (!values.province || !values.province.trim()) e.province = "Province is required.";

    // Card name
    if (!values.cardName || !values.cardName.trim()) e.cardName = "Name on card is required.";

    // Card number - Luhn-like basic check: 13-19 digits
    const digitsOnly = values.cardNumber.replace(/\s+/g, "");
    if (!digitsOnly) e.cardNumber = "Card number is required.";
    else if (!/^\d{13,19}$/.test(digitsOnly)) e.cardNumber = "Enter a valid card number.";

    // Expiry MM/YY or MM/YYYY
    if (!values.cardExpiry) e.cardExpiry = "Expiry date is required.";
    else if (!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(values.cardExpiry))
      e.cardExpiry = "Enter expiry as MM/YY or MM/YYYY.";

    // CVV - 3 or 4 digits
    if (!values.cardCvv) e.cardCvv = "CVV is required.";
    else if (!/^\d{3,4}$/.test(values.cardCvv)) e.cardCvv = "Enter a valid CVV.";

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const formatCardNumber = (value) => {
    // group by 4 for readability
    return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberInput = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setForm((f) => ({ ...f, cardNumber: formatted }));
    setErrors((prev) => ({ ...prev, cardNumber: undefined }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      clearCart && clearCart();
      // navigate to a thank-you or order confirmation page
      navigate("/success", { state: { name: form.name } });
    }, 900);
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Personal details</legend>

            <label className={styles.label}>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                type="text"
                autoComplete="name"
                required
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </label>

            <label className={styles.label}>
              Email
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                type="email"
                autoComplete="email"
                required
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </label>

            <label className={styles.label}>
              Phone number
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                type="tel"
                autoComplete="tel"
                required
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Address</legend>

            <label className={styles.label}>
              Street name
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                className={`${styles.input} ${errors.street ? styles.inputError : ""}`}
                type="text"
                autoComplete="street-address"
                required
              />
              {errors.street && <span className={styles.error}>{errors.street}</span>}
            </label>

            <div className={styles.row}>
              <label className={`${styles.label} ${styles.flex}`}>
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                  type="text"
                  autoComplete="address-level2"
                  required
                />
                {errors.city && <span className={styles.error}>{errors.city}</span>}
              </label>

              <label className={`${styles.label} ${styles.flex}`}>
                Province
                <input
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.province ? styles.inputError : ""}`}
                  type="text"
                  autoComplete="address-level1"
                  required
                />
                {errors.province && <span className={styles.error}>{errors.province}</span>}
              </label>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Card details</legend>

            <label className={styles.label}>
              Name on card
              <input
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                className={`${styles.input} ${errors.cardName ? styles.inputError : ""}`}
                type="text"
                autoComplete="cc-name"
                required
              />
              {errors.cardName && <span className={styles.error}>{errors.cardName}</span>}
            </label>

            <label className={styles.label}>
              Card number
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleCardNumberInput}
                className={`${styles.input} ${errors.cardNumber ? styles.inputError : ""}`}
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                required
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
            </label>

            <div className={styles.row}>
              <label className={`${styles.label} ${styles.flex}`}>
                Expiry
                <input
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.cardExpiry ? styles.inputError : ""}`}
                  type="text"
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  required
                />
                {errors.cardExpiry && <span className={styles.error}>{errors.cardExpiry}</span>}
              </label>

              <label className={`${styles.label} ${styles.flex}`}>
                CVV
                <input
                  name="cardCvv"
                  value={form.cardCvv}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.cardCvv ? styles.inputError : ""}`}
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  required
                />
                {errors.cardCvv && <span className={styles.error}>{errors.cardCvv}</span>}
              </label>
            </div>
          </fieldset>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Place Order"}
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Checkout;