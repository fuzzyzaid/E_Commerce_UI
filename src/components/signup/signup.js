import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const path = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!fullName) {
      errors.fullName = "Full Name is required";
    } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(fullName)) {
      errors.fullName = "FullName cannot be numeric";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{3}\d{4}\d{3}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be in the format XXXXXXXXXX.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  async function submit(e) {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        fullName,
        email,
        password,
        phoneNumber,
      };

      try {
        const response = await axios.post("/signup", userData);
        if (response.data === "User Already Exists") {
          clearData();
          alert("User Already Exists");
        } 
        else if (response.data === "User created successfully") {
          path("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
      
    }
  }

  return (
    <>
      <div id={styles.mainDiv}>
        <div id={styles.mainContainer}>
          <h1>Sign Up</h1>
          <form onSubmit={submit} id={`signUp`}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              name="fullName"
              id="fullName"
              value={fullName}
            />
            {formErrors.fullName && (
              <p className={styles.errorMsg}>{formErrors.fullName}</p>
            )}
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              value={email}
            />
            {formErrors.email && (
              <p className={styles.errorMsg}>{formErrors.email}</p>
            )}
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
            />
            {formErrors.phoneNumber && (
              <p className={styles.errorMsg}>{formErrors.phoneNumber}</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
            {formErrors.password && (
              <p className={styles.errorMsg}>{formErrors.password}</p>
            )}
            <input type="submit" value="Signup" />
          </form>
          <div id={styles.loginLink}>
            <Link to="/login">
              Already have an Account. Click here to Login{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
