import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Shop.module.css";  
import Header from "../Header/Header";

function Shop() {
  const path = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getProducts");
        if (response.data) {
          setProducts(response.data);
          setCategories(["All", ...new Set(response.data.map((product) => product.category))]);

          // Display 15 random products initially
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
      setFilteredProducts(products.filter((product) => product.category === currentCategory));
    }
  }, [currentCategory, products]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCurrentCategory(selectedCategory);
  
    if (selectedCategory === "All") {
      // Show the 15 random products
      setDisplayedProducts(products.sort(() => 0.5 - Math.random()).slice(0, 15));
    } else {
      // Filter products based on the selected category
      setDisplayedProducts(filteredProducts);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={`container mt-4 ${styles.mainContainer}`}>
          {/* Filter Section */}
          <div className="row mb-4">
            <div className="col-md-3">
              <label className={styles.filterLabel} htmlFor="categoryFilter">Category:</label>
              <select
                id="categoryFilter"
                className="form-select"
                value={currentCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Display */}
          <div className="row">
            {(currentCategory === "All" ? displayedProducts : filteredProducts).map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className={`card ${styles.productCard}`}>
                  <img src={product.image} alt={product.name} className={`card-img-top ${styles.productImage}`} />
                  <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <h5 className={styles.productName} onClick={() => path(`/product/${product.id}`)}>
                          {product.productName}
                        </h5>
                        <p className="card-text">Price: ${product.price} / lb</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <input type="number" min="1" defaultValue="1" className="form-control w-25 text-center" />
                      <button className={`${styles.addToCartButton}`}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </>
  );
}

export default Shop;
