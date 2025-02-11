import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.css";
import Header from "../Header/Header";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/getProducts")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products", error));
  }, []);

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

      {/* Featured Products Carousel */}
      <h2 className={styles.sectionTitle}>Featured Products</h2>
      <Slider {...settings} className={styles.carousel}>
        {featuredProducts.map((product) => (
          <div key={product.productId} className={styles.card}>
            <img 
              src={`/${product.image}`} 
              alt={product.productName} 
              className={styles.productImage} 
            />
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <button className={styles.addToCartButton}>Add to Cart</button>
            <div className={styles.quantityBox}>
            <input type="number" min="1" defaultValue="1" className="form-control w-25 text-center" />
            </div>
          </div>
        ))}
      </Slider>

      {/* New Products Grid */}
<h2 className={styles.sectionTitle}>New Arrivals</h2>
<div className={styles.grid}>
  {newProducts.map((product) => (
    <div key={product.productId} className={styles.gridItem}>
      <img 
        src={`/${product.image}`} 
        alt={product.productName} 
        className={styles.productImage} 
      />
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>

      {/* Add to Cart Button */}
      <button className={styles.addToCartButton}>Add to Cart</button>

      {/* Quantity Input */}
      <div className={styles.quantityBox}>
        <input 
          type="number" 
          min="1" 
          defaultValue="1" 
          className="form-control w-25 text-center" 
        />
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Home;
