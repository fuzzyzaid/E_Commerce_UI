import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.css";
import Header from "../Header/Header";
import { CartContext } from "../CartContext/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get("/getProducts")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products", error));
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const featuredProducts = products.slice(0, 5);
  const newProducts = products.slice(-5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Welcome to Grocery Store</h1>

      <h2 className={styles.sectionTitle}>Featured Products</h2>
      <Slider {...settings} className={styles.carousel}>
        {featuredProducts.map((product) => (
          <div key={product.productId} className={styles.card}>
            <img src={`/${product.image}`} alt={product.productName} className={styles.productImage} />
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <div className={styles.quantityBox}>
              <input 
                type="number" 
                min="1" 
                value={quantities[product.productId] || 1} 
                onChange={(e) => handleQuantityChange(product.productId, e.target.value)} 
                className="form-control w-25 text-center" 
              />
            </div>
            <button onClick={() => addToCart(product, quantities[product.productId] || 1)} className={styles.addToCartButton}>
              Add to Cart
            </button>
          </div>
        ))}
      </Slider>

      <h2 className={styles.sectionTitle}>New Arrivals</h2>
      <div className={styles.grid}>
        {newProducts.map((product) => (
          <div key={product.productId} className={styles.gridItem}>
            <img src={`/${product.image}`} alt={product.productName} className={styles.productImage} />
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <div className={styles.quantityBox}>
              <input 
                type="number" 
                min="1" 
                value={quantities[product.productId] || 1} 
                onChange={(e) => handleQuantityChange(product.productId, e.target.value)} 
                className="form-control w-25 text-center" 
              />
            </div>
            <button onClick={() => addToCart(product, quantities[product.productId] || 1)} className={styles.addToCartButton}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
