import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Shop.module.css";
import Header from "../Header/Header";
import { CartContext } from "../CartContext/CartContext";
import DialogBox from "../AddToCartDialogBox/AddToCartDialogBox"; // import the dialog

function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ productName: "", quantity: 1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getProducts");
        if (response.data) {
          setProducts(response.data);
          setCategories(["All", ...new Set(response.data.map((p) => p.category))]);
          const shuffled = response.data.sort(() => 0.5 - Math.random()).slice(0, 15);
          setDisplayedProducts(shuffled);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === currentCategory));
    }
  }, [currentCategory, products]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCurrentCategory(selectedCategory);
    if (selectedCategory === "All") {
      setDisplayedProducts(products.sort(() => 0.5 - Math.random()).slice(0, 15));
    } else {
      setDisplayedProducts(filteredProducts);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleProductClick = (product) => {
    console.log(product);
    navigate("/productdetails", { state: { product } });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.productId] || 1;
    addToCart(product, qty);
    setDialogData({ productName: product.productName, quantity: qty });
    setDialogOpen(true);
  };

  return (
    <>
      <Header />
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <div className={`container mt-4 ${styles.mainContainer}`}>
          {/* Filter Section */}
          <div className={`row mb-4 ${styles.filterRow}`}>
            <div className="col-md-3">
              <label className={styles.filterLabel} htmlFor="categoryFilter">
                Category:
              </label>
              <select
                id="categoryFilter"
                className={`form-select ${styles.filterSelect}`}
                value={currentCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Display */}
          <div className="row">
            {(currentCategory === "All" ? displayedProducts : filteredProducts).map((product) => (
              <div key={product.productId} className="col-md-4 mb-5">
                <div className={styles.productCard}>
                  <img
                    src={product.image}
                    alt={product.productName}
                    className={styles.productImage}
                  />
                  <div className={styles.cardBody}>
                    <h5
                      className={styles.productName}
                      onClick={() => handleProductClick(product)}
                    >
                      {product.productName}
                    </h5>
                    <p className={styles.price}>${product.price} / lb</p>

                    {/* Quantity above Add to Cart */}
                    <div className={styles.quantityBox}>
                      <input
                        type="number"
                        min="1"
                        value={quantities[product.productId] || 1}
                        onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                        className={styles.quantityInput}
                      />
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={styles.addToCartButton}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dialog Box */}
          <DialogBox
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            productName={dialogData.productName}
            quantity={dialogData.quantity}
          />
        </div>
      )}
    </>
  );
}

export default Shop;